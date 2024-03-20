import { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import axios from 'axios';
import React, { useEffect } from 'react';
import signature from '../assets/images/signature.png';
import navData from '../data/navbar.json';

type NavbarProps = {
  isLanding: boolean;
};

function Navbar({ isLanding }: NavbarProps) {
  const [navActive, setNavActive] = useState<boolean>(false);
  const [sectionNum, setSectionNum] = useState<number>(1);
  const [data, setData] = useState<any>(null);

  const handleLinkClick = () => {
    setNavActive(false);
  };

  const handleActive = (numToActivate: number) => {
    setSectionNum(numToActivate);
  };

  const handleMenuBtnClick = () => {
    setNavActive(!navActive);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae');
        setData(response.data.user.about);
      } catch (error) {
        // Handle error
      }
    };

    fetchData();
  }, []);

  return (
    <div className="content-left">
      <div className="content-left-wrapper">
        <header>
          <div className="toggle-holder">
            <div
              id="toggle"
              onClick={handleMenuBtnClick}
              className={navActive ? 'on' : ''}>
              <div className="menu-line"></div>
            </div>
          </div>

          <div className="top-pagination">
            <div className="current-num">
              <span>0{sectionNum}</span>
            </div>
            <div className="pagination-div"></div>
            <div className="total-pages-num">0{navData.navLinks.length}</div>
          </div>

          <div className={navActive ? 'menu-holder open' : 'menu-holder'}>
            <div className="menu-wrapper relative">
              <nav id="header-main-menu">
                <ul className="main-menu sm sm-clean">
                  {navData.navLinks.map((link, i) => (
                    <li key={'nav-' + i} style={{ cursor: 'pointer' }}>
                      <ScrollLink
                        activeClass="current"
                        smooth
                        spy
                        to={link.to}
                        onClick={handleLinkClick}
                        onSetActive={() => handleActive(i + 1)}>
                        {link.text}
                      </ScrollLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          <div className='d-none d-md-block'>
            {data && (
              <>
                <div className='mt-2'>
                  <span>Name</span>
                  <h5 className='' style={{ fontWeight: "bold", fontSize: "20px" }}>{data.name}</h5>
                </div>
                <div className='mt-2'>
                  <span>Role</span>
                  <h5 className='' style={{ fontWeight: "bold", fontSize: "20px" }}>{data.title}</h5>
                </div>
                <div className='mt-2'>
                  <span>Phone</span>
                  <h5 className='' style={{ fontWeight: "bold", fontSize: "20px" }}>{data.phoneNumber}</h5>
                </div>
              </>
            )}
          </div>
          <img className="my-info-signature hidden" src={signature} alt="" />
          <div className="big-num">
            <div className="current-big-num">0{sectionNum}</div>
            <div className="icon-scroll"></div>
          </div>
        </header>
      </div>
    </div>
  );
}

export default Navbar;
