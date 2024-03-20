import { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import skillsData from '../../data/skills.json';

function Skills() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [circleProgress, setCircleProgress] = useState(new Array(data.length).fill(0));
  const [normalProgress, setNormalProgress] = useState(new Array(skillsData.horizontalProgress.length).fill(0));
  const circleProgressBarRef = useRef<HTMLDivElement>(null);
  const normalProgressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae');
        setData(response.data.user.skills);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const circleProgressBarElement = circleProgressBarRef.current;
    if (!circleProgressBarElement) return;

    const progressBarYPosition = circleProgressBarElement.getBoundingClientRect().top + window.scrollY;
    const handleScroll = () => {
      if (window.scrollY >= progressBarYPosition) {
        setCircleProgress(data.map(progress => progress.percentage));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [data, circleProgressBarRef.current]);

  useEffect(() => {
    const normalProgressBarElement = normalProgressBarRef.current;
    if (!normalProgressBarElement) return;

    const progressBarYPosition = normalProgressBarElement.getBoundingClientRect().top + window.scrollY;
    const handleScroll = () => {
      if (window.scrollY >= progressBarYPosition) {
        setNormalProgress(skillsData.horizontalProgress.map(progress => progress.percentage));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [skillsData.horizontalProgress]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <section id="skills" className="section">
      <div className="section-wrapper block">
        <div className="content-1300">
          <div className="row m-bottom-60">
            <h2 className="entry-title section-title text-center">{skillsData.title}</h2>
          <div className="skill-circle-holder ">
          <div className="row d-flex justify-content-center align-items-center">
              {data.map((prog, i) => (
                <div key={'circle-prog-' + i} className="skill-circle">
                  <div ref={circleProgressBarRef} className='mb-2'>
                    <CircularProgressbar
                      value={circleProgress[i]}
                      text={`${prog.percentage}%`}
                      counterClockwise
                      strokeWidth={15}
                      styles={buildStyles({
                        textColor: '#F37B83',
                        textSize: 18,
                        pathColor: '#F37B83',
                        trailColor: '#554247',
                        strokeLinecap: 'butt',
                        pathTransitionDuration: 2,
                      })}
                    />
                  </div>
                  <p className="skill-circle-text mb-5">{prog.name}</p>
                </div>
              ))}
            </div>
          </div>
          </div>
          <div className="row hidden" ref={normalProgressBarRef} >
            <div className="one-half">
              <div className="skills-holder">
                {skillsData.horizontalProgress.slice(0, Math.ceil(skillsData.horizontalProgress.length / 2)).map((skill, i) => (
                  <div key={'skill-' + i} className="skill-holder">
                    <div className="skill-text">
                      <div className="skill">
                        <div className="skill-fill" style={{ width: `${normalProgress[i]}%` }}></div>
                      </div>
                      <span>{skill.title}</span>
                    </div>
                    <div className="skill-percent">{skill.percentage}%</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="one-half last">
              <div className="skills-holder sec-skills-holder">
                {skillsData.horizontalProgress.slice(Math.ceil(skillsData.horizontalProgress.length / 2)).map((skill, i) => (
                  <div key={'skill2-' + i} className="skill-holder">
                    <div className="skill-text">
                      <div className="skill">
                        <div className="skill-fill" style={{ width: `${normalProgress[i + Math.ceil(skillsData.horizontalProgress.length / 2)]}%` }}></div>
                      </div>
                      <span>{skill.title}</span>
                    </div>
                    <div className="skill-percent">{skill.percentage}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
