import React from 'react';
import DeleteMessage from "./pages/deleteMessagePage/DeleteMessage";
import EditMessage from "./pages/editMessagePage/EditMessage";
import Home from "./pages/homePage/Home";
import PostMessage from "./pages/postMessagePage/PostMessage";
import UserMessages from "./pages/userMessagePage/UserMessages";
import { Routes, Route } from 'react-router-dom';
import './app.css';

function App() {
  return (
    <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<PostMessage />} />
          <Route path="/edit" element={<EditMessage />} />
          <Route path="/delete" element={<DeleteMessage />} />
          <Route path="/user/:userName" element={<UserMessages />} />
        </Routes>
    </div>
  );
}

export default App;
