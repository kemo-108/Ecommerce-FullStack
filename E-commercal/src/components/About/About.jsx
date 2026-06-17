import React from "react";
import "./About.css";
import videoSrc from "../../image/video.mp4";
const About = () => {
  return (
    <div className="about">
      <div className="container">
        <div className="about-content">
          <h2>A company for selling all stationery online</h2>
          <p>
            Your All-In-One Educational Partner For over 15 years, Art Corner
            has been a trusted leader in supplying nurseries, schools, and
            offices. Since our start in 2010, we have specialized in
            transforming educational spaces with high-quality products, from
            essential stationery to complete school outfitting. Why Choose Us?
            Decades of Expertise: A solid reputation built on reliability and
            professional service since 2010. Comprehensive Solutions: Everything
            from the smallest pen to full nursery and classroom setups.
            Unmatched Quality: We provide durable, high-standard products
            designed specifically for the educational sector. We don’t just
            supply equipment; we provide the foundation for a better learning
            environment. Trust the experts who have been doing it right for 15
            years.
          </p>
        </div>
        <video autoPlay muted loop>
          <source src={videoSrc} type="video/mp4"></source>
        </video>
      </div>
    </div>
  );
};

export default About;
