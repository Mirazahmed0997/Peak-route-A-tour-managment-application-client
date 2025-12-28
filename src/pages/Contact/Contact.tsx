// src/pages/Contact.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock, Globe, Facebook, Instagram, Youtube } from "lucide-react";

const Contact = () => {
  return (
    <div className="container mx-auto py-12 px-4 max-w-7xl">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Contact Us
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          We're here to help you plan your perfect adventure in Bangladesh. 
          Reach out through any of the channels below!
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Office Address */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-3 rounded-lg">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Office Address</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              House #45, Road #8<br />
              Block C, Bashundhara R/A<br />
              Dhaka - 1229<br />
              Bangladesh
            </p>
          </CardContent>
        </Card>

        {/* Phone Numbers */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Call Us</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Hotline (24/7)</p>
              <p className="text-lg font-semibold text-primary">+880 1711 **** ****</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Office</p>
              <p className="text-lg font-medium">+880 2-9876****</p>
            </div>
          </CardContent>
        </Card>

        {/* Email */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Email Us</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">General Inquiry</p>
              <a href="mailto:info@peakroute.com" className="text-lg font-medium text-primary hover:underline">
                info@peakroute.com
              </a>
            </div>
            <div>
              <p className="text-sm text-gray-500">Support</p>
              <a href="mailto:support@peakroute.com" className="text-lg font-medium text-primary hover:underline">
                support@peakroute.com
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Office Hours */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Office Hours</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Saturday - Thursday:</strong> 9:00 AM - 7:00 PM<br />
              <strong>Friday:</strong> Closed
            </p>
            <p className="text-sm text-gray-500 mt-3">
              Emergency support available 24/7 via hotline
            </p>
          </CardContent>
        </Card>

        {/* Website & Social */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Follow Us</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <a href="https://www.peakroute.com" target="_blank" rel="noopener noreferrer" 
               className="flex items-center gap-3 text-primary hover:underline">
              <Globe className="w-5 h-5" />
              www.peakroute.com
            </a>
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-primary hover:scale-110 transition-transform">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-primary hover:scale-110 transition-transform">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-primary hover:scale-110 transition-transform">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Extra Note */}
      <div className="text-center mt-12">
        <p className="text-gray-600 dark:text-gray-400">
          We typically respond within <strong>2-4 hours</strong> during business hours.
        </p>
      </div>
    </div>
  );
};

export default Contact;