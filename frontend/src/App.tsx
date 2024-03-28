import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Blog from "./pages/Blog";
import { Publish } from "./pages/Publish";
import { Blogs } from "./pages/Blogs";
import { RecoilRoot } from "recoil";
import Protected from "./components/ProtectedComponent";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Protected>
          <Blogs />
        </Protected>
      ),
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/signin",
      element: <Signin />,
    },
    {
      path: "/blogs",
      element: (
        <Protected>
          <Blogs />
        </Protected>
      ),
    },
    {
      path: "/blog/:id",
      element: (
        <Protected>
          <Blog />
        </Protected>
      ),
    },
    {
      path: "/publish",
      element: (
        <Protected>
          <Publish />
        </Protected>
      ),
    },
  ]);

  return (
    <>
      <RecoilRoot>
        <RouterProvider router={router} />
      </RecoilRoot>
    </>
  );
}

export default App;
