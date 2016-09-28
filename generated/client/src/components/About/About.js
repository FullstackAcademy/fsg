'use strict';

import React from 'react';
import { Row, Col, Carousel } from 'react-bootstrap';
import FullstackPics from '../../resources/FullstackPics';
import './_About';

const About = (props) => {
  return (
    <section id='about'>
      <p>
        This website--the very one at which you currently gaze--was created by a basic scaffolding
        concocted at Fullstack Academy. Here are some of the people who make it all very real:
      </p>
      <Carousel interval={2000} indicators={false}>
        {
          FullstackPics.map((pic, i) => {
            return (
              <Carousel.Item key={i}>
                <img height={300} src={pic} />
              </Carousel.Item>
            )
          })
        }
      </Carousel>
    </section>
  )
}

export default About;
