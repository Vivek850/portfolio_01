import { Link, Outlet } from "react-router-dom";
import { useEffect } from "react";

export default function Admin() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:4000/admin", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message !== "Welcome to Admin Panel") {
          window.location.href = "/"; // अगर token invalid है तो login page पर redirect
        }
      })
      .catch(() => {
        window.location.href = "/"; // error होने पर भी redirect
      });
  }, []);
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-4">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-4">
          <Link to="/admin/message" className="hover:bg-gray-700 p-2 rounded">
            Message
          </Link>
          <Link
            to="/admin/UpdateSkills"
            className="hover:bg-gray-700 p-2 rounded"
          >
            Update Skills
          </Link>
          <Link
            to="/admin/UpdateProjects"
            className="hover:bg-gray-700 p-2 rounded"
          >
            Update Projects
          </Link>
          <Link
            to="/admin/UpdateHome"
            className="hover:bg-gray-700 p-2 rounded"
          >
            Update Home
          </Link>
          <Link
            to="/admin/UpdateFooter"
            className="hover:bg-gray-700 p-2 rounded"
          >
            Update footer
          </Link>
          <Link to="/" className="hover:bg-gray-700 p-2 rounded">
            Back to Site
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  );
}
