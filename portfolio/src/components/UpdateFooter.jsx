import { useState, useEffect } from "react";
const API = import.meta.env.VITE_API_URL;

function UpdateFooter() {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ type: "", link: "" });
  const [isDirty, setIsDirty] = useState(false);

  // ✅ GET contacts from backend
  useEffect(() => {
    fetch(`${API}/api/footer`)
      .then(res => res.json())
      .then(data => setContacts(data))
      .catch(err => console.error("Error fetching footer data:", err));
  }, []);

  // ✅ Handle update
  const handleUpdate = (id, updated) => {
    fetch(`${API}/api/footer/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated)
    })
      .then(res => res.json())
      .then(data => {
        setContacts(contacts.map(c => (c._id === id ? data : c)));
        setIsDirty(false);
      });
  };

  // ✅ Handle delete
  const handleDelete = (id) => {
    fetch(`${API}/api/footer/${id}`, { method: "DELETE" })
      .then(() => setContacts(contacts.filter(c => c._id !== id)));
  };

  // ✅ Handle add new contact
  const handleAdd = () => {
    fetch("http://localhost:4000/api/footer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newContact)
    })
      .then(res => res.json())
      .then(data => {
        setContacts([...contacts, data]);
        setNewContact({ type: "", link: "" });
        setIsDirty(false);
      });
  };

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-xl font-bold mb-4">Update Footer Contacts</h2>

      {contacts.map(contact => (
        <div key={contact._id} className="flex justify-between items-center border p-2 mb-2 bg-white">
          <div>
            <input
              type="text"
              value={contact.type}
              onChange={(e) => {
                setIsDirty(true);
                handleUpdate(contact._id, { ...contact, type: e.target.value });
              }}
              className="border p-1 mr-2"
            />
            <input
              type="text"
              value={contact.link}
              onChange={(e) => {
                setIsDirty(true);
                handleUpdate(contact._id, { ...contact, link: e.target.value });
              }}
              className="border p-1"
            />
          </div>
          <div className="flex gap-2">
            {isDirty && (
              <button
                onClick={() => handleUpdate(contact._id, contact)}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Update
              </button>
            )}
            <button
              onClick={() => handleDelete(contact._id)}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* Add new contact */}
      <div className="flex gap-2 mt-4">
        <input
          type="text"
          placeholder="Contact Type"
          value={newContact.type}
          onChange={(e) => setNewContact({ ...newContact, type: e.target.value })}
          className="border p-1"
        />
        <input
          type="text"
          placeholder="Contact Link"
          value={newContact.link}
          onChange={(e) => setNewContact({ ...newContact, link: e.target.value })}
          className="border p-1"
        />
        {newContact.type && newContact.link && (
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            +
          </button>
        )}
      </div>
    </div>
  );
}

export default UpdateFooter;
