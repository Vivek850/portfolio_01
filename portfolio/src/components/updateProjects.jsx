import { useState, useEffect } from "react";
const API = import.meta.env.VITE_API_URL;

export default function UpdateProjects() {
  const [projects, setProjects] = useState([]);
  const [editedFields, setEditedFields] = useState({}); // track edited fields

  useEffect(() => {
    fetch(`${API}/admin/projects`)
      .then(res => res.json())
      .then(data => setProjects(data));
  }, []);

  // ✅ Add new project box
  const addProjectBox = async () => {
    const res = await fetch(`${API}/admin/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "", description: "", videoUrl: "" })
    });
    const data = await res.json();
    setProjects([...projects, data]);
  };

  // ✅ Track changes
  const handleChange = (id, field, value) => {
    setProjects(projects.map(p => p._id === id ? { ...p, [field]: value } : p));
    setEditedFields({ ...editedFields, [`${id}-${field}`]: true });
  };

  // ✅ Update project field
  const updateProject = async (id, field, value) => {
    const project = projects.find(p => p._id === id);
    const updated = { ...project, [field]: value };

    const res = await fetch(`${API}/admin/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated)
    });
    const data = await res.json();
    setProjects(projects.map(p => p._id === id ? data : p));
    setEditedFields({ ...editedFields, [`${id}-${field}`]: false }); // hide button after update
  };

  // ✅ Delete project box
  const deleteProjectBox = async (id) => {
    await fetch(`${API}/admin/projects/${id}`, { method: "DELETE" });
    setProjects(projects.filter(p => p._id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Update Projects</h2>

      {/* Add Project Button */}
      <button
        onClick={addProjectBox}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mb-6"
      >
        +
      </button>

      {/* Project Boxes */}
      <div className="flex flex-wrap gap-6">
        {projects.map((p, index) => (
          <div
            key={p._id}
            onDoubleClick={() => deleteProjectBox(p._id)}
            className="border-2 border-gray-700 p-4 rounded-lg w-80 bg-white shadow-lg"
          >
            <h3 className="text-lg font-bold mb-2">Project {index + 1}</h3>

            {/* Video Link */}
            <div className="flex items-center mb-2">
              <input
                type="text"
                placeholder="YouTube Embed Link"
                value={p.videoUrl}
                onChange={(e) => handleChange(p._id, "videoUrl", e.target.value)}
                className="border p-2 rounded flex-1"
              />
              {editedFields[`${p._id}-videoUrl`] && (
                <button
                  onClick={() => updateProject(p._id, "videoUrl", p.videoUrl)}
                  className="ml-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Update
                </button>
              )}
            </div>

            {/* Project Name */}
            <div className="flex items-center mb-2">
              <input
                type="text"
                placeholder="Project Name"
                value={p.name}
                onChange={(e) => handleChange(p._id, "name", e.target.value)}
                className="border p-2 rounded flex-1"
              />
              {editedFields[`${p._id}-name`] && (
                <button
                  onClick={() => updateProject(p._id, "name", p.name)}
                  className="ml-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Update
                </button>
              )}
            </div>

            {/* Description */}
            <div className="flex items-center mb-2">
              <textarea
                placeholder="Description"
                value={p.description}
                onChange={(e) => handleChange(p._id, "description", e.target.value)}
                className="border p-2 rounded flex-1"
              />
              {editedFields[`${p._id}-description`] && (
                <button
                  onClick={() => updateProject(p._id, "description", p.description)}
                  className="ml-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Update
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
