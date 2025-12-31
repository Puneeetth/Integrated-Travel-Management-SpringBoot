const features = [
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
        title: 'Secure Booking',
        description: 'Your bookings are protected with industry-leading security and encryption.',
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        title: 'Best Price Guarantee',
        description: 'Find a lower price? We\'ll match it and give you an extra 10% off.',
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        ),
        title: '24/7 Support',
        description: 'Our travel experts are available around the clock to assist you.',
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        title: 'Curated Experiences',
        description: 'Hand-picked destinations and authentic local experiences for every trip.',
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
        title: 'Expert Guides',
        description: 'Local experts guide you through hidden gems and popular attractions.',
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        title: 'Flexible Cancellation',
        description: 'Plans change. That\'s why we offer flexible cancellation policies.',
    },
];

const Features = () => {
    return (
        <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl -translate-x-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl translate-x-1/2" />

            <div className="max-w-7xl mx-auto relative">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1 rounded-full bg-secondary-500/10 text-secondary-400 text-sm font-medium mb-4">
                        Why Choose Us
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
                        Why Travel <span className="gradient-text">With Us?</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        We're committed to making your travel experience seamless, memorable, and affordable.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="glass-card p-8 card-hover group"
                        >
                            {/* Icon */}
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center mb-6 group-hover:from-primary-500 group-hover:to-secondary-500 transition-all duration-300">
                                <div className="text-primary-400 group-hover:text-white transition-colors duration-300">
                                    {feature.icon}
                                </div>
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                            <p className="text-gray-400">{feature.description}</p>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="mt-20 glass-card p-8 sm:p-12 text-center relative overflow-hidden">
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-transparent to-secondary-500/10" />

                    <div className="relative">
                        <h3 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
                            Ready to Start Your Journey?
                        </h3>
                        <p className="text-gray-400 max-w-xl mx-auto mb-8">
                            Join thousands of happy travelers who have discovered their perfect vacation with us.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="btn-secondary">
                                Explore Packages
                            </button>
                            <button className="btn-outline">
                                Contact Us
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
