
import "./footer.css"
import logo from '../images/onlylogobg.png'


function Footer() {


  return (
    <footer className="footer">
            <div className="footer-section footer-left">
                <img src={logo} alt="" />
                <p>&copy; 2024 Ai Aware</p>
            </div>

            <div className="footer-section footer-center">
                <div>
                    <i className="fa fa-map-marker"></i>
                    <p>IGIS, H-12 NUST, Islamabad, Pakistan</p>
                </div>
                <div>
                    <i className="fa fa-phone"></i>
                    <p>+92 (335) 8361606</p>
                </div>
                <div>
                    <i className="fa fa-envelope"></i>
                    <p><a href="mailto:info@mycompany.com">info@aiaware.com</a></p>
                </div>
            </div>

            <div className="footer-section footer-right">
                <p>Follow us on:</p>
                <div className="footer-icons">
                    <a href="#"><i className="fa fa-facebook"></i></a>
                    <a href="#"><i className="fa fa-twitter"></i></a>
                    <a href="#"><i className="fa fa-instagram"></i></a>
                    <a href="#"><i className="fa fa-linkedin"></i></a>
                </div>
            </div>
        </footer>
  )
}

export default Footer;



