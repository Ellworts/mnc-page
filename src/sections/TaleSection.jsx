import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';
import '../styles/main.scss';
import backgroundImage from '../media/png/squiggle-2.png';

const Stack = ({ children, className }) => (
  <div className={`stack ${className}`}>
    {children}
  </div>
);

const TaleSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <section className="epic-tale-section">
      <div className="image-container">
        <img src={backgroundImage} alt="Background" className="background-img" />
      </div>
      <div className="horizontal-container">
        <Stack>
          <div className='right-column'>
            <h3 data-aos="fade-up" className="item">Our Epic Tale</h3>
            <div data-aos="fade-up" className="item">
              We believe that each day is a page in our history. Here’s how our sumptuous journey unfolds:
            </div>
          </div>
        </Stack>
        <Stack className="horizontal">
          <h3 data-aos="fade-up" className="item">Moments Carved in Time</h3>
          <div data-aos="fade-right" className="item item-right">
            <span>Established</span>
            <span className="year">1980</span>
          </div>
          <div data-aos="fade-right" className="item item-right">
            <span>Winner</span>
            <span className="year">2006</span>
          </div>
          <div data-aos="fade-right" className="item item-right">
            <span>Expansion Begins</span>
            <span className="year">2010</span>
          </div>
          <div data-aos="fade-right" className="item item-right">
            <span>Rated Best</span>
            <span className="year">2024</span>
          </div>
        </Stack>
      </div>
    </section>
  );
};

export default TaleSection;
