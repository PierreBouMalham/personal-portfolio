import React from 'react'
import './App.css';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import Hero from './components/Hero/Hero';
import Navbar from './components/Navbar/Navbar';
import Projects from './components/Projects/Projects';
import Resume from './components/Resume/Resume';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <About />
      <Resume />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
