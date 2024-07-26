import React, { useEffect } from "react";
import 'aos/dist/aos.css';
import AOS from 'aos';
import '../styles/main.scss';

const OurCraft = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <div className="ourCraft-section">
      <div className="grid-block" data-aos="fade-up">
        <span className="grid-img"></span>
        <div className="grid-container-side">
          <h3 data-aos="fade-right" data-aos-delay="500" className="grid-item headline">
            Fire, Metal, Beef - Our Formula For Success
          </h3>
          <h3 data-aos="fade-right" data-aos-delay="600" className="grid-item description">
            Experience the raw, intense, and robust taste of our tender, high-quality beef steaks. We grill each one to your order’s perfect 'doneness'.
          </h3>
        </div>
      </div>
      <div className="grid-block reverse" data-aos="fade-up" data-aos-delay="200">
        <div className="grid-container-side">
          <h3 data-aos="fade-left" data-aos-delay="500" className="grid-item headline">
            It's Not Just Food - It's Culinary Art
          </h3>
          <h3 data-aos="fade-left" data-aos-delay="600" className="grid-item description">
            Crafted by expert hands, our main dishes, signature steaks, sumptuous desserts, and beverages are inspired by different cuisines.
          </h3>
        </div>
        <span className="grid-img-1"></span>
      </div>
    </div>
  )
}

export default OurCraft;
