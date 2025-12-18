import React from 'react';

const About = () => {
    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 py-16">
                <div className="container mx-auto px-4 max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Image */}
                    <div className="flex justify-center">
                        <img
                            src="https://www.themercuryville.com/wp-content/uploads/2024/11/%E0%B9%80%E0%B8%95%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%A1%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B9%84%E0%B8%9B%E0%B8%95%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%97%E0%B8%A8%E0%B8%84%E0%B8%A3%E0%B8%B1%E0%B9%89%E0%B8%87%E0%B9%81%E0%B8%A3%E0%B8%81.jpg"
                            alt="About PeakRoute"
                            className=" shadow-lg w-full max-w-md object-cover"
                        />
                    </div>

                    {/* Text Content */}
                    <div className="space-y-6">
                        <h1 className="text-4xl font-bold">About PeakRoute</h1>
                        <p className="text-lg">
                            <strong>PeakRoute</strong> is your trusted partner for unforgettable travel experiences.
                            We craft tours that showcase the best destinations, culture, and hidden gems.
                        </p>
                        <p className="text-lg">
                            Our mission is simple: <strong>make every journey memorable, seamless, and exciting.</strong>
                            Personalized itineraries, local insights, and attention to detail ensure a perfect travel experience.
                        </p>
                        <p className="text-lg">
                            Travel with us and discover the world differently — <strong>connect with culture, people, and yourself.</strong>
                        </p>
                        <div className="mt-4">
                            <a
                                href="/contact"
                                className="inline-block rounded-lg bg-primary px-6 py-3 text-white font-semibold shadow-lg hover:bg-primary/90 transition"
                            >
                                Contact Us
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;