import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Destinations from '../components/Destinations';
import Features from '../components/Features';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <main>
                <Hero />
                <Destinations />
                <Features />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
