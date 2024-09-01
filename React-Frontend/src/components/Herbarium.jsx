import React from 'react';
import Footer from './footer';
function Herbarium() {
  return (
    <>
    <div className='herb'>
      
      <iframe style={{ marginTop: "100px", margin: "100px auto 0" }}
        title="Embedded Content"
        width="100%"
        height="470px"
        src="https://saifjadoon.github.io/nust_species/"
        frameborder="0"
        allowfullscreen
      ></iframe>
      
    </div>
    <Footer></Footer>
    </>
  );
}

export default Herbarium;
