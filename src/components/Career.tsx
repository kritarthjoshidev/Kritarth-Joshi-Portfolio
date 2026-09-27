import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          Leadership <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Google Student Ambassador</h4>
                <h5>Google</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Creating technology-focused content and taking part in Google
              initiatives, including the Creative Joy campaign.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>NASA Citizen Scientist</h4>
                <h5>NASA</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Analyzing real space data and applying data analysis techniques
              in astronomy-related citizen science activities.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Community Builder</h4>
                <h5>GDG on Campus · SAE</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Leading groundwork to establish SAE's first GDG on Campus chapter
              and build a collaborative developer community.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>NSS Volunteer</h4>
                <h5>National Service Scheme</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Participated in community service and social drives, developing
              teamwork, communication, and grassroots leadership skills.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
