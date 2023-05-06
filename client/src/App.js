import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainNavigation from "./components/MainNavigation";
import Home from "./components/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import Login from "./components/LoginPage";
import RootLayout from "./pages/Root";
import {action as logoutAction} from './pages/Logout';
import AboutUs from "./components/AboutUs";
import Register from "./components/Register";
import Login from "./components/Login";


const router = createBrowserRouter([
  {path: '/', element: <RootLayout/>,
  children:[
    {index: true, element:<Home/>},
    {path:'auth/login', element: <Login/>},
    {path:'logout', element: logoutAction},
    {path:'auth/register', element:<Register/>},
  ] },
  
  
]);

function App() {
  return (
    <RouterProvider router = {router}/>
    
  );
}

export default App;
