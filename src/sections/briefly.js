import React, { useEffect } from "react";
import 'aos/dist/aos.css';
import AOS from 'aos';
import '../styles/main.scss';

const BrieflySection = () => {

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <div className="wrapper">
      <main className="main-section">
        <section>
          <div data-aos="fade-down" id="pic" className="section"></div>
        </section>
        <section id="combined" className="section">
          <h2 data-aos="fade-up"  id="briefly">Briefly</h2>
          <div className="text-wrapper">
            <h3 data-aos="fade-up" data-aos-duration="1000" id='info'>Miller&Carter isn’t just a steakhouse – it’s an experience. For the last four decades, we’ve been winning hearts through our unwavering dedication to steak.</h3>
          </div>
        </section>
      </main>
    </div>
  );
};

export default BrieflySection;
