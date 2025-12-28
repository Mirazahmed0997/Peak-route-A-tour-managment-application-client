import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const About = () => {
    return (
        <div>
            {/* Hero Section */}
            <section className="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 py-16">
                <div className="container mx-auto px-4 max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <div className="space-y-6 order-2 lg:order-1">
                        <h1 className="text-4xl md:text-5xl font-bold">About PeakRoute</h1>
                        <p className="text-lg leading-relaxed">
                            <strong>PeakRoute</strong> is a passionate Bangladesh-based tour operator dedicated to unveiling the hidden beauty of our incredible country. From the world's longest sea beach to misty hill valleys, lush tea gardens, and the majestic Sundarbans – we craft authentic experiences that go beyond typical tourism.
                        </p>
                        <p className="text-lg leading-relaxed">
                            Founded by local travel enthusiasts, our mission is to make every journey <strong>memorable, seamless, and meaningful</strong>. We believe in responsible tourism that supports local communities, preserves nature, and creates lifelong memories for our guests.
                        </p>
                        <p className="text-lg leading-relaxed">
                            Travel with us and discover Bangladesh differently — <strong>connect with its warm people, rich culture, and breathtaking landscapes.</strong>
                        </p>
                        <div className="mt-8">
                            <Button asChild size="lg">
                                <Link to="/contact">Get in Touch</Link>
                            </Button>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="flex justify-center order-1 lg:order-2">
                        <img
                            src="https://bdscenictours.b-cdn.net/wp-content/uploads/2023/08/Edit2.jpg"
                            alt="Stunning landscapes of Bangladesh - Cox's Bazar and beyond"
                            className="rounded-xl shadow-2xl w-full max-w-2xl object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-16 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4 max-w-7xl text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Story</h2>
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="space-y-4">
                            <img
                                src="https://www.bangladeshtravelandtours.com/wp-content/uploads/2023/04/55.jpg"
                                alt="Sajek Valley - Sea of clouds"
                                className="rounded-lg shadow-lg w-full h-64 object-cover"
                            />
                            <h3 className="text-xl font-semibold">Born from Passion</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Started by adventurers who fell in love with Bangladesh's diverse beauty – from beaches to mountains.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <img
                                src="https://www.itsholidaysltd.com/images/blog/beautiful-places-in-bangladesh.jpg"
                                alt="Tea gardens in Sylhet"
                                className="rounded-lg shadow-lg w-full h-64 object-cover"
                            />
                            <h3 className="text-xl font-semibold">Local Expertise</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Our team consists of local guides who know every hidden spot and share authentic stories.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <img
                                src="https://cdn.shortpixel.ai/spai/q_lossy+w_977+to_auto+ret_img/uncorneredmarket.com/wp-content/uploads/2018/02/Bangladesh_Kids.jpg"
                                alt="Warm smiles from local people"
                                className="rounded-lg shadow-lg w-full h-64 object-cover"
                            />
                            <h3 className="text-xl font-semibold">Guest Happiness First</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Thousands of happy travelers have experienced the real Bangladesh with us.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-16 bg-gray-50 dark:bg-gray-950">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Travel With PeakRoute?</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center space-y-4">
                            <div className="bg-primary/10 p-6 rounded-full w-24 h-24 mx-auto flex items-center justify-center">
                                <span className="text-3xl">🌿</span>
                            </div>
                            <h3 className="text-xl font-semibold">Eco-Friendly Tours</h3>
                            <p className="text-gray-600 dark:text-gray-400">Sustainable practices that protect Bangladesh's natural wonders</p>
                        </div>
                        <div className="text-center space-y-4">
                            <div className="bg-primary/10 p-6 rounded-full w-24 h-24 mx-auto flex items-center justify-center">
                                <span className="text-3xl">👨‍👩‍👧‍👦</span>
                            </div>
                            <h3 className="text-xl font-semibold">Expert Local Guides</h3>
                            <p className="text-gray-600 dark:text-gray-400">Knowledgeable, friendly guides who make every tour special</p>
                        </div>
                        <div className="text-center space-y-4">
                            <div className="bg-primary/10 p-6 rounded-full w-24 h-24 mx-auto flex items-center justify-center">
                                <span className="text-3xl">💰</span>
                            </div>
                            <h3 className="text-xl font-semibold">Best Price Guarantee</h3>
                            <p className="text-gray-600 dark:text-gray-400">Competitive pricing with no hidden fees</p>
                        </div>
                        <div className="text-center space-y-4">
                            <div className="bg-primary/10 p-6 rounded-full w-24 h-24 mx-auto flex items-center justify-center">
                                <span className="text-3xl">🛡️</span>
                            </div>
                            <h3 className="text-xl font-semibold">Safe & Secure</h3>
                            <p className="text-gray-600 dark:text-gray-400">24/7 support and carefully planned itineraries</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-16 bg-primary text-primary-foreground">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Ready to Explore Bangladesh?
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        Let us create your perfect adventure. Contact our team today!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {/* View All Tours Button */}
                        <Button asChild size="lg" variant="secondary">
                            <Link to="/tour">View All Tours</Link>
                        </Button>

                        {/* Contact Us Button - Clean outline in both modes */}
                        <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary transition-colors">
                            <Link to="/contact">Contact Us</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;