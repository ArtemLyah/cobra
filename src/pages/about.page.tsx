import React from 'react';
import { Container } from 'react-bootstrap';
import './styles/about.css';

import WhoWeAreSlide from './presentation/slides/who-we-are/whoWeAre.slide';
import Developers from './presentation/slides/developers/developers.slide';


interface AboutUsContent {
  name: string;
  title: string;
  description: string;
}

const content: Array<AboutUsContent> = [
  {
    name: 'Introduction',
    title: 'Meet the CoBra Team',
    description: 'We are a dynamic team of four enthusiastic students currently pursuing our studies at Kyiv Polytechnic Institute (KPI). United by a passion for coding and a shared vision, we have embarked on the journey of developing the CoBra (Code Branch) roadmap website.',
  },
  {
    name: 'Our Origin at KPI',
    title: 'Roots at Kyiv Polytechnic Institute',
    description: 'Our journey began at Kyiv University, where we found common ground in our academic pursuits. As students at KPI, we were inspired to channel our collective energy and skills into a project that could make a meaningful impact in the world of coding.',
  },
  {
    name: 'The Birth of CoBra',
    title: 'Inception of Code Branch',
    description: 'CoBra, short for Code Branch, emerged from our desire to create a valuable resource for fellow learners in the coding community. Despite being beginners, we foster a strong belief in the success and significance of our project.',
  },
  {
    name: 'The CoBra Philosophy',
    title: 'Believing in Success',
    description: 'At CoBra, we are more than just beginners; we are individuals driven by a resolute belief in the future success of our project. Our shared vision is rooted in the conviction that even novices can contribute significantly to the tech world.',
  },
  {
    name: 'Passion for Coding',
    title: 'Fueled by Passion',
    description: 'What sets us apart is our unwavering passion for coding. Despite being in the early stages of our journey, our commitment to mastering the craft and developing a comprehensive roadmap reflects our dedication to the ever-evolving world of programming.',
  },
  {
    name: 'The CoBra Promise',
    title: 'Nurturing Success Stories',
    description: 'CoBra is not just a roadmap website; it`s a promise to nurture success stories. As beginners ourselves, we understand the challenges of the learning curve, and our project is designed to support and guide individuals on their coding journey.',
  },
  {
    name: 'Building a Successful Future',
    title: 'Crafting Tomorrow`s Success',
    description: 'With CoBra, we aim to contribute to shaping a successful future for aspiring coders. Our shared optimism, dedication, and learning mindset form the foundation of a project that we believe will grow and evolve, just like the coding landscape we are so passionate about.',
  },
];



const AboutPage = () => {
  return (
    <Container className="aboutPage">
      <div className="hero-area">
        <div className="title-container">
          <h1>
            About us
          </h1>
          <h2>
            code branch
          </h2>
        </div>
      </div>
      <div className="aboutPage-content">
        {
          content.map((item, index) => {
            return (
              <WhoWeAreSlide
                key={index}
                title={item.name}
                text=''
                blockText={item.description}
                blockTitle={item.title}
              />
            );
          })
        }
        <Developers />
      </div>
    </Container>

  );
};

export default AboutPage;