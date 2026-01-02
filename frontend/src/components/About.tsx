const stats = [
    { value: '10K+', label: 'Happy Travelers' },
    { value: '500+', label: 'Destinations' },
    { value: '15+', label: 'Years Experience' },
    { value: '24/7', label: 'Support' }
];

const team = [
    {
        name: 'Rahul Sharma',
        role: 'Founder & CEO',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    },
    {
        name: 'Priya Patel',
        role: 'Head of Operations',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    },
    {
        name: 'Amit Kumar',
        role: 'Travel Expert',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    }
];

const About = () => {
    return (
        <section id="about" className="py-24 bg-hero-gradient relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider">About Us</span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mt-3 mb-4">
                        Your Trusted <span className="gradient-text">Travel Partner</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Since 2010, we've been crafting unforgettable travel experiences for adventurers around the world
                    </p>
                </div>

                {/* Story Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                    <div className="relative">
                        <div className="glass-card p-2 rounded-3xl overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800"
                                alt="Travel Adventure"
                                className="w-full h-80 object-cover rounded-2xl"
                            />
                        </div>
                        <div className="absolute -bottom-6 -right-6 glass-card p-4 rounded-2xl">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-white font-bold">Trusted</div>
                                    <div className="text-gray-400 text-sm">Since 2010</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-3xl font-display font-bold text-white mb-6">
                            We Make Travel Simple & Memorable
                        </h3>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            TravelEase was born from a simple idea: everyone deserves amazing travel experiences without the hassle.
                            We combine technology with local expertise to create seamless journeys that turn into lifelong memories.
                        </p>
                        <p className="text-gray-400 mb-8 leading-relaxed">
                            From handpicked accommodations to curated activities, every detail is carefully planned.
                            Our team of travel enthusiasts works around the clock to ensure your adventures are nothing short of extraordinary.
                        </p>

                        <div className="flex flex-wrap gap-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="text-white font-medium">Best Price Guarantee</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <span className="text-white font-medium">Secure Booking</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <span className="text-white font-medium">24/7 Support</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="glass-card p-8 md:p-12 rounded-3xl mb-20">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl md:text-5xl font-display font-bold gradient-text mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-gray-400 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Team */}
                <div className="text-center mb-12">
                    <h3 className="text-3xl font-display font-bold text-white mb-4">Meet Our Team</h3>
                    <p className="text-gray-400">Passionate travelers dedicated to making your journey perfect</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {team.map((member, index) => (
                        <div key={index} className="glass-card p-6 text-center card-hover group">
                            <div className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden border-4 border-primary-500/20 group-hover:border-primary-500 transition-colors">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h4 className="text-xl font-display font-bold text-white mb-1">{member.name}</h4>
                            <p className="text-primary-400 text-sm font-medium">{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
