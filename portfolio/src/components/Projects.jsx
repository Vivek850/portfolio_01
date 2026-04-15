import { useState, useEffect } from "react";
import "./Projects.css";

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/admin/projects")
      .then(res => res.json())
      .then(data => setProjects(data));
  }, []);

  return (
    <div className="box2">
      <header>
        <i className="bi bi-clipboard"></i> Projects
      </header>

      {projects.map((p, index) => (
        <div key={p._id} className="project">
          <div className="pbx border-2 border-white">
            <span>Project {index + 1}</span>
            <div className="Apbx flex align-center justify-center">
              <span data-aos="fade-right" data-aos-duration="1200">
                <iframe
                  className="video"
                  src={p.videoUrl}   // DB से आने वाला YouTube embed link
                  title={p.name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </span>
              <div
                data-aos="fade-left"
                data-aos-duration="1200"
                className="Pdata"
              >
                <h3>{p.name}</h3>
                <p className="p_dis">{p.description}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default Projects;
