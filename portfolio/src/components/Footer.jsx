import { useState, useEffect } from "react";
import './Home.css';

function Footer() {
  const [contacts, setContacts] = useState([]);

  // ✅ Fetch contacts from backend
  useEffect(() => {
    fetch("http://localhost:4000/api/footer")
      .then(res => res.json())
      .then(data => setContacts(data))
      .catch(err => console.error("Error fetching footer data:", err));
  }, []);

  return (
    <>
      <div className=" bg-black p-5 text-white flex w-screen h-auto">
        <footer className="flex justify-center items-center flex-col w-full">
          <div className="flex w-full items-center justify-between 
           xs:flex-col xs:gap-0
           smx:flex-col smx:gap-4 
           sm:flex-row sm:gap-0
           md:flex-row md:gap-0
           lg:flex-row lg:gap-0
           xl:flex-row xl:gap-0
           2xl:flex-row 2xl:gap-0
           3xl:flex-row 3xl:gap-0
           4xl:flex-row 4xl:gap-0
           ">
            {/* Left side intro */}
            <div className="w-[20%] xs:w-[100%] smx:w-[100%] sm:w-[30%] ">
              <h1 className="p-2 
                smx:text-base smx:p-2 w-full
                xs:text-base xs:p-2
                sm:text-2xl sm:p-2
                md:text-2xl md:p-2
                lg:text-2xl lg:p-2
                xl:text-2xl xl:p-2
                2xl:text-2xl 2xl:p-2
                3xl:text-2xl 3xl:p-2
                4xl:text-2xl 4xl:p-2
                ">Vivek's Portfolio</h1>
              <p className="p-2 
              smx:text-xs smx:p-1
                xs:text-xs xs:p-1
                sm:text-xs sm:p-2
                md:text-sm md:p-2
                lg:text-base lg:p-2
                xl:text-base xl:p-2
                2xl:text-base 2xl:p-2
                3xl:text-base 3xl:p-2
                4xl:text-base 4xl:p-2
                ">
                Thank you for visiting my personal portfolio website. Connect
                with me over socials.
                <br /><br />
                Keep Rising 🚀. Connect with me over live chat!
              </p>
            </div>

            {/* Middle navigation */}
            <div className="m-2 justify-center items-center flex w-full ">
              <ul className="flex p-4 m-4
                smx:text-xs smx:p-0
                xs:text-xs xs:p-0  mr-[-2em]
                sm:text-sm sm:p-0
                md:text-sm md:p-0
                sm:text-xs sm:p-2
                md:text-sm md:p-2
                lg:text-base lg:p-2
                xl:text-base xl:p-2
                2xl:text-base 2xl:p-2
                3xl:text-base 3xl:p-2
                4xl:text-base 4xl:p-2
                ">
                <li className="pr-12">
                  <button
                    onClick={() =>
                      document.getElementById("home").scrollIntoView({ behavior: "smooth" })
                    }
                    className="bg-transparent text-white"
                  >
                    Home
                  </button>
                </li>
                <li className="pr-11">
                  <button
                    onClick={() =>
                      document.getElementById("skill").scrollIntoView({ behavior: "smooth" })
                    }
                    className="bg-transparent text-white"
                  >
                    Skills
                  </button>
                </li>
                <li className="pr-11">
                  <button
                    onClick={() =>
                      document.getElementById("projects").scrollIntoView({ behavior: "smooth" })
                    }
                    className="bg-transparent text-white"
                  >
                    Projects
                  </button>
                </li>
                <li className="pr-11">
                  <button
                    onClick={() =>
                      document.getElementById("contact").scrollIntoView({ behavior: "smooth" })
                    }
                    className="bg-transparent text-white"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Right side dynamic contacts */}
            <div className="p-2">
              <h1 className="p-2
              smx:text-xl smx:p-2 w-full
                xs:text-xl xs:p-2 w-full
                sm:text-2xl sm:p-2 w-full
                md:text-2xl md:p-2
                lg:text-2xl lg:p-2
                xl:text-2xl xl:p-2
                2xl:text-2xl 2xl:p-2
                3xl:text-2xl 3xl:p-2
                4xl:text-2xl 4xl:p-2">Contact Info</h1>
              {contacts.map((c) => (
                <p key={c._id} className="p-2 
                smx:text-xs smx:p-1
                xs:text-xs xs:p-1
                sm:text-xs sm:p-2
                md:text-sm md:p-2
                lg:text-base lg:p-2
                xl:text-base xl:p-2
                2xl:text-base 2xl:p-2
                3xl:text-base 3xl:p-2
                4xl:text-base 4xl:p-2
                ">
                  {c.type}: {c.link}
                </p>
              ))}
            </div>
          </div>

          <p className="justify-center p-2">© 2026 BY VIVEK</p>
        </footer>
      </div>
    </>
  );
}

export default Footer;
