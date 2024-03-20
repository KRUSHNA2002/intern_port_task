import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import skillsData from '../../data/skills.json';

interface SkillData {
  name: string;
  percentage: number;
}

function Skills() {
  const [data, setData] = useState<SkillData[]>([]);
  const [error, setError] = useState<Error | null>();
  const [circleProgress, setCircleProgress] = useState<number[]>(new Array(4).fill(0));
  const [normalProgress, setNormalProgress] = useState<number[]>(new Array(4).fill(0));
  const circleProgressBarRef = useRef<HTMLDivElement>(null);
  const normalProgressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae');
        const slicedSkills = response.data.user.skills.slice(0, 3); // Slice the first four skills
        setData(slicedSkills);
      } catch (error) {
        // setError(error);
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
        setCircleProgress(data.map(skill => skill.percentage));
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
        setNormalProgress(data.slice(4).map(skill => skill.percentage));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [data, normalProgressBarRef.current]);

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
              <div className="row d-flex justify-content-center align-items-center" ref={circleProgressBarRef}>
                {data.slice(0, 4).map((skill, i) => (
                  <div key={'circle-prog-' + i} className="skill-circle">
                    <div className='mb-2'>
                      <CircularProgressbar
                        value={circleProgress[i]}
                        text={`${skill.percentage}%`}
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
                    <p className="skill-circle-text mb-5">{skill.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="row hidden" ref={normalProgressBarRef}>
            <div className="one-half">
              <div className="skills-holder">
                {data.slice(4).map((skill, i) => (
                  <div key={'normal-skill-' + i} className="skill-holder">
                    <div className="skill-text">
                      <div className="skill">
                        <div className="skill-fill" style={{ width: `${normalProgress[i]}%` }}></div>
                      </div>
                      <span>{skill.name}</span>
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
