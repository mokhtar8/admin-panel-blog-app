export default function PublicPosts({ posts }) {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      {posts.length === 0 ? (
        <p>No posts yet</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="mb-4 p-4 bg-white rounded shadow">
        
            {post.image && <img src={post.image} alt={post.title} className="mt-2 rounded w-64 h-40 object-cover" />}  
              <h2 className="font-semibold">{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))
      )}
    </div>
  );
}
