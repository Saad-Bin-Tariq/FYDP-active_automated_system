
import '../App.css'
import '../animate.css'
import '../font-awesome.min.css'
import '../namari-color.css'
import Footer from './footer'
import sensors from "../images/sensors.png"
import home2 from '../images/bg-env3.jpg'
import api from '../images/Pic_api.png' 
import urban from '../images/2.png'
import './Api.css'
function Api() {
    const cardsData = [
        {
            image: 'https://img.freepik.com/free-photo/luxury-plain-green-gradient-abstract-studio-background-empty-room-with-space-your-text-picture_1258-63953.jpg',
            thumb: 'https://t3.ftcdn.net/jpg/05/97/37/46/360_F_597374605_tph8vB4RrkKvN2MT1gKeJUKerCR8LYu8.jpg',
            title: 'GET 2 Hourly Data from specified Sensor Unit & Date',
            status: 'https://backend.aiaware.com.pk/api/v1/single-data/{sensor_id}?year=2024&month=2&day=5',
            url: 'https://backend.aiaware.com.pk/api/v1/single-data/3',
            description: 'This API endpoint retrieves single-day data for a specific sensor, with the option to specify the year, month, and day as query parameters. The JSON response includes an array of objects, each representing data for a particular time interval throughout the day. Each object contains information such as the time interval (in hours and minutes), temperature, and humidity values recorded at that specific time. The time intervals are provided in 24h format, ranging from 0000 to 2200, representing every two-hour interval throughout the day.'
        },
        {
            image: 'https://img.freepik.com/free-photo/luxury-plain-green-gradient-abstract-studio-background-empty-room-with-space-your-text-picture_1258-63953.jpg',
            thumb: 'https://t3.ftcdn.net/jpg/05/97/37/46/360_F_597374605_tph8vB4RrkKvN2MT1gKeJUKerCR8LYu8.jpg',
            title: 'GET Data from each Sensor Unit',
            status: 'https://backend.aiaware.com.pk/api/v1/all-data/{sensor_id}',
            url: 'https://backend.aiaware.com.pk/api/v1/all-data/3',
            description: 'The JSON response contains temperature and humidity data along with corresponding timestamps. Readings are recorded every hour, providing a comprehensive dataset for each interval.'
        },
        
        {
            image: 'https://img.freepik.com/free-photo/luxury-plain-green-gradient-abstract-studio-background-empty-room-with-space-your-text-picture_1258-63953.jpg',
            thumb: 'https://t3.ftcdn.net/jpg/05/97/37/46/360_F_597374605_tph8vB4RrkKvN2MT1gKeJUKerCR8LYu8.jpg',
            title: 'GET Current Reading from each Sensor Unit',
            status: 'https://backend.aiaware.com.pk/api/v1/latest-data/{sensor_id}?year=2024&month=2&day=5',
            url: 'https://backend.aiaware.com.pk/api/v1/latest-data/3',
            description: 'The JSON response contains temperature and humidity data along with corresponding timestamps. Readings are best for real-time applications as latest values are returned.'
        },
        {
            image: 'https://img.freepik.com/free-photo/luxury-plain-green-gradient-abstract-studio-background-empty-room-with-space-your-text-picture_1258-63953.jpg',
            thumb: 'https://t3.ftcdn.net/jpg/05/97/37/46/360_F_597374605_tph8vB4RrkKvN2MT1gKeJUKerCR8LYu8.jpg',
            title: 'GET Accumulated Averaged Data from every Sensor Unit',
            status: 'https://backend.aiaware.com.pk/api/v1/interval-data/{sensor_id}?interval=daily',
            url: 'https://backend.aiaware.com.pk/api/v1/interval-data/3?interval=daily',
            description: 'Query Params: interval=daily or interval=weekly or interval=monthly. This API endpoint retrieves interval data for a specific sensor, with the option to specify the interval as daily, weekly, or monthly using the “interval” query parameter. The JSON response includes an array of objects, each representing data for a particular date. Each object contains information such as the date, year, month, and five time slots (time1 to time5). These time slots correspond to different time intervals throughout the day. For instance, time1 represents the average readings from 12 am to 6 am, time2 represents the average from 6 am to 12 pm, time3 represents the averages from 12 pm to 6 pm, and time4 represents the averages from 6 pm to 12 am. The time5 slot provides the average readings for the entire day. The data includes temperature and humidity values for each time slot, providing insights into the sensor\'s measurements over the specified interval.'
        },
        {
            image: 'https://img.freepik.com/free-photo/luxury-plain-green-gradient-abstract-studio-background-empty-room-with-space-your-text-picture_1258-63953.jpg',
            thumb: 'https://t3.ftcdn.net/jpg/05/97/37/46/360_F_597374605_tph8vB4RrkKvN2MT1gKeJUKerCR8LYu8.jpg',
            title: 'GET Information about all Active Sensor Units',
            status: 'https://backend.aiaware.com.pk/api/v1/sensor-data',
            url: 'https://backend.aiaware.com.pk/api/v1/sensor-data',
            description: 'The JSON response contains data for various sensors deployed both indoors and outdoors. Each sensor is identified by a unique sensor ID and is associated with a specific department or location. For every sensor, the data includes the department name, latitude, and longitude coordinates, along with the sensor type, denoting its placement which is either indoor or outdoor. '
        },
        {
            image: 'https://img.freepik.com/free-photo/luxury-plain-green-gradient-abstract-studio-background-empty-room-with-space-your-text-picture_1258-63953.jpg',
            thumb: 'https://t3.ftcdn.net/jpg/05/97/37/46/360_F_597374605_tph8vB4RrkKvN2MT1gKeJUKerCR8LYu8.jpg',
            title: 'GET Information about the Specified Sensor Unit',
            status: 'https://backend.aiaware.com.pk/api/v1/single-sensor-data/{sensor_id}',
            url: 'https://backend.aiaware.com.pk/api/v1/single-sensor-data/3',
            description: 'The JSON response provides information about a single sensor deployed and includes details such as the sensor’s unique identifier, the department it belongs to, its geographic coordinates, and its designated type. '
        },
        {
            image: 'https://img.freepik.com/free-photo/luxury-plain-green-gradient-abstract-studio-background-empty-room-with-space-your-text-picture_1258-63953.jpg',
            thumb: 'https://t3.ftcdn.net/jpg/05/97/37/46/360_F_597374605_tph8vB4RrkKvN2MT1gKeJUKerCR8LYu8.jpg',
            title: 'GET Maximum & Minimum Readings from a specified Sensor Unit',
            status: 'https://backend.aiaware.com.pk/api/v1/maxmin-data/{sensor_id}',
            url: 'https://backend.aiaware.com.pk/api/v1/all-data/3',
            description: 'The JSON response provides a summary of temperature and humidity data over a specified period. It includes maximum and minimum temperature and humidity values, each associated with a timestamp indicating when they were recorded. These values offer insights into the temperature and humidity fluctuations within the monitored environment, aiding in the analysis of extreme conditions and trends over time.'
        }
        
    ];
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
                    <blockquote className="testimonial text-right bigtest">
                        <q>Welcome to Ai Aware, where we decode the complex interplay of temperature and humidity in urban environments. Our mission is to provide urban planners, researchers, and policymakers with invaluable insights into urban climate dynamics.</q>
                        <footer>— Ai Aware Founders</footer>
                    </blockquote>
                    <img src={urban} alt="" style={{ marginTop: '30px' }} />
                    {/* <!-- End of Testimonial--> */}

                </div>
                {/* <!--End Content Left Side--> */}

                {/* <!--Content of the Right Side--> */}
                <div className="col-3" >
                    <div className="section-heading">
                        <h3>Thermal Trends Unveiled</h3>
                        <h2 className="section-title">Access Our Open APIs for Research and Spatial Analysis</h2>
                        <p className="section-subtitle"> Explore Urban Heat Islands with Precision Data</p>
                    </div>
                    
                    <p>
                    Discover the wealth of possibilities with our open APIs, designed to empower your research and spatial analysis endeavors. Seamlessly integrated into your workflow, our APIs provide HTTP GET requests, delivering JSON responses. Dive into a world of data-driven insights and unlock new dimensions of understanding.</p>
                    {/* <!-- Just replace the Video ID "UYJ5IjBRlW8" with the ID of your video on YouTube (Found within the URL) --> */}
                    {/* <a href="#" data-videoid="UYJ5IjBRlW8" data-videosite="youtube" className="button video link-lightbox">
                        WATCH VIDEO <i className="fa fa-play" aria-hidden="true"></i>
                    </a> */}
                </div>
                {/* <!--End Content Right Side--> */}

                <div className="col-3">
                    <img src={api} alt="Api Picture"/>
                    <p style={{ marginBottom: "-13px" }}>Outdoor Units</p>
                    <p className="section-subtitle">Sensor units deployed throughout NUST. ID(21-27)</p>
                    <p style={{ marginBottom: "-13px" }}>Indoor Units</p>
                    <p className="section-subtitle">Sensor units deployed throughout NUST. ID(1-6)</p>
                </div>

            </div>


        </div>
        {/* <!--End of Content Section--> */}

        

        

    </main>
    {/* <!--End Main Content Area--> */}
    <ul className="acards">
            {cardsData.map((card, index) => (
                <li key={index}>
                    <a href="#" className="card">
                        <img src={card.image} className="card__image" alt="" />
                        <div className="card__overlay">
                            <div className="card__header">
                                <svg className="card__arc" xmlns="http://www.w3.org/2000/svg">
                                    <path />
                                </svg>
                                <img className="card__thumb" src={card.thumb} alt="" />
                                <div className="card__header-text">
                                    <h3 className="card__title">{card.title}</h3>
                                    <span className="card__status">{card.status}</span>< a className='try' href={card.url} target="_blank" rel="noopener noreferrer" >Try Now</a>
                                </div>
                            </div>
                            <p className="card__description">{card.description}</p>
                        </div>
                    </a>
                </li>
            ))}
        </ul>


</div>

<Footer></Footer>
    </>
  )
}

export default Api
