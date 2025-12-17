export default function PostCard({ post, dark, onDelete, onEdit }) {
  return (
    <div
      className={`p-4 mb-3 rounded shadow ${
        dark ? "bg-gray-800 text-gray-200" : "bg-white text-gray-900"
      }`}
    >  
       {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className={`mt-2 rounded ${dark ? "brightness-75" : "brightness-100"}`}
        />
      )}
      <h3 className="font-semibold">{post.title}</h3>
      <p>{post.content}</p>
 
      <div className="mt-2 space-x-2">
        <button
          onClick={onEdit}
          className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
