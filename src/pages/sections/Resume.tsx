// Images
import signature from '../../assets/images/signature2.png';
import { useRef, useEffect, useState } from 'react';
import axios from 'axios';
// Data
import resumeData from '../../data/resume.json';
import { markdownToHTML } from '../../utils/converter';

// -------------

function Resume() {

  const [data, setData] = useState([]);
  const [error, setError] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae');
        setData(response.data.user.timeline);
        // console.log(response.data.user.timeline);
      } catch (error) {
        // setError(error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    // return <div>Error: {error}</div>;
  }

  if (!data) {
    // return <div>Loading...</div>;
  }

  const startDateString = "2023-11-13T00:00:00.000Z";
  const startDate = new Date(startDateString);

  return (
    <section id="resume" className="section">
      <div className="section-wrapper block">
        <div className="content-1300">
          <div className="row">
            <div className="one-half width-55">
              <h2 className="entry-title section-title">
                {resumeData.experience.title}
              </h2>

              <ul className="timeline-holder">
                {data.map((exp, i) => (
                  <li key={'exp-' + i} className="timeline-event">
                    <div
                      className="timeline-event-content"
                     >{exp.bulletPoints}</div>
                    <div className="timeline-event-date">{new Date(exp.startDate).getFullYear()}-{new Date(exp.endDate).getFullYear()}</div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="one-half width-40 last">
              <h2 className="entry-title section-title">
                {resumeData.coverLetter.title}
              </h2>
              <p className="section-info">
                {resumeData.coverLetter.description}
              </p>
              {resumeData.coverLetter.paragraphes.map((parg, i) => (
                <p key={'parg-' + i}>{parg}</p>
              ))}

              <img className="my-signature" src={signature} alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Resume;
