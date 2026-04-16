import { useState, useEffect } from "react";

export default function UpdateSkills() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [showDeleteCategory, setShowDeleteCategory] = useState(null);
  const [showDeleteSkill, setShowDeleteSkill] = useState({ catId: null, skill: null });
  const API = import.meta.env.VITE_API_URL;

  // ✅ Load categories from DB
  useEffect(() => {
    fetch(`${API}/admin/skills`)
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  // ✅ Add new category
  const addCategory = async () => {
    if (newCategory.trim()) {
      const res = await fetch(`${API}/admin/skills`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategory })
      });
      const data = await res.json();
      setCategories([...categories, data]);
      setNewCategory("");
    }
  };

  // ✅ Add skill to category
  const addSkill = async (catId) => {
    if (newSkill.trim()) {
      const res = await fetch(`${API}/admin/skills/${catId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skill: newSkill })
      });
      const data = await res.json();
      setCategories(categories.map(cat => cat._id === catId ? data : cat));
      setNewSkill("");
      setActiveCategory(null);
    }
  };

  // ✅ Delete category
  const deleteCategory = async (catId) => {
    await fetch(`${API}/admin/skills/${catId}`, { method: "DELETE" });
    setCategories(categories.filter(cat => cat._id !== catId));
    setShowDeleteCategory(null);
  };

  // ✅ Delete skill
  const deleteSkill = async (catId, skill) => {
    const res = await fetch(`${API}/admin/skills/${catId}/${skill}`, {
      method: "DELETE"
    });
    const data = await res.json();
    setCategories(categories.map(cat => cat._id === catId ? data : cat));
    setShowDeleteSkill({ catId: null, skill: null });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Update Skills</h2>

      {/* Add new category box */}
      <div className="border-2 border-black p-4 mb-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Add New Category</h3>
        <input
          type="text"
          placeholder="Category Name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="border p-2 mr-2 rounded"
        />
        <button
          onClick={addCategory}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Category
        </button>
      </div>

      {/* Category boxes */}
      <div className="flex flex-wrap gap-6">
        {categories.map(cat => (
          <div
            key={cat._id}
            onDoubleClick={() => setShowDeleteCategory(cat._id)}
            className="border-2 border-gray-700 p-4 rounded-lg w-64 bg-white shadow-lg"
          >
            <h3 className="text-lg font-bold mb-2">{cat.name}</h3>

            {/* Skills inside category */}
            <ul className="mb-2">
              {cat.skills.map(skill => (
                <li
                  key={skill}
                  onDoubleClick={() => setShowDeleteSkill({ catId: cat._id, skill })}
                  className="bg-gray-200 px-2 py-1 rounded mb-1 cursor-pointer"
                >
                  {skill}
                  {showDeleteSkill.catId === cat._id && showDeleteSkill.skill === skill && (
                    <button
                      onClick={() => deleteSkill(cat._id, skill)}
                      className="ml-2 text-red-600 font-bold"
                    >
                      ✕
                    </button>
                  )}
                </li>
              ))}
            </ul>

            {/* Add skill box */}
            {activeCategory === cat._id ? (
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="New Skill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="border p-2 mr-2 rounded flex-1"
                />
                <button
                  onClick={() => addSkill(cat._id)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Add
                </button>
              </div>
            ) : (
              <button
                onClick={() => setActiveCategory(cat._id)}
                className="bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400"
              >
                +
              </button>
            )}

            {/* Delete category button */}
            {showDeleteCategory === cat._id && (
              <button
                onClick={() => deleteCategory(cat._id)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete Category
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
