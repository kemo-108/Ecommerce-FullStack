import "./Service.css";
import { Link } from "react-router-dom";
import {
  FaGem,
  FaTruck,
  FaGift,
  FaCreditCard,
  FaUndoAlt,
  FaHeadset,
  FaUsers,
  FaShoppingBag,
  FaShippingFast,
  FaStar,
  FaArrowRight,
} from "react-icons/fa";

const services = [
  {
    icon: <FaGem />,
    title: "Premium Quality",
    desc: "We ensure the best quality products that last and bring joy every day.",
    color: "#E8D9FF",
  },
  {
    icon: <FaTruck />,
    title: "Fast Shipping",
    desc: "We deliver your orders quickly and safely to your doorstep anywhere.",
    color: "#FFF0C9",
  },
  {
    icon: <FaGift />,
    title: "Gift Wrapping",
    desc: "Make your gifts even more special with our beautiful gift wrapping service.",
    color: "#DDF7EA",
  },
  {
    icon: <FaCreditCard />,
    title: "Secure Payment",
    desc: "Shop with confidence using our secure and trusted payment methods.",
    color: "#FFDDE7",
  },
  {
    icon: <FaUndoAlt />,
    title: "Easy Returns",
    desc: "Not satisfied with your order? We offer easy returns and exchanges.",
    color: "#DDEFFF",
  },
  {
    icon: <FaHeadset />,
    title: "Customer Support",
    desc: "Our friendly support team is available 24/7 to help you anytime.",
    color: "#FFE9D9",
  },
];

const stats = [
  {
    icon: <FaUsers />,
    number: "5000+",
    title: "Happy Customers",
  },
  {
    icon: <FaShoppingBag />,
    number: "1000+",
    title: "Unique Products",
  },
  {
    icon: <FaShippingFast />,
    number: "12h",
    title: "Fast Shipping",
  },
  {
    icon: <FaStar />,
    number: "4.9 / 5",
    title: "Customer Rating",
  },
];

const Services = () => {
  return (
    <div className="services-page">
      {/* Hero */}

      <section className="services-hero container">
        <span className="small-title">Our Services</span>

        <h1>
          Our <span>Services</span>
        </h1>

        <p>
          We are here to make your shopping experience simple, smooth and
          special.
        </p>
      </section>

      {/* Cards */}

      <section className="services-grid container">
        {services.map((item, index) => (
          <div className="service-card" key={index}>
            <div className="service-icon" style={{ background: item.color }}>
              {item.icon}
            </div>

            <div className="service-info">
              <h3>{item.title}</h3>

              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Why Choose Us */}

      <section className="why-us container">
        <h2>
          Why Choose <span>Art Corner?</span>
        </h2>

        <div className="stats">
          {stats.map((item, index) => (
            <div className="stat-box" key={index}>
              <div className="stat-icon">{item.icon}</div>

              <h3>{item.number}</h3>

              <p>{item.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}

      <section className="cta-section container">
        <div className="cta-content">
          <h2>
            Ready to Find Your <span>Favorite Artwork?</span>
          </h2>

          <p>Explore our collection and find something you'll love.</p>

          <Link to="/shop" className="cta-btn">
            Shop Now
            <FaArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
