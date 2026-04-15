import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";



export default function Message() {
  const [messages, setMessages] = useState([]);
  const [visibleDelete, setVisibleDelete] = useState(null); //to track which delete button is visible



    // ✅ Global click listener to hide delete button
  useEffect(() => {
    const handleClickOutside = () => setVisibleDelete(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);


  //Dummy data for contact form messages
    useEffect(() => {
    fetch("http://localhost:4000/admin/messages")
      .then(res => res.json())
      .then(data => setMessages(data));
  }, []);

  const handleDelete = async (id) => {
  if (window.confirm("Are you sure you want to delete this message?")) {
    await fetch(`http://localhost:4000/admin/messages/${id}`, {
      method: "DELETE",
    });
    setMessages(messages.filter(msg => msg._id !== id));
    setVisibleDelete(null); //hide delete button after deletion
  }
};

  return (
    <>
      <div className="box3 h-full items-center justify-center border-2 border-black overflow-hidden ">
        <div className="relative h-full w-full overflow-hidden">
          <div className="absolute inset-0 bg-[url('../public/img/contact.jpg')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white to-transparent"></div>
          <div className="relative z-10 p-10">
            <h1 className="contact_header  font-bold text-black justify-center items-center flex">
              <i className="bi bi-headset"></i>Messages from Contact Form
            </h1>
            <div className="max-h-screen overflow-y-auto space-y-4 hide-scrollbar">
            {messages.map((msg) => (
              <div
                key={msg._id}
                onDoubleClick={(e) =>{e.stopPropagation(); setVisibleDelete(msg._id);}}
                className="mt-4 text-gray-700 border-4 rounded-lg"
              >
                <p className="text-lg font-semibold">From: {msg.name}</p>
                <p className="text-sm text-gray-600">Email: {msg.email}</p>
                <p className="text-md font-medium">Subject: {msg.subject}</p>
                <p>{msg.message}</p>
                <small>{new Date(msg.createdAt).toLocaleString()}</small>
                    {visibleDelete === msg._id && (<button
      onClick={() => handleDelete(msg._id)}
      className="bg-red-500 text-white px-3 py-1 rounded mt-2 hover:bg-red-700"
    >
      Delete
    </button>)}
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
