// Data
import homeData from '../../data/home.json';
import axios from 'axios';
import React , {useEffect , useState} from 'react';

// ---------------

function Home() {

  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae');
        setData(response.data.user.social_handles);

        setData2(response.data.user.about);
        // console.log(data2);
      } catch (error) {
        // setError(error);
      }
    };

    fetchData();
  }, []);

  // console.log(data);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data || data.length === 0) {
    return <div>Loading...</div>;
  }
  
  return (
    <section id="home" className="section full-width-section ">
      <div className="section-wrapper block">
        <div className="home-left-part">
          <p className="site-des">{data2.quote}</p>
          <h1 className="entry-title">{data2.name}</h1>
          <p className="site-info">{data2.subTitle}</p>

          <div className="social-links d-flex flex-inline">
            {data.map((item, i) => (
              <a key={'social-link-' + i} href={item.url}>
                <img src={item.image.url} alt={item.platform} style={{width:'50px',height:'50px'}} />
              </a>
            ))}
          </div>
        </div>
        <div className="home-right-part">
          <img src={data2.avatar.url} alt="" style={{width:'100%'}} />
        </div>
      </div>
    </section>
  );
}

export default Home;
