import { useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function Posts({ posts, setPosts }) {
  const { dark, user } = useOutletContext();
  const [newPost, setNewPost] = useState({ title: "", content: "", image: null });
  const [preview, setPreview] = useState(null);

  const [editPostData, setEditPostData] = useState(null); // برای Modal
  const [editPreview, setEditPreview] = useState(null);

  if (user.role !== "admin") return <p>Access Denied</p>;

  // افزودن پست جدید
  const addPost = () => {
    if (!newPost.title || !newPost.content) return;
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const imageUrl = newPost.image ? URL.createObjectURL(newPost.image) : null;
    setPosts([...posts, { ...newPost, id, image: imageUrl }]);
    setNewPost({ title: "", content: "", image: null });
    setPreview(null);
  };

  // حذف پست
  const deletePost = (id) => setPosts(posts.filter((p) => p.id !== id));

  // باز کردن Modal برای ویرایش
  const openEditModal = (post) => {
    setEditPostData(post);
    setEditPreview(post.image || null);
  };

  // ذخیره تغییرات پست
  const saveEdit = () => {
    setPosts(
      posts.map((p) =>
        p.id === editPostData.id
          ? { ...p, title: editPostData.title, content: editPostData.content, image: editPreview }
          : p
      )
    );
    setEditPostData(null);
    setEditPreview(null);
  };

  return (
    <div className="space-y-4">
      {/* افزودن پست جدید */}
      <div className={`p-4 rounded ${dark ? "bg-gray-800 text-gray-200" : "bg-white text-gray-900"}`}>
        <h2 className="text-xl font-bold mb-2">Add New Post</h2>
        <input
          type="text"
          placeholder="Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          className="border p-1 w-full mb-2 rounded"
        />
        <textarea
          placeholder="Content"
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
          className="border p-1 w-full mb-2 rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            setNewPost({ ...newPost, image: file });
            setPreview(file ? URL.createObjectURL(file) : null);
          }}
          className="mb-2"
        />
        {preview && <img src={preview} alt="preview" className="w-48 h-32 object-cover mb-2 rounded" />}
        <button onClick={addPost} className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
          Add Post
        </button>
      </div>

      {/* لیست پست‌ها */}
      {posts.map((post) => (
        <div key={post.id} className={`p-4 rounded shadow ${dark ? "bg-gray-700 text-gray-200" : "bg-gray-100 text-gray-900"}`}>
          <h3 className="font-semibold">{post.title}</h3>
          <p>{post.content}</p>
          {post.image && <img src={post.image} alt={post.title} className="mt-2 w-64 h-40 object-cover rounded" />}
          <div className="mt-2 space-x-2">
            <button
              onClick={() => openEditModal(post)}
              className="bg-yellow-500 px-2 py-1 rounded text-white"
            >
              Edit
            </button>
            <button
              onClick={() => deletePost(post.id)}
              className="bg-red-600 px-2 py-1 rounded text-white"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* Modal ویرایش */}
      {editPostData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`p-6 rounded w-96 ${dark ? "bg-gray-800 text-gray-200" : "bg-white text-gray-900"}`}>
            <h2 className="text-xl font-bold mb-2">Edit Post</h2>
            <input
              type="text"
              value={editPostData.title}
              onChange={(e) => setEditPostData({ ...editPostData, title: e.target.value })}
              className="border p-1 w-full mb-2 rounded"
            />
            <textarea
              value={editPostData.content}
              onChange={(e) => setEditPostData({ ...editPostData, content: e.target.value })}
              className="border p-1 w-full mb-2 rounded"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setEditPreview(file ? URL.createObjectURL(file) : null);
              }}
              className="mb-2"
            />
            {editPreview && <img src={editPreview} alt="preview" className="w-48 h-32 object-cover mb-2 rounded" />}
            <div className="flex justify-end space-x-2 mt-2">
              <button onClick={() => setEditPostData(null)} className="px-4 py-1 rounded border">
                Cancel
              </button>
              <button onClick={saveEdit} className="bg-green-600 px-4 py-1 rounded text-white hover:bg-green-700">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
