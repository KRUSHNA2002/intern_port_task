// Images
import servImg1 from '../../assets/images/services/service1.png';
import servImg2 from '../../assets/images/services/service2.png';
import servImg3 from '../../assets/images/services/service3.png';
import servImg4 from '../../assets/images/services/service4.png';
import servImg5 from '../../assets/images/services/service4.png';

// Data
import serviceData from '../../data/service.json';

import axios from 'axios';
import React , {useEffect , useState} from 'react';

// -----------------------

function Service() {
  const images: string[] = [servImg1, servImg2, servImg3, servImg4, servImg5];

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae');
        setData(response.data.user.services);
      } catch (error) {
        // setError(error);
      }
    };

    fetchData();
  }, []);
  return (
    <section id="service" className="section">
      <div className="section-wrapper block">
        <div className="content-1300">
          <div className="row">
            <div className="one-half width-55">
              <div className="services-wrapper">
                {data.map((serv, i) => (
                  <div key={'serv-' + i} className={serv.className!}>
                     <div className="row">
                       <div className="col-md-4">

                           <div className='mt-2'>
                              <img  className='mt-4 p-0' src={serv.image.url} alt={serv.imageAltText} style={{width:"200px",height:"200px"}} />
                            </div>
                        </div>
                       <div className="col-md-8 p-2 ">
                              <h4 className="service-title ">{serv.name}</h4>
                              <div className="service-text  ">{serv.desc}</div>
                              <h3>{serv.charge}</h3>
                       </div>
                     </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="one-half width-40 last">
              <h2 className="entry-title section-title text-center">{serviceData.title}</h2>
              <p className="section-info hidden">{serviceData.description}</p>
              {serviceData.paragraphes.map((parg, i) => (
                <p key={'p-' + i}>{parg}</p>
              ))}

              <div className="button-group-wrapper d-flex justify-content-center row ">
                <a className="button mt-2">Download CV</a>
                <a href="#portfolio" className="button mt-2">
                  Check My Portfolio
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Service;