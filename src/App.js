
import './App.css';

import { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login,logout } from './store/authSlice';
import {  Header } from './components';
import {  Footer } from './components';

import { Outlet } from 'react-router-dom';

// the first thing that we will do is check if user is loged in or not

function App() {
  const[loading,setLoading]=useState(true);
  const dispatch=useDispatch()

  useEffect(()=>{
     authService.getCurrentUser()
     .then((userData)=>{
        if(userData){
          dispatch(login({userData}))
        }
        else {
          dispatch(logout())
        }
     })
     // after loading 
     .finally(()=>setLoading(false))
  },[])
  // console.log(process.env.REACT_APP_APPWRITE_URL);

   return !loading ? (
    <div className="min-h-screen flex flex-wrap
    content-between bg-gray-400">
      <div className='w-full block'>
        <Header/>
        <main>
         TODO:<Outlet/>
        </main>
        <Footer/>
      </div>
      
      </div>
   ) : (null)
}


export default App;

