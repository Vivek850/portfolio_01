import { useState, useEffect } from "react";
const API = import.meta.env.VITE_API_URL;

function UpdateHome() {
  const [formData, setFormData] = useState({
    heading: "",
    span: "",
    tagline: "",
    paras: []
  });

  const [isDirty, setIsDirty] = useState(false); // Track changes

  // ✅ GET data from backend
  useEffect(() => {
    fetch(`${API}/api/home`)
      .then(res => res.json())
      .then(data => {
        setFormData({
          heading: data.heading || "",
          span: data.span || "",
          tagline: data.tagline || "",
          paras: data.paras || []
        });
        setIsDirty(false); // Fresh load → no update button
      })
      .catch(err => console.error("Error fetching home data:", err));
  }, []);

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setIsDirty(true);
  };

  // ✅ Handle paragraph change
  const handleParaChange = (index, value) => {
    const newParas = [...formData.paras];
    newParas[index] = value;
    setFormData({ ...formData, paras: newParas });
    setIsDirty(true);
  };

  // ✅ Add new paragraph
  const addParagraph = () => {
    setFormData({ ...formData, paras: [...formData.paras, ""] });
    setIsDirty(true);
  };

  // ✅ Delete paragraph
  const deleteParagraph = (index) => {
    const newParas = formData.paras.filter((_, i) => i !== index);
    setFormData({ ...formData, paras: newParas });
    setIsDirty(true);
  };

  // ✅ Update backend (PUT)
  const handleUpdate = () => {
    fetch(`${API}/api/home`, {
      method: "PUT", // या POST अगर तुम नया बनाना चाहो
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(updatedData => {
        setFormData(updatedData); // 👈 backend से fresh data set कर दो
        setIsDirty(false);        // 👈 Update के बाद button hide
        alert("Home section updated successfully!");
      })
      .catch(err => console.error("Error updating home data:", err));
  };

  return (
    <div className="flex gap-8 p-6 bg-gray-100 min-h-screen">
      {/* Left side form */}
      <div className="w-1/2 bg-white shadow-md p-6 rounded">
        <h2 className="text-xl font-bold mb-4">Update Home Section</h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="heading"
            value={formData.heading}
            onChange={handleChange}
            placeholder="Heading"
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="span"
            value={formData.span}
            onChange={handleChange}
            placeholder="Span Text"
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="tagline"
            value={formData.tagline}
            onChange={handleChange}
            placeholder="Tagline (who loves building...)"
            className="border p-2 rounded"
          />

          {/* Dynamic Paragraphs */}
          {formData.paras.map((para, index) => (
            <div key={index} className="flex gap-2 items-start">
              <textarea
                value={para}
                onChange={(e) => handleParaChange(index, e.target.value)}
                placeholder={`Paragraph ${index + 1}`}
                className="border p-2 rounded w-full"
              />
              <button
                type="button"
                onClick={() => deleteParagraph(index)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
              >
                🗑
              </button>
            </div>
          ))}

          {/* + Add Paragraph button */}
          <button
            type="button"
            onClick={addParagraph}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            + Add Paragraph
          </button>

          {/* Update button सिर्फ तब दिखे जब data बदला हो */}
          {isDirty && (
            <button
              onClick={handleUpdate}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Update
            </button>
          )}
        </div>
      </div>

      {/* Right side live preview */}
      <div className="w-1/2 bg-white shadow-md p-6 rounded">
        <h2 className="text-xl font-bold mb-4">Live Preview</h2>
        <div className="home-preview">
          <h1 className="text-2xl font-bold">{formData.heading}</h1>
          <p className="mt-4">
            A passionate <span className="font-semibold">{formData.span}</span>{" "}
            {formData.tagline}
          </p>
          {formData.paras.map((para, index) => (
            <p key={index} className="mt-2">{para}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UpdateHome;
