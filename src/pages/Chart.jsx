import React,{useState,useEffect,useRef} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {allUsersRoute,host} from '../utils/APIRoutes'
import Contacts from '../components/Contacts'
import Welcome from '../components/Welcome'
import ChatContainer from '../components/ChatContainer'
import {io} from 'socket.io-client'

function Chart() {
    const socket = useRef();
    const navigate = useNavigate();
    const [contacts,setContacts] = useState([]); //your contact is all the users in the database excluding you.. it is gotten by selecting all users excluding currentUser
    const [currentChat, setCurrentChat] = useState(undefined); //this is the contact you want to chart with. the value is gotten when you select a contact to chat with. he becomes your currentChat
    const [currentUser,setCurrentUser] = useState(undefined); //this is the users that is logined in. and it is gotten from the localstorage
    const feedCurrentUser = async () => {
        if (!localStorage.getItem('chat-app-user')) {
          navigate("/login");
        } else {
          setCurrentUser(
            await JSON.parse(
              localStorage.getItem('chat-app-user')
            )
          );
        }
      }
      useEffect(() => {
        if (currentUser) {
          socket.current = io(host);
          socket.current.emit("add-user", currentUser.id);
        }
      }, [currentUser]);
    
    const getAllUserResponse = async () => {
        if (currentUser) {
          if (currentUser.isAvatarImageSet) {
            const data = await axios.get(`${allUsersRoute}/${currentUser.id}`);
            console.log(data)
            setContacts(data.data);
          } else {
            navigate("/setAvatar");
          }
        }
      }
    useEffect(() =>{
        feedCurrentUser()
    }, []);
    useEffect(()=>{
        getAllUserResponse()
    }, [currentUser]);
    const handleChatChange = (chat) => {
        setCurrentChat(chat);
      };
  return (
    <Container>
    <div>
      <div className='container'>
        <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
        
        {currentChat === undefined ? (
            <Welcome currentUser={currentUser} />
          ) : (
            <ChatContainer  currentChat={currentChat} currentUser={currentUser} socket={socket}/>
          )}
      </div>
    </div>
    </Container>
  )
}
const Container = styled.div`
height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`
export default Chart
