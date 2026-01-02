import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Destinations from '../components/Destinations';
import Packages from '../components/Packages';
import Features from '../components/Features';
import About from '../components/About';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <main>
                <Hero />
                <Destinations />
                <Packages />
                <Features />
                <About />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
