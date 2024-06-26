

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import serviceData from '../../data/service.json';
interface ServiceData {
  name: string;
  desc: string;
  charge: string;
  className?: string; // Assuming className is optional
  image: {
    url: string;
  };
  imageAltText: string;
}

function Service() {
  const [data, setData] = useState<ServiceData[]>([]);
  const [error, setError] = useState<Error | null>(null);

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

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data || data.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <section id="service" className="section">
      <div className="section-wrapper block">

        <div className="col-md-12 text-center">
          <h1 className='text-center'>services</h1>
          <a className="button mt-2">Download CV</a>
                <a href="#portfolio" className="button mt-2 ms-2">
                  Check My Portfolio
                </a>
        </div>
        <div className="content-1300 ">
                <div className="row  mt-3 ">
                  {data.map((serv, i) => (
                   <div className="col-md-6 d-flex justify-content-center">
                     <div key={'serv-' + i} className={serv.className || ''}>
                     <div className="row">
                       <div className="col-md-4">
                           <div className='mt-2 d-flex justify-content-center'>
                              <img  className='mt-4 p-0 ' src={serv.image.url} alt={serv.imageAltText} style={{width:"200px",height:"200px"}} />
                            </div>
                        </div>
                       <div className="col-md-8 p-2 ">
                              <h4 className="service-title text-center ">{serv.name}</h4>
                              <div className="service-text text-center ">{serv.desc}</div>
                              <h3 className='text-center'>{serv.charge}</h3>
                       </div>
                     </div>
                    </div>
                   </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}

export default Service;
