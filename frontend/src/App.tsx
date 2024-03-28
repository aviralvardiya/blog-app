import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Blog from './pages/Blog';
import Publish from './pages/Publish';
import { Blogs } from './pages/Blogs';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Hello world!</div>,
    },
    {
      path: "/signup",
      element: <Signup/>,
    },
    {
      path: "/signin",
      element: <Signin/>,
    },
    {
      path: "/blogs",
      element: <Blogs/>,
    },
    {
      path: "/blog/:id",
      element: <Blog/>,
    },
    {
      path: "/publish",
      element: <Publish/>,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
