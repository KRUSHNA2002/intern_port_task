import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './portfolio.css'; // Import CSS file for styles

// UI Components
import PortfolioItem1 from './items/PortfolioItem1';
import PortfolioItem2 from './items/PortfolioItem2';
import PortfolioItem3 from './items/PortfolioItem3';

// Images
import portfolio1 from '../../../assets/images/portfolio/portfolio1.jpg';
import portfolio2 from '../../../assets/images/portfolio/portfolio2.jpg';
import portfolio3 from '../../../assets/images/portfolio/portfolio3.jpg';
import portfolio4 from '../../../assets/images/portfolio/portfolio4.jpg';
import portfolio5 from '../../../assets/images/portfolio/portfolio5.jpg';
import portfolio6 from '../../../assets/images/portfolio/portfolio6.jpg';
import portfolio7 from '../../../assets/images/portfolio/portfolio6.jpg';
import portfolioItem1Image from '../../../assets/images/portfolio/items/item_01.jpg';
import portfolioItem2Image from '../../../assets/images/portfolio/items/item_02.jpg';
import backArrow from '../../../assets/images/close-left-arrow.png';
import closeIcon from '../../../assets/images/close.png';

// Data
import portfolioData from '../../../data/portfolio.json';
import { PortfolioItemType } from '../../../types/portfolio.types';

function Portfolio() {
  const images: string[] = [
    portfolio1,
    portfolio2,
    portfolio3,
    portfolio4,
    portfolio5,
    portfolio6,
    portfolio7,
  ];

  const [portfolioItem, setPortfolioItem] = useState<number>(0);
  const [openPortfolio, setOpenPortfolio] = useState<number>(0);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [data, setData] = useState<PortfolioItemType[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae');
        setData(response.data.user.projects);
      } catch (error) {
        setError('Error fetching data');
      }
    };

    fetchData();
  }, []);

  const handleToggleFilterBtns = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleFilterImages = (category: string) => {
    setSelectedCategory(category);
  };


  const handleOpenItem = (num: number) => {
    setPortfolioItem(num);
  };

  const handleCloseItem = () => {
    setPortfolioItem(0);
  };

  const handleOpenPopup = (num: number) => {
    setOpenPortfolio(num);
  };

  const handleClosePopup = () => {
    setOpenPortfolio(0);
  };

  return (
    <section id="portfolio" className="section">
         <div className="col-md-12">
            <h1 className='text-center'>Projects</h1>
         </div>
      <div className="section-wrapper block">
        <div className="content-1300">
          <div id="portfolio-wrapper" className="relative">
            {portfolioItem === 0 ? (
              <>
                <div
                  className="category-filter"
                  onClick={handleToggleFilterBtns}>
                  <div className="category-filter-icon"></div>
                </div>
                <motion.div
                  variants={{
                    expanded: {
                      height: 'auto',
                      paddingTop: '24px',
                      paddingBottom: '24px',
                      opacity: 1,
                      transition: {
                        duration: 0.3,
                      },
                    },
                    collapsed: {
                      height: 0,
                      paddingTop: 0,
                      paddingBottom: 0,
                      opacity: 1,
                      transition: {
                        duration: 0.3,
                      },
                    },
                  }}
                  animate={isFilterOpen ? 'expanded' : 'collapsed'}
                  initial="collapsed"
                  className={
                    'category-filter-list button-group filters-button-group visible'
                  }>
                  {portfolioData.filter.map((flBtn, i) => (
                    <div
                      key={'filter-btn-' + i}
                      className={
                        'button ' +
                        (selectedCategory === flBtn.category
                          ? 'is-checked'
                          : '')
                      }
                      onClick={() => handleFilterImages(flBtn.category)}>
                      {flBtn.text}
                    </div>
                  ))}
                </motion.div>
                <div className="portfolio-load-content-holder"></div>
                <motion.div className="grid" id="portfolio-grid" layout>
                  {data
                    .filter(item =>
                      selectedCategory === 'all'
                        ? true
                        : item.category.toLowerCase() === selectedCategory.toLowerCase()
                    )
                    .map((item, i) => (
                      <AnimatePresence key={'portfolio-item-' + i}>
                        <motion.div
                          // layout
                          animate={{ scale: 1, opacity: 1 }}
                          initial={{ scale: 0, opacity: 0 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          id={'p-item-' + (i + 1)}
                          className="grid-item element-item p-one-third">
                          <a
                            className="item-link ajax-portfolio"
                            style={{ position: 'relative' }}
                            data-id={i + 1}
                            onClick={() => {
                              if (
                                item?.action?.type === 'item' &&
                                typeof item?.action?.number === 'number'
                              ) {
                                handleOpenItem(item.action.number);
                              } else if (
                                item?.action?.type === 'popup' &&
                                typeof item?.action?.number === 'number'
                              ) {
                                handleOpenPopup(item.action.number);
                              }
                            }}>
                            <img src={item.image.url} alt="" />

                            <div className="portfolio-text-holder">
                              <div className="portfolio-text-wrapper">
                                <p className="portfolio-text">
                                  {item.title}
                                </p>
                                <p className="portfolio-cat">
                                  {item.category}
                                </p>
                     
                              </div>
                              
                            </div>
                          </a>
                             <div className='d-flex justify-content-around mt-2'>
                                <button className='btn btn-outline-warning' ><a href="https://github.com/KRUSHNA2002/intern_port_task" target='_blank' className='text-white'>Github</a></button>
                                 <button className='btn btn-outline-warning'><a href="https://intern-dynamic-portfolio.netlify.app/" target='_blank' className='text-white'>Liveurl</a> </button>
                             </div>


                        </motion.div>
                      </AnimatePresence>
                    ))}
                </motion.div>
              </>
            ) : (
              // Portfolio items to be opened as a separate component
              <div className="portfolio-load-content-holder">
                <div
                  className="close-icon"
                  role="button"
                  onClick={handleCloseItem}>
                  <img src={backArrow} alt="back arrow"
                  />
                </div>
                {portfolioItem === 1 ? (
                  <PortfolioItem1 />
                ) : portfolioItem === 2 ? (
                  <PortfolioItem2 />
                ) : portfolioItem === 3 ? (
                  <PortfolioItem3 />
                ) : (
                  <></>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Popups portfolio items */}
      <Popup
        open={openPortfolio !== 0}
        closeOnDocumentClick
        onClose={handleClosePopup}
        modal
      >
        <div className="my-popup">
          <div className="close-popup-btn" role="button"
        onClick={handleClosePopup}>
            <img src={closeIcon} alt="close icon" />
          </div>
          {openPortfolio === 1 ? (
            <p className="block-right poped-up-item" onClick={handleClosePopup}>
              <iframe
                src="https://player.vimeo.com/video/199192931"
                width="100%"
                allow="autoplay; fullscreen"
                title="Portfolio Video"
              ></iframe>
            </p>
          ) : openPortfolio === 2 ? (
            <div className="popup-image-box">
              <img src={portfolioItem1Image} alt="portfolio image" />
            </div>
          ) : openPortfolio === 3 ? (
            <div className="popup-image-box">
              <img src={portfolioItem2Image} alt="portfolio image" />
            </div>
          ) : (
            <></>
          )}
        </div>
      </Popup>
    </section>
  );
}

export default Portfolio;
