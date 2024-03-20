import { useEffect, useState } from 'react';
import axios from 'axios';

// Sections
import HomeSection from './sections/Home';
import Service from './sections/Service';
import Resume from './sections/Resume';
import Contact from './sections/Contact';
import Portfolio from './sections/portfolio';
import Skills from './sections/Skills';

// Components
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import { Routes } from 'react-router';


// -------------------

function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [fadeOffLoader, setFadeOffLoader] = useState<boolean>(false);

  useEffect(() => {
    const loaderTimer = setTimeout(handleLoad, 750);
    return () => {
      clearTimeout(loaderTimer);
    };
  }, []);

  const handleLoad = () => {
    setFadeOffLoader(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  
  // const [data, setData] = useState(null);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae');
  //       // setData(response.data);
  //       console.log(response.data.user);
  //     } catch (error) {
  //       // setError(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  // if (!data) {
  //   return <div>Loading...</div>;
  // }


  
  return (
    <>
      {loading ? <Loader fadeOffLoader={fadeOffLoader} /> : <></>}

      <div>
        <div className="content-right">
          <div className="content-right-wrapper">
             <div className="container-fluid">
              <div className="row">
               
                
                 <div style={{width:"80%"}}>
                      {/* <HomeSection />
                      <Service />
                      <Portfolio />
                      <Resume />
                      <Skills />
                      <Contact />
                      <Loader fadeOffLoader={false}/>
                      <Routes/> */}
                 </div>
              </div>
             </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
