
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Row,Col ,Container} from "react-bootstrap";
import { FaFacebook,FaInstagram } from "react-icons/fa";
import CusHeader from "./CusHeader";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Styles/Slideshow.css"
import CusFooter from "./CusFooter";



const slides = [
  {
    image: "Ac.png", // Replace with actual image path
    
    description: "Top And Higher Quality Home Appliances",
  },
  {
    image: "Machine.png",
    
    description: "Top And Higher Quality Home Appliances",
  },
  {
    image: "Tv.png",
    
    description: "Top And Higher Quality Home Appliances",
  },
];
const categories = [
    { name: "Washing Machine", img: "washingmachine.png" , link:"/washing"},
    { name: "Air Conditioners", img: "air.png",link:"/aircon" },
    { name: "Refrigrators", img: "ref.png",link:"/fridge" },
    { name: "Telivisions", img: "tel.png",link:"/telivision" },
    // { name: "Irons", img: "iron.png" },
    // { name: "Water Heaters", img: "waterheater.png" },
    // { name: "Mixers", img: "/mixer.png" },
    // { name: "Vaccum Cleaners", img: "Vc.png" },
    // { name: "Deodorisers", img: "/images/deodoriser.png" },
  ];
const CusHome = () => {
  const navigate = useNavigate(); // React Router hook for navigation

  const handleRedirect = (link) => {
    navigate(link); // Navigate to the linked page
  };
  const [hoveredCategory, setHoveredCategory] = useState('');
  return (
    <>
    <CusHeader/>
    <br />
    <div className="slideshow-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
        className="custom-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="custom-slide">
            <img src={slide.image} alt={slide.title} className="slide-image" />
            <div className="slide-text">
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <br />  
    </div>
    <br/>
    <div className="container mt-4">
      <h1 className="fw-bold">Featured Categories : </h1><br/><br />
      <div className="row row-cols-2 row-cols-md-4 g-4">
        {categories.map((category, index) => (
          <div className="col text-center" key={index} onClick={() => handleRedirect(category.link)} // Handle navigation on click
          style={{ cursor: "pointer" }}>
            
            <div className="category-card">
              
              <img src={category.img} alt={category.name} className="category-img" />
            </div>
            <h5 className="mt-2 fw-bold">{category.name}</h5>
            {category.subcategories && (
              <ul className="subcategory-list">
                {category.subcategories.map((sub, idx) => (
                  <li key={idx}>{sub}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
    <br /><br /><br /><br />
  <br /><br /><br /><br />
   
    <Container>
  <Row className="text-center text-md-start">
    {/* About Us Section */}
     {/* About Us Section */}
     <Col md={4} className="mb-4 fadeIn">
        <h1 className="fw-bold" style={{fontSize:"50px"}}>About us : </h1>
        <br />
          <p>
            We provide the best home appliance sales and repair services.
            Our expert technicians and premium products ensure customer
            satisfaction at the best prices.
          </p>
        </Col>

    {/* Contact Us Section */}
    <Col md={4} className="mb-4 ms-auto slideInRight">
        <h1 className="fw-bold" style={{fontSize:"50px"}}>Contact us : </h1>
          <p>Email: support@homeappliances.com</p>
          <p>Phone: +91 8200221828</p>
          <p>Location: NAVGUJARAT COLLEGE OF COMPUTER APPLICATIONS</p>
          <br />
          <div className="d-flex gap-3 mt-2">
          <h4> <strong>Follow Us On :           </strong></h4>  
            
            <a href="https://facebook.com" className="text-light fs-4">
              <FaFacebook style={{ color: "blue", fontSize: "40px" }} />
            </a>
            <a href="https://instagram.com" className="text-light fs-4">
              <FaInstagram
                style={{
                  fontSize: "40px",
                  background: "linear-gradient(to right, #8a3abf, #e1306c, #f58529, #f7b731)",
                  borderRadius: "10px",
                  display: "inline-block",
                }}
              />
            </a>
          </div>
        </Col>

   
  </Row>


<br /><br /><br /><br /><br /><br />

   {/* Complaint & Feedback Section */}
   {/* <Col md={4} className="mb-80 slideInLeft support-section"> */}
   {/* <Col md={4} className="mb-4 support-section"> */}
  <h1 className="fw-bold text-center support-title">Support :</h1>
  <br />
  <button className="support-btn feedback-btn" onClick={() => navigate("/cusfeedback")}>
    Give Feedback 🌟💯😊
  </button>
  <button className="support-btn complaint-btn" onClick={() => navigate("/cuscomplain")}>
    Register Complaint
  </button>
 
{/* </Col> */}
{/* </Col> */}

</Container>
    <br /><br />
    <footer className="bg-black text-white text-center py-3">
     <h4> <p>&copy; 2025 Home Appliance Service. All rights reserved.</p></h4>
      <p>
        <a href="/privacy" className="text-white">Privacy Policy</a> |{" "}
        <a href="/terms" className="text-white">Terms of Service</a>
      </p>
    </footer>
   
    </>
  );
};

export default CusHome;
