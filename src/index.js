import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


import { Provider } from 'react-redux';
import store from './store/store'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import { AuthLayout,Login, Signup } from './components/index';
import Home from './pages/Home'
import EditPost from './pages/EditPost';
import AllPosts from "./pages/AllPosts";
import Post from "./pages/Post";
import AddPost from './pages/AddPost'



const router=createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children:[
      {
         path: '/',
         element: <Home/>
      },
      {
        path:"/login",
        element: (
          <AuthLayout authentication={false}>
            <Login/>
          </AuthLayout>
        )
      },{
        path:"/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup/>

          </AuthLayout>
        )
      },{
        // to read all posts we need authentication so 
        path: "/all-posts",
        element:(
          <AuthLayout authentication={true}>
            <AllPosts/>
          </AuthLayout>
        ),
      },{
        path: "/add-post",
        element:(
          <AuthLayout authentication={true}>
            <AddPost/>
          </AuthLayout>
        )
      },{
        path:"/edit-post/:slug",
        element:(
          <AuthLayout authentication={true}>
            <EditPost/>
          </AuthLayout>
        )
      }
      ,
      {
        path: "/post/:slug",
        element: <Post />,
      },
      
    ],
  },
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
  <React.StrictMode>
<Provider store={store}>

    {/* <App /> */}
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

