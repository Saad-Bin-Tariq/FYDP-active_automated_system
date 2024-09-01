
import '../App.css'
import '../animate.css'
import '../font-awesome.min.css'
import '../namari-color.css'
import Footer from './footer'
import logo from '../images/aiwarelogopng.png'
import sensors from "../images/sensors.png"
import home2 from '../images/bg-env3.jpg'
import templogo from '../images/temp-logo.png'
import mllogo from '../images/ml-logo.png'
import hmlogo from '../images/map-logo.png'
import demlogo from '../images/dem-logo.png'
import igisout from '../images/out-igis-sen.jpg'
import sdg11 from '../images/sdg_11.png'
import sdg9 from '../images/sdg_9.png'
import sdg13 from '../images/sdg_13.jpg'
import tempcir from '../images/temp-cir.png'
import ptempcir from '../images/ptemp-cir.png'
import ascir from '../images/as-cir.png'
import aicir from '../images/ai-cir.png'
import tancir from '../images/tan-cir.png'
import demcir from '../images/dem-cir.png'
import galnshs from '../images/nshs_gal.jpg'
import galsp from '../images/sp_gal.jpg'
import galigis from '../images/igis_gal.jpg'
import galout from '../images/gal1.jpg'
import galin from '../images/gal_in.jpg'
function Home() {

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



<div id="wrapper">

    <header id="banner" className="scrollto clearfix" data-enllax-ratio=".5">
        

        {/* <!--Banner Content--> */}
        <div id="banner-content" className="row clearfix">

            <div className="col-38">

                <div className="section-heading">
                    <h1>ACTIVE AUTOMATED SENSING </h1>
                    <h2>FOR URBAN TURBULENT AND RADIANT HEAT</h2>
                </div>

                {/* <!--Call to Action--> */}
                {/* <a href="#" className="button">Contact Us</a> */}
                {/* <!--End Call to Action--> */}

            </div>

        </div>
        {/* <!--End of Row--> */}
    </header>

    {/* <!--Main Content Area--> */}
    <main id="content">

        {/* <!--Introduction--> */}
        <section id="about" className="introduction scrollto">

            <div className="row clearfix">

                <div className="col-3">
                    <div className="section-heading">
                        <h3>ABOUT US</h3>
                        <h2 className="section-title">How We Help You To Save The Envornment</h2>
                        <p >AI Aware aims to model relationships among vegetation, built environment, and anthropogenic activity to map sustainable urban environment. This tool will use machine learning and AI to provides real-time data analytics from a network of IoT devices, for policy makers and researchers, enabling them to understand how urban turbulent and radiant heat fluxes travel in a built environment. </p>
                        <div className="sdg-container">
                        <img className='sgd' src={sdg9} alt="temperature logo" />
                        <img className='sgd' src={sdg11} alt="temperature logo" />
                        <img className='sgd' src={sdg13} alt="temperature logo" />
                        </div>
                    </div>

                </div>

                <div className="col-2-3" style={{ marginTop: '80px' }}>

                    {/* <!--Icon Block--> */}
                    <div className="col-2 icon-block icon-top wow fadeInUp" data-wow-delay="0.1s">
                        {/* <!--Icon--> */}
                        <div className="icon">
                            
                            <img src={templogo} alt="temperature logo" />
                        </div>
                        {/* <!--Icon Block Description--> */}
                        <div className="icon-block-description">
                            <h4>IoT based Data Collection</h4>
                            <p>Collected 24 Thousand Data Points using 12 sensor units, 2 Thousand Images</p>
                        </div>
                    </div>
                    {/* <!--End of Icon Block--> */}

                    {/* <!--Icon Block--> */}
                    <div className="col-2 icon-block icon-top wow fadeInUp" data-wow-delay="0.3s">
                        {/* <!--Icon--> */}
                        <div className="icon">
                        <img src={mllogo} alt="machine learning logo" />
                        </div>
                        {/* <!--Icon Block Description--> */}
                        <div className="icon-block-description">
                            <h4>ML & AI Prediction Models</h4>
                            <p>Agent Based Learning coupled with Spatial Analysis using 5000 digitized tree species</p>
                        </div>
                    </div>
                    {/* <!--End of Icon Block--> */}

                    {/* <!--Icon Block--> */}
                    <div className="col-2 icon-block icon-top wow fadeInUp" data-wow-delay="0.5s">
                        {/* <!--Icon--> */}
                        <div className="icon">
                        <img src={hmlogo} alt="temperature logo" />
                        </div>
                        {/* <!--Icon Block Description--> */}
                        <div className="icon-block-description">
                            <h4>Heat Maps</h4>
                            <p>Geo-Thermal Insights through Urban Heat Maps</p>
                        </div>
                    </div>
                    {/* <!--End of Icon Block--> */}

                    {/* <!--Icon Block--> */}
                    <div className="col-2 icon-block icon-top wow fadeInUp" data-wow-delay="0.5s">
                        {/* <!--Icon--> */}
                        <div className="icon">
                        <img src={demlogo} alt="temperature logo" />
                        </div>
                        {/* <!--Icon Block Description--> */}
                        <div className="icon-block-description">
                            <h4>Digital Twin for 3D Visuallization</h4>
                            <p>Interaction with Virtual Environment</p>
                        </div>
                    </div>
                    {/* <!--End of Icon Block--> */}

                </div>

            </div>


        </section>
        {/* <!--End of Introduction--> */}


        {/* <!--DEM --> */}
        <aside id="testimonials" className="scrollto text-center" data-enllax-ratio=".2" style={{ marginTop: '-80px' }}>

            <div className="row clearfix">

                <div className="section-heading">
                    <h3>Digital Elevation Model of NUST</h3>
                    <h2 className="section-title">Digital Twin</h2>
                </div>

                <model-viewer src="/nust.glb" auto-rotate camera-controls alt="cube" background-color="#37474F"
    orbit-radius="5" camera-orbit="0deg 60deg" field-of-view="45deg"></model-viewer>

                

                

            </div>

        </aside>

        {/* <!--Gallery--> */}
        <aside id="gallery" className="row text-center scrollto clearfix" data-featherlight-gallery
                 data-featherlight-filter="a" style={{ marginTop: '-60px' }}>

                <a href={igisout} data-featherlight="image" className="col-3 wow fadeIn"
                   data-wow-delay="0.1s"><img src={igisout} alt="Landing Page"/></a>
                <a href={galin} data-featherlight="image" className="col-3 wow fadeIn"
                   data-wow-delay="0.3s"><img src={galin} alt="Landing Page"/></a>
                <a href={galigis} data-featherlight="image" className="col-3 wow fadeIn"
                   data-wow-delay="0.5s"><img src={galigis} alt="Landing Page"/></a>
                <a href={galsp} data-featherlight="image" className="col-3 wow fadeIn"
                   data-wow-delay="1.1s"><img src={galsp} alt="Landing Page"/></a>
                <a href={galnshs} data-featherlight="image" className="col-3 wow fadeIn"
                   data-wow-delay="0.9s"><img src={galnshs} alt="Landing Page"/></a>
                <a href={galout} data-featherlight="image" className="col-3 wow fadeIn"
                   data-wow-delay="0.7s"><img src={galout} alt="Landing Page"/></a>

        </aside>
        {/* <!--End of Gallery--> */}


        {/* <!--Content Section--> */}
        <div id="services" className="scrollto clearfix" style={{ marginTop: '-30px' }}>

            <div className="row no-padding-bottom clearfix">


                {/* <!--Content Left Side--> */}
                <div className="col-3">
                    {/* <!--User Testimonial--> */}
                    <blockquote className="testimonial text-right bigtest">
                        <q>We do not inherit the earth from our ancestors; we borrow it from our children</q>
                        <footer>— Sustainable Urban Planner</footer>
                    </blockquote>
                    <img src={sensors} alt="" style={{ marginTop: '30px' }} />
                    {/* <!-- End of Testimonial--> */}

                </div>
                {/* <!--End Content Left Side--> */}

                {/* <!--Content of the Right Side--> */}
                <div className="col-3" >
                    <div className="section-heading">
                        <h3>Our Goal</h3>
                        <h2 className="section-title">Minimizing the effect of Turbulent and Radiant Heat in Built Environments</h2>
                        <p className="section-subtitle"> Empowering Sustainable Cities | Real-time Insights, Proactive Solutions | A Future Beyond Urban Heat Challenges</p>
                    </div>
                    <p>At AI Aware, we envision a cityscape where sustainability and comfort coexist seamlessly. Our mission is to revolutionize urban planning through advanced technology, modeling intricate relationships among vegetation, structures, and human activity. Harnessing the power of machine learning and AI, we provide real-time analytics, empowering decision-makers to understand and mitigate the impact of turbulent and radiant heat in built environments.

                     </p>
                    <p>
                        

                    Beyond data analytics, our vision extends to making a tangible impact on society. In cities like Karachi, where heatwaves pose health crises, AI Aware emerges as a crucial tool. Imagine a future where emergencies related to heatwaves are minimized through proactive planning, all facilitated by insights from our innovative model.
                    </p>
                    {/* <!-- Just replace the Video ID "UYJ5IjBRlW8" with the ID of your video on YouTube (Found within the URL) --> */}
                    {/* <a href="#" data-videoid="UYJ5IjBRlW8" data-videosite="youtube" className="button video link-lightbox">
                        WATCH VIDEO <i className="fa fa-play" aria-hidden="true"></i>
                    </a> */}
                </div>
                {/* <!--End Content Right Side--> */}

                <div className="col-3">
                    <img src={home2} alt="igis"/>
                </div>

            </div>


        </div>
        {/* <!--End of Content Section--> */}

        {/* <!--Testimonials--> */}
        <aside id="testimonials" className=" scrollto text-center" data-enllax-ratio=".2" style={{ marginTop: '-20px' }}>

            <div className="row clearfix">

                <div className="section-heading">
                    <h3>Our Features</h3>
                    <h2 className="section-title">Project Components</h2>
                </div>

                {/* <!--User Testimonial--> */}
                <blockquote className="col-3 testimonial classic">
                    <img src={tempcir} alt="User"/>
                    <footer><b>Portable Geotagged IoT Thermal Sensor</b></footer>
                    <p>Stationary devices capturing real-time thermal data for precise urban heat mapping.</p>
                    
                </blockquote>
                {/* <!-- End of Testimonial--> */}
                {/* <!--User Testimonial--> */}
                <blockquote className="col-3 testimonial classic">
                    <img src={ptempcir} alt="User"/>
                    <footer><b>Portable Geotagged IoT Thermal Sensor</b></footer>
                    <p>On-the-go device capturing and geo-tagging thermal data for model training.</p>
                    
                </blockquote>
                {/* <!-- End of Testimonial--> */}
                {/* <!--User Testimonial--> */}
                <blockquote className="col-3 testimonial classic">
                    <img src={ascir} alt="User"/>
                    <footer><b>Real-time Active Sensing System</b></footer>
                    <p>Dynamic system collecting, storing, and forwarding data for immediate insights.</p>
                    
                </blockquote>
                {/* <!-- End of Testimonial--> */}
                {/* <!--User Testimonial--> */}
                <blockquote className="col-3 testimonial classic">
                    <img src={aicir} alt="User"/>
                    <footer><b>Urban Temperature Prediction Models</b></footer>
                    <p>Algorithms forecasting temperature trends to enhance urban planning and mitigate the impact of heat on built environments.</p>
                </blockquote>
                {/* <!-- End of Testimonial--> */}
                {/* <!--User Testimonial--> */}
                <blockquote className="col-3 testimonial classic">
                    <img src={tancir} alt="User"/>
                    <footer><b>Tangible Landscape</b></footer>
                    <p>Physical representations and interactive visualizations of geographic data, fostering a deeper understanding of diverse landscapes.</p>
                </blockquote>
                {/* <!-- End of Testimonial--> */}
                {/* <!--User Testimonial--> */}
                <blockquote className="col-3 testimonial classic">
                    <img src={demcir} alt="User"/>
                    <footer><b>Digital Twin for visualization</b></footer>
                    <p>Creating virtual replicas of physical environments, enabling immersive and enhanced decision-making and analysis.</p>
                </blockquote>
                {/* <!-- End of Testimonial--> */}
                

                

            </div>

        </aside>
        {/* <!--End of Testimonials--> */}

       

        

    </main>
    {/* <!--End Main Content Area--> */}



</div>

<Footer></Footer>
    </>
  )
}

export default Home
