import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./Layout";
import Login from "./components/Login";
import Register from "./components/Register"
import PostPage from "./components/Home/HomePage";
import Forgot from "./components/Forgot";
import Chats from "./components/ChatPage/Chats"
import Publish from "./components/Publish/Publish";


const router = createBrowserRouter( 
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/account-recovery" element={<Forgot/>}></Route>
      <Route path="" element={<PostPage />}></Route>
      <Route path="login" element={<Login />}></Route>
      <Route path="register" element={<Register/>}></Route>
      <Route path="chats" element={<Chats></Chats>}></Route>
      <Route path="publish" element={<Publish />}></Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
