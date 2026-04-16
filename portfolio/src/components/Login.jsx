import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
const API = import.meta.env.VITE_API_URL;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); //form reload rokne ke liye

        const response = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token); // token save
      alert("Login successful!");
      window.location.href = "/admin"; // redirect
    } else {
      alert(data.message || "Login failed!");
    }
  };

  return (
    <>
          <div className="box3 h-screen">
        <div className="relative h-full w-full">
          <div className="absolute inset-0 bg-[url('../public/img/contact.jpg')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white to-transparent"></div>
      <div className="relative z-10 p-10">
        <h1 className="contact_header  font-bold text-black justify-center items-center flex">
          <i className="bi bi-headset"></i>Login Page
        </h1>
        <form 
        onSubmit={handleSubmit}
         className="flex relative mt-[5%] right-[25vh]
            xs:flex-col justify-center items-center xs:right-0
            smx:flex-col justify-center items-center smx:right-0">
          <div
            className="form relative h-full p-8 m-5 shadow-2lg shadow-[0_4px_10px_rgba(1,1,1,1)] rounded-2xl
               h-full w-[70vh] p-8 m-5
               "
          >
            <div className="relative w-full mb-4">
              <input
                type="email"
                id="Email"
                placeholder=" "
                value ={email}
                onChange={(e) => setEmail(e.target.value)}
                className="peer w-full border-2 border-black rounded-lg p-2 bg-transparent outline-none"
              />
              <label
                htmlFor="Email"
                className="absolute left-2 top-2 text-gray-500 transition-all peer-placeholder-shown:top-2
                    peer-placeholder-shown:text-black peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-sm peer-focus:text-black bg-transparent px-1"
              >
                Email
              </label>
            </div>
            <div className="relative w-full mb-4">
              <input
                type="password"
                id="password"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="peer w-full border-2 border-black rounded-lg p-2 bg-transparent outline-none"

              />
              <label
                htmlFor="password"
                className="absolute left-2 top-2 text-gray-500 transition-all peer-placeholder-shown:top-2
                    peer-placeholder-shown:text-black peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-sm peer-focus:text-black bg-transparent px-1"
              >
                Password
              </label>
            </div>
            <button
              type="submit"
              
              className="submit_button bg-transparent border-2 border-black float-right px-4 py-2 rounded-lg text-black hover:bg-transparent hover: shadow-2lg hover:shadow-[0_4px_10px_rgba(1,1,1,1)] hover:font-bold transition duration-300 flex p-2 hover:scale-125" 
              >Login
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
    </>
  );
}
// onClick={()=>window.open("/Admin", "_blank")}