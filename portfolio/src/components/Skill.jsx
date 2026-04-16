import "./skill.css";
import { useState, useEffect } from "react";
const API = import.meta.env.VITE_API_URL;

function Skill() {
  const [categories, setCategories] = useState([]);

  // ✅ Load categories from DB
  useEffect(() => {
    fetch(`${API}/admin/skills`) // API endpoint to fetch skill categories with their skills
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  return (
    <div className="skill_container">
      <div className="box1">
        <header>
          <i className="bi bi-tools"></i> Technical Skills
        </header>

        {categories.map((skillCategory, index) => (
          <div key={index} data-aos="fade-up">
            <div className="skill">
              <span className="Hname">
                {/* icon optional, अगर DB में नहीं है तो सिर्फ नाम दिखेगा */}
                {skillCategory.category || skillCategory.name}
              </span>
              <div className="list">
                <dl className="flex flex-wrap gap-4 sm:flex-row">
                  {skillCategory.skills.map((item, i) => (
                    <dt
                      key={i}
                      data-aos="fade-up"
                      data-aos-duration="1200"
                      className="Uniq"
                    >
                      {item}
                    </dt>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skill;
