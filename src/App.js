import React from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Register from './pages/Register'
import './App.css';
import Login from './pages/Login';
import Chart from './pages/Chart';
import SetAvatar from './components/setAvatar';

function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/setavatar' element={<SetAvatar />} />
      <Route path='/' element={<Chart />} />
    </Routes>
   </BrowserRouter>
  );
}

export default App;
