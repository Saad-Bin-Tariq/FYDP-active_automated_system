// Navbar.jsx
import '../App.css'
import '../animate.css'
import '../font-awesome.min.css'
import '../namari-color.css'
import logo from '../images/aiwarelogopng.png'
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';


"use strict";

$(document).ready(function () {
	/* Video Lightbox */
	// if (!!$.prototype.simpleLightboxVideo) {
	// 	$('.video').simpleLightboxVideo();
	// }

	/*ScrollUp*/
	if (!!$.prototype.scrollUp) {
		$.scrollUp();
	}

	/*Responsive Navigation*/
	$("#nav-mobile").html($("#nav-main").html());
	$("#nav-trigger span").on("click",function() {
		if ($("nav#nav-mobile ul").hasClass("expanded")) {
			$("nav#nav-mobile ul.expanded").removeClass("expanded").slideUp(250);
			$(this).removeClass("open");
		} else {
			$("nav#nav-mobile ul").addClass("expanded").slideDown(250);
			$(this).addClass("open");
		}
	});

	$("#nav-mobile").html($("#nav-main").html());
	$("#nav-mobile ul a").on("click",function() {
		if ($("nav#nav-mobile ul").hasClass("expanded")) {
			$("nav#nav-mobile ul.expanded").removeClass("expanded").slideUp(250);
			$("#nav-trigger span").removeClass("open");
		}
	});

	/* Sticky Navigation */
	if (!!$.prototype.stickyNavbar) {
		$('#header').stickyNavbar();
	}

	$('#content').waypoint(function (direction) {
		if (direction === 'down') {
			$('#header').addClass('nav-solid fadeInDown');
		}
		else {
			$('#header').removeClass('nav-solid fadeInDown');
		}
	});


    


});



const Navbar = () => {
   
  return (
    
<div id="wrapper">

<header id="banner" className="scrollto clearfix" data-enllax-ratio=".5">
    <div id="header" className="nav-collapse">
        <div className="row clearfix">
            <div className="col-1">

                {/* <!--Logo--> */}
                <div id="logo">

                    {/* <!--Logo that is shown on the banner--> */}
                    <img src={logo} id="banner-logo" alt="Landing Page"/>
                    {/* <!--End of Banner Logo--> */}

                    
                </div>
              

                {/* <!--Main Navigation--> */}
              
              
    
                 <nav id="nav-main">
                    <ul>
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href="/graphs">Thermal Graphs</a>
                        </li>
                        <li>
                            <a href="/heatmap">Heat Map</a>
                        </li>
                        <li>
                            <a href="/herbarium">Herbarium</a>
                        </li>
                        <li>
                            <a href="/model">Prediction</a>
                        </li>
                        <li>
                            {/* <a href="/dsm">3D Model</a> */}
                        </li>
                        <li>
                            <a href="/api">API</a>
                        </li>
                        <li>
                            <a href="/dataset">Data Set</a>
                        </li>
                        
                    </ul>
                </nav> 
                {/* <!--End of Main Navigation--> */}

                <div id="nav-trigger"><span></span></div>
                <nav id="nav-mobile"></nav>

            </div>
        </div>
    </div>
    {/* <!--End of Header--> */}
    </header>
</div>


  );
};

export default Navbar;