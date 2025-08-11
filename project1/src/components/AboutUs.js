import React from 'react';
import './AboutUs.css';

function AboutUs() {
  return (
    <div className="about-us">
      <div className="hero-section">
        <h1>About CineFlow</h1>
        <p className="hero-subtitle">
          Your Ultimate Entertainment Hub for Movies & TV Shows
        </p>
      </div>

      <div className="content-sections">
        <section className="intro-section">
          <h2>Welcome to CineFlow</h2>
          <p>
            CineFlow is a state-of-the-art streaming platform that brings you the latest movies and TV shows 
            with cutting-edge technology and an intuitive user experience. Our platform combines powerful 
            content management capabilities with a sleek, responsive design to deliver entertainment at your fingertips.
          </p>
        </section>

        <section className="features-section">
          <h2>Platform Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>🎬 Vast Content Library</h3>
              <p>Extensive collection of movies and TV shows with detailed information, ratings, and pricing</p>
            </div>
            <div className="feature-card">
              <h3>🛒 Smart Shopping Cart</h3>
              <p>Add your favorite content to cart, manage quantities, and enjoy seamless checkout experience</p>
            </div>
            <div className="feature-card">
              <h3>👨‍💼 Admin Dashboard</h3>
              <p>Comprehensive content management system for administrators to add, edit, and remove content</p>
            </div>
            <div className="feature-card">
              <h3>🔐 Secure Authentication</h3>
              <p>Robust user authentication system with role-based access control</p>
            </div>
            <div className="feature-card">
              <h3>📱 Responsive Design</h3>
              <p>Optimized for all devices - desktop, tablet, and mobile for seamless viewing experience</p>
            </div>
            <div className="feature-card">
              <h3>⚡ Real-time Updates</h3>
              <p>Dynamic content updates with instant synchronization across the platform</p>
            </div>
          </div>
        </section>

        <section className="technical-section">
          <h2>Technical Excellence</h2>
          <div className="tech-grid">
            <div className="tech-item">
              <h4>Frontend Technology</h4>
              <p>Built with React.js for dynamic, component-based architecture with modern UI/UX design</p>
            </div>
            <div className="tech-item">
              <h4>Backend Infrastructure</h4>
              <p>Powered by Node.js and Express.js with RESTful API design for optimal performance</p>
            </div>
            <div className="tech-item">
              <h4>CRUD Operations</h4>
              <p>Full Create, Read, Update, Delete functionality for comprehensive content management</p>
            </div>
            <div className="tech-item">
              <h4>Data Management</h4>
              <p>Efficient data handling with real-time synchronization and error handling</p>
            </div>
          </div>
        </section>

        <section className="stats-section">
          <h2>Platform Statistics</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <h3>1000+</h3>
              <p>Movies & TV Shows</p>
            </div>
            <div className="stat-item">
              <h3>24/7</h3>
              <p>Platform Availability</p>
            </div>
            <div className="stat-item">
              <h3>100%</h3>
              <p>Responsive Design</p>
            </div>
            <div className="stat-item">
              <h3>⚡</h3>
              <p>Lightning Fast</p>
            </div>
          </div>
        </section>

        <section className="user-admin-section">
          <div className="role-grid">
            <div className="role-card user-card">
              <h3>👤 User Experience</h3>
              <ul>
                <li>Browse extensive content library</li>
                <li>Search and filter movies/TV shows</li>
                <li>Add items to shopping cart</li>
                <li>Secure checkout process</li>
                <li>Personalized recommendations</li>
              </ul>
            </div>
            <div className="role-card admin-card">
              <h3>👨‍💼 Admin Capabilities</h3>
              <ul>
                <li>Add new movies and TV shows</li>
                <li>Edit existing content details</li>
                <li>Remove outdated content</li>
                <li>Manage pricing and availability</li>
                <li>Monitor platform analytics</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <h2>Experience the Future of Entertainment</h2>
          <p>
            Join thousands of users who have already discovered the CineFlow difference. 
            Whether you're here to enjoy the latest blockbusters or manage content as an admin, 
            our platform provides the tools and experience you need.
          </p>
          <div className="cta-buttons">
            <button className="cta-primary">Start Exploring</button>
            <button className="cta-secondary">Learn More</button>
          </div>
        </section>
      </div>
    </div>
  );

}

export default AboutUs;