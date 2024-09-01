import React from 'react';
import Footer from './footer';

function Graphs() {
  return (
    <>
    <div className='graph'>
      
      <iframe style={{ marginTop: "100px", margin: "100px auto 0" }}
        title="Embedded Content"
        width="100%"
        height="1120px"
        src="https://saad-bin-tariq.github.io/aiaware_heatchart/"
        frameborder="0"
        allowfullscreen
      ></iframe>
      
    </div>
    <Footer></Footer>
    </>
  );
}

export default Graphs;
