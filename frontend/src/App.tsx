import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Blog from './pages/Blog';

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
      path: "/blog",
      element: <Blog/>,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
