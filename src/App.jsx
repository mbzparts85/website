import { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import TrustBar from './components/TrustBar.jsx';
import Products from './components/Products.jsx';
import About from './components/About.jsx';
import Services from './components/Services.jsx';
import Quote from './components/Quote.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppFloat from './components/WhatsAppFloat.jsx';

export default function App() {
  // The hero search box and the catalogue share one search term.
  const [query, setQuery] = useState('');

  function searchFromHero(value) {
    setQuery(value);
    document.getElementById('products')?.scrollIntoView();
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Navbar />
      <main>
        <Hero onSearch={searchFromHero} />
        <TrustBar />
        <Products query={query} setQuery={setQuery} />
        <About />
        <Services />
        <Quote />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
