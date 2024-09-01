
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'
import '../animate.css'
import '../font-awesome.min.css'
import '../namari-color.css'
import Footer from './footer'
import treeden from '../images/FYP_latest.jpg'
import humidity from '../images/humidity.jpg'
import waterdis from '../images/water_body.jpg'
import buildden from '../images/building_den.jpg'
import builddis from '../images/dis_from_build.jpg'
import outtemp from '../images/Temperature.jpg'
import api from '../images/Pic_api.png' 
import urban from '../images/2.png'
import './model.css'

const images = [
    outtemp,humidity,builddis,buildden,treeden,waterdis

  ];

  const treeData = {
    "1": "red bottle brush",
    "2": "spiny fiddlewood",
    "3": "chinar",
    "4": "rubber tree",
    "5": "cassia glauca",
    "6": "pine",
    "7": "amstel king",
    "8": "kangi palm",
    "9": "phoenix palm",
    "10": "sukhchain tree",
    "11": "bakain",
    "12": "ritha",
    "13": "pilkhan",
    "14": "bishop tree",
    "15": "olive",
    "16": "blue jacaranda",
    "17": "stericulia",
    "18": "white mulberry",
    "19": "bismarckia palm",
    "20": "river tea tree",
    "21": "putajin",
    "22": "brazilian pepper tree",
    "23": "sufaida",
    "24": "ditta",
    "25": "punna",
    "26": "chinese tallow tree",
    "27": "simbal",
    "28": "amaltas",
    "29": "weeping willow",
    "30": "guava",
    "31": "lemon",
    "32": "sirin",
    "33": "european nettle tree",
    "34": "silver oak",
    "35": "queen palm",
    "36": "yellow oleander",
    "37": "borh",
    "38": "shisham",
    "39": "chiko",
    "40": "washingtonia palm",
    "41": "silk floss tree",
    "42": "weeping fig",
    "43": "madagascar almond",
    "44": "ipl ipl",
    "45": "arjun tree"
  };

function Model() {
    const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

//   for API
const [formData, setFormData] = useState({
    tree_cat: '',
    ot_avgtemp: '',
    tree_den: '',
    build_den: '',
    dis_to_bui: '',
    dis_to_wat: ''
  });
  const [prediction, setPrediction] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFocus = (e) => {
    if (e.target.value === '') {
      e.target.value = e.target.placeholder;
    }
  };

  const handleBlur = (e) => {
    if (e.target.value === e.target.placeholder) {
      e.target.value = '';
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get('http://127.0.0.1:5000/predict', {
        params: formData
      });
      setPrediction(res.data.prediction);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      
{/* <!-- Preloader --> */}
{/* <div id="preloader">
    <div id="status" className="la-ball-triangle-path">
        <div></div>
        <div></div>
        <div></div>
    </div>
</div> */}
{/* <!--End of Preloader--> */}



<div id="wrapper" style={{ marginTop: "60px" }}>

    

    {/* <!--Main Content Area--> */}
    <main id="content">

       

        

        {/* <!--Content Section--> */}
        <div id="services" className="scrollto clearfix" style={{ marginTop: '-30px' }}>

            <div className="row no-padding-bottom clearfix">


                {/* <!--Content Left Side--> */}
                <div className="col-3">
                    {/* <!--User Testimonial--> */}
                    {/* <blockquote className="testimonial text-right bigtest">
                        <q>Set the parameter of the Machine Learning model to predict indoor temperature of potential urban site</q>
                        
                    </blockquote> */}

                    <div className="container">
                    {prediction && (
                        
                        <p style={{ marginBottom: '-10px' , textAlign: 'right'}}>Predicted Indoor Temperature</p>
                      )}
                    {prediction && (
                        
          <h1  style={{ borderRadius: '10px', padding: '10px' , textAlign: 'right' }}>
             {prediction}°C
          </h1>
        )}
      <div className="card">
        
        <form className="card-form" onSubmit={handleSubmit}>
           <div className="input">
        <label className="input-label" style={{ marginTop:'-18px' }}>Tree species</label>
        <select
          name="tree_cat"
          value={formData.tree_cat}
          onChange={handleChange}
          required
        >
          <option value="">Select a Tree Species</option>
          {Object.entries(treeData).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>
          <div className="input">
            <input
              type="number"
              name="ot_avgtemp"
              className="input-field"
              value={formData.ot_avgtemp}
              onChange={handleChange}
              required
            />
            <label className="input-label">Outdoor Temperature (°C)</label>
          </div>
          <div className="input">
            <input
              type="number"
              name="tree_den"
              className="input-field"
              value={formData.tree_den}
              onChange={handleChange}
              required
            />
            <label className="input-label">Tree Density (per sq.km) values[0-18,000]</label>
          </div>
          <div className="input">
            <input
              type="number"
              name="build_den"
              className="input-field"
              value={formData.build_den}
              onChange={handleChange}
              required
            />
            <label className="input-label">Building Density (per sq.km) values[0-280]</label>
          </div>
          <div className="input">
            <input
              type="number"
              name="dis_to_bui"
              className="input-field"
              value={formData.dis_to_bui}
              onChange={handleChange}
              required
            />
            <label className="input-label">Distance to Buildings (m)</label>
          </div>
          <div className="input">
            <input
              type="number"
              name="dis_to_wat"
              className="input-field"
              value={formData.dis_to_wat}
              onChange={handleChange}
              placeholder="Distance to Water"
              onFocus={handleFocus}
              onBlur={handleBlur}
              required
              
            />
            <label className="input-label">Distance to Water (m)</label>
          </div>
          <div className="action">
            <button type="submit" className="action-button">
              Predict
            </button>
          </div>
        </form>
        
      </div>
    </div>

                  

                </div>
                {/* <!--End Content Left Side--> */}

                {/* <!--Content of the Right Side--> */}
                <div className="col-4" >
                    <div className="section-heading">
                        
                        <h2 className="section-title">DataSets</h2>
                        <p className="section-subtitle"> These datasets play a pivotal role in determining the indoor temperature of the Urban structures</p>
                    </div>
                    <div className="section-heading"><h3>ML Prediction Model</h3></div>
                    
                    <p>
                    Ai Aware's prediction tool employs XGBoost, a scalable and powerful gradient boosting framework, to predict indoor temperature within buildings. XGBoost utilizes a tree-based ensemble learning approach, iteratively building decision trees to progressively improve prediction accuracy.</p>
                    {/* <!-- Just replace the Video ID "UYJ5IjBRlW8" with the ID of your video on YouTube (Found within the URL) --> */}
                    {/* <a href="#" data-videoid="UYJ5IjBRlW8" data-videosite="youtube" className="button video link-lightbox">
                        WATCH VIDEO <i className="fa fa-play" aria-hidden="true"></i>
                    </a> */}
                    
                </div>
                {/* <!--End Content Right Side--> */}

                <div className="col-3">
                <div className="slideshow">
                {images.map((image, index) => (
                    <div
                    key={index}
                    className={`slide ${index === currentIndex ? 'active' : ''}`}
                    >
                    <img src={image} alt={`Slide ${index + 1}`} />
                    </div>
                ))}
                </div>
                    </div>

            </div>


        </div>
        {/* <!--End of Content Section--> */}

        

        

    </main>

</div>

<Footer></Footer>
    </>
  )
}

export default Model
