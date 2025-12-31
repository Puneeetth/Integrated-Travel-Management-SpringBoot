const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background with gradient overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-hero-gradient" />
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=2000&q=80')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-900/50 to-dark-900" />
            </div>

            {/* Animated floating elements */}
            <div className="absolute top-1/4 left-1/6 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-1/4 right-1/6 w-96 h-96 bg-secondary-500/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary-400/10 rounded-full blur-3xl animate-pulse-slow" />

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
                <div className="text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8 animate-fade-in-up">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-sm text-gray-300">Your journey begins here</span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-white mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        Discover Your Next
                        <br />
                        <span className="gradient-text">Dream Destination</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        Explore breathtaking locations, curated travel packages, and unforgettable experiences.
                        Let us turn your travel dreams into reality.
                    </p>

                    {/* Search Box */}
                    <div className="max-w-3xl mx-auto glass-card p-2 mb-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Where do you want to go?"
                                    className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none"
                                />
                            </div>
                            <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="When?"
                                    className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none"
                                />
                            </div>
                            <button className="btn-secondary flex items-center justify-center gap-2 sm:w-auto">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                Search
                            </button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap justify-center gap-8 sm:gap-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        <div className="text-center">
                            <div className="text-3xl sm:text-4xl font-bold text-white mb-1">500+</div>
                            <div className="text-gray-400">Destinations</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl sm:text-4xl font-bold text-white mb-1">50K+</div>
                            <div className="text-gray-400">Happy Travelers</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl sm:text-4xl font-bold text-white mb-1">4.9</div>
                            <div className="text-gray-400">Rating</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl sm:text-4xl font-bold text-white mb-1">24/7</div>
                            <div className="text-gray-400">Support</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section>
    );
};

export default Hero;
