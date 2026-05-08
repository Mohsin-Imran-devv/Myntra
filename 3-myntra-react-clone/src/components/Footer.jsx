import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer style={{marginLeft:"5%"}}>
      <div className="footer_container">
        <div className="footer_column">
          <h3>ONLINE SHOPPING</h3>
          <Link to="/men">Men</Link>
          <Link to="/women">Women</Link>
          <Link to="/kids">Kids</Link>
          <Link to="/home-living">Home & Living</Link>
          <Link to="/beauty">Beauty</Link>
          <Link to="/studio">Studio</Link>
          <Link to="#">Gift Card</Link>
        </div>

        <div className="footer_column">
          <h3>CUSTOMER POLICIES</h3>
          <Link to="#">Contact Us</Link>
          <Link to="#">FAQ</Link>
          <Link to="#">Terms Of Use</Link>
          <Link to="#">Track Orders</Link>
          <Link to="#">Shipping</Link>
          <Link to="#">Cancellation</Link>
          <Link to="#">Returns & Exchanges</Link>
          <Link to="#">Privacy Policy</Link>
        </div>

        <div className="footer_column">
          <h3>EXPERIENCE MYNTRA</h3>
          <a href="https://play.google.com/store/apps/details?id=com.myntra.android" target="_blank" rel="noopener noreferrer">Mobile App</a>
          <Link to="#">Myntra Insider</Link>
          <Link to="#">Gift Cards</Link>
          <Link to="#">Blog</Link>
          <Link to="#">Corporate Information</Link>
          <Link to="#">Careers</Link>
          <Link to="#">Sitemap</Link>
        </div>

        <div className="footer_column">
          <h3>SOCIAL MEDIA</h3>
          <div className="social-links">
            <a href="https://facebook.com/myntra" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-facebook"></i> Facebook
            </a>
            <a href="https://twitter.com/myntra" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-twitter"></i> Twitter
            </a>
            <a href="https://youtube.com/myntra" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-youtube"></i> YouTube
            </a>
            <a href="https://instagram.com/myntra" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-instagram"></i> Instagram
            </a>
            <a href="https://pinterest.com/myntra" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-pinterest"></i> Pinterest
            </a>
          </div>
          
          <div className="payment-methods">
            <h4>We Accept</h4>
            <div className="payment-icons">
              <span className="payment-icon">💳</span>
              <span className="payment-icon">🏦</span>
              <span className="payment-icon">📱</span>
              <span className="payment-icon">💎</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="company-info">
        <p>
          <strong>Registered Office Address:</strong><br />
          Islamabad Bahria Town,<br />
          DHA Valley,<br />
          Bahria Phase VI – 560103, Pakistan
        </p>
      </div>
      
      <hr />
      
      <div className="copyright">
        <p>© 2023 www.myntra.com. All rights reserved.</p>
        <div className="country-selector">
          <span>Country: </span>
          <select className="country-select">
            <option value="pakistan">Pakistan</option>
            <option value="usa">USA</option>
            <option value="uae">UAE</option>
            <option value="uk">UK</option>
            <option value="canada">Canada</option>
          </select>
        </div>
      </div>
    </footer>
  );
};

export default Footer;