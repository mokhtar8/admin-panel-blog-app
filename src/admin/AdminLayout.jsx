import { Outlet, Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function AdminLayout({ user, setUser }) {
  const [dark, setDark] = useState(JSON.parse(localStorage.getItem("dark")) || false);

  useEffect(() => {
    localStorage.setItem("dark", JSON.stringify(dark));
  }, [dark]);

  const sidebarClasses = dark
    ? "w-64 p-4 flex flex-col justify-between bg-gray-800 text-gray-200"
    : "w-64 p-4 flex flex-col justify-between bg-gray-200 text-gray-900";

  const mainClasses = dark
    ? "flex-1 p-6 bg-gray-900 text-gray-200"
    : "flex-1 p-6 bg-gray-100 text-gray-900";

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
  

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className={sidebarClasses}>
          <nav className="space-y-2">
            <Link to="dashboard" className="block hover:underline">
              📊 Dashboard
            </Link>
            <Link to="posts" className="block hover:underline">
              📝 Posts
            </Link>  
              {/* Dark Mode Toggle بالای صفحه */}
      <div
        className={`flex justify-center p-4 ${
          dark ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-900"
        }`}
      >
        <button
          onClick={() => setDark(!dark)}
          className={`px-4 py-1 rounded ${
            dark ? "bg-gray-700 text-gray-200" : "bg-gray-800 text-white"
          }`}
        >
          {dark ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>
          </nav>

          {/* Logout پایین Sidebar */}
          <button
            onClick={() => {
              localStorage.removeItem("user");
              setUser(null);
            }}
            className="mt-4 w-full bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </aside>

        {/* Main content */}
        <main className={mainClasses}>
          <Outlet context={{ dark, user }} />
        </main>
      </div>
    </div>
  );
}
