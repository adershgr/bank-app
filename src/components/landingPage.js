import React from 'react';
import './landingPage.css';
import { Link } from 'react-router-dom';
import displayhome from './displayhome.jpg';

function LandingPage() {
  return (
    <div className='container-fluid landing-page'>
      <div className='row align-items-center h-100'>
        <div className='col-12 col-md-7 col-lg-8 col-xl-8 image-container' >
          <img src={displayhome} alt="home" className='full-size-image h-100 min-vh-100' />
        </div>
        <div className='col-12 col-md-5 col-lg-4 col-xl-4 d-flex flex-column align-items-center justify-content-center display-content' style={{ flex: '0 0 45%' }}>
          <h2 className="underline">The Bank App</h2>
          <h4>Submit your information in the form on the next page to proceed. Kindly keep your Aadhar card Number, Pan card Number, Bank Account Number and IFSC code of your Bank with you to fill the form in the next page.</h4>
          <Link to='/form' className='btn btn-primary btn-lg cta-button'>Go to Form -&gt;</Link>
          {/* Additional content or description */}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
