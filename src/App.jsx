import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import AdminLayout from "./admin/AdminLayout";
import Login from "./admin/Login";
import Dashboard from "./admin/Dashboard";
import Posts from "./admin/Posts";
import PublicPosts from "./admin/PublicPosts";

export default function App() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
  const [posts, setPosts] = useState(() => JSON.parse(localStorage.getItem("posts")) || []);

  const handleSetPosts = (newPosts) => {
    setPosts(newPosts);
    localStorage.setItem("posts", JSON.stringify(newPosts));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />

        <Route
          path="/admin"
          element={
            user && user.role === "admin" ? (
              <AdminLayout user={user} setUser={setUser} />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard posts={posts} />} />
          <Route path="posts" element={<Posts posts={posts} setPosts={handleSetPosts} />} />
        </Route>

        <Route path="/posts" element={<PublicPosts posts={posts} />} />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
