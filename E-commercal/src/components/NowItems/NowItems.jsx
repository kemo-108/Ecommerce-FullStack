import { useEffect, useState } from "react";
import "./NowItems.css";
import Product from "../Product/Product";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import getProducts from "../../services/ProductService";
import { Autoplay, Pagination } from "swiper/modules";
const NowItems = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <div className="now-items">
      <div className="container">
        <div className="title-section">
          <h1>New Arrivals</h1>
          <h4>New Arrivals</h4>
        </div>
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4000 }}
          speed={1200}
          pagination={{ clickable: true }}
          spaceBetween={20}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            992: {
              slidesPerView: 3,
            },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.productId}>
              <Product product={product} showExtraBtn={false} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default NowItems;
