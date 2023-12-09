import React from "react";
import "./ShowParking.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";


const ShowParking = (props) => {
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
 

  return (
    <div className="show-parking">
      <div className="content">
        <div className="content-header">
          <span className="title">Bãi xe nổi bật</span>
          <button className="btn-title">Xem thêm</button>
        </div>
        <div className="content-body">
          <Slider {...settings}>
            <div className="img-custom">
            <Link to="/other-page">
                <div className="bg-image"></div>
                <div>Abc</div>
              </Link>
            </div>
            <div className="img-custom">
              <div className="bg-image"></div>
              <div>Abc</div>
            </div>
            <div className="img-custom">
              <div className="bg-image"></div>
              <div>Abc</div>
            </div>
            <div className="img-custom">
              <div className="bg-image"></div>
              <div>Abc</div>
            </div>
            <div className="img-custom">
              <div className="bg-image"></div>
              <div>Abc</div>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
};
export default ShowParking;
