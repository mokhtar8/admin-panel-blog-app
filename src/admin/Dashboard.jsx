import { useOutletContext } from "react-router-dom";

export default function Dashboard({ posts }) {
  const { dark } = useOutletContext();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Total Posts: {posts.length}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((post) => (
          <div key={post.id} className={`p-4 rounded shadow ${dark ? "bg-gray-700 text-gray-200" : "bg-gray-100 text-gray-900"}`}>
            <h3 className="font-semibold">{post.title}</h3>
            <p>{post.content}</p>
            {post.image && <img src={post.image} alt={post.title} className="mt-2 w-64 h-40 object-cover rounded" />}
          </div>
        ))}
      </div>
    </div>
  );
}
