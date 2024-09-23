import DeleteMessage from "./pages/DeleteMessage"
import EditMessage from "./pages/EditMessage"
import Home from "./pages/Home"
import PostMessage from "./pages/PostMessage"
import UserMessages from "./pages/UserMessages"
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<PostMessage />} />
          <Route path="/Edit" element={<EditMessage />} />
          <Route path="/delete" element={<DeleteMessage />} />
          <Route path="/user" element={<UserMessages />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
