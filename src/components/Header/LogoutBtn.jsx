import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'


// logout  h toh  koi action lega 
// mtlb kuch values chachite rehangi isiliye dispatch
function LogoutBtn() {
    const dispatch=useDispatch()
    // logout karne pe kya hoga
    const logoutHandler = () => {
        authService.logout().then(()=>{
            dispatch(logout())
        })
    }
  return (
    <button
    className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
    onClick={logoutHandler}
    >
    Logout
    </button>
   
  )
}

export default LogoutBtn