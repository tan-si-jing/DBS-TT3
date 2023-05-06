import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/Root';
import Home from './components/Home';
import Login from './components/Login';

const router = createBrowserRouter([
  {path:"/", element:<RootLayout/> ,children:[
    {index: true, element: <Home/>},
    {path:"auth/login", element: <Login/>},
    // {path:'auth/register', element:<Register/>},
  ]}
  
])

function App() {
  return (
    <RouterProvider router = {router}></RouterProvider>
  );
}

export default App;
