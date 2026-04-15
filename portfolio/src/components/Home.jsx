import { useState, useEffect } from "react";
import './Home.css';

function Home() {
  const [homeData, setHomeData] = useState({
    heading: "",
    span: "",
    tagline: "",
    paras: []
  });

  // ✅ Fetch data from backend
  useEffect(() => {
    fetch("http://localhost:4000/api/home")
      .then(res => res.json())
      .then(data => {
        setHomeData({
          heading: data.heading || "",
          span: data.span || "",
          tagline: data.tagline || "",
          paras: data.paras || []
        });
      })
      .catch(err => console.error("Error fetching home data:", err));
  }, []);

  return (
    <>
      <div className="home"> 
        <div data-aos="fade-right" data-aos-delay="300" data-aos-duration="1200" className='wir-data'>
          <h1 className="heading">{homeData.heading}</h1>
          <div className='content'>
            <p className="mt-4">
              A passionate <span className="font-semibold">{homeData.span}</span>{" "}
              {homeData.tagline}
            </p>
            {homeData.paras.map((para, index) => (
              <p key={index} className="mt-2">{para}</p>
            ))}
          </div>
          <div className="btns flex">
            <button
              className='btn font-bold'
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            >
              Let's Connect
            </button>
          </div>
        </div>
        
        <div data-aos="fade-left" data-aos-delay="300" data-aos-duration="1200" className="img">
          <img src='../../public/img/img.jpeg' alt="image" className='w-full h-full object-cover' />  
        </div>
      </div>
    </>
  );
}

export default Home;
