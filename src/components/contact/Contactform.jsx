import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";
import { useState } from "react";

function Contactform() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Form submitted:", formData);
  // };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
          {/* Left Column - Contact Info */}
          <div className="space-y-8">
            <div>
              <p className="text-yellow-500 font-semibold text-sm tracking-wide mb-2">
                CONTACT US
              </p>
              <h1 className="text-4xl font-bold text-blue-900 mb-4">
                Contact with Us for
                <br />
                Your Any Help
              </h1>
              <p className="text-slate-500 text-sm leading-relaxed">
                Need Help With Your Visa? - We're here to assist you at
                <br />
                every step. Reach out with any questions we respond fast!
              </p>
            </div>

            {/* Location */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-blue-900" />
                </div>
                <div>
                  <h3 className="text-yellow-500 font-semibold mb-2">
                    Our Location
                  </h3>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    NO 03 SECOND FLOOR MALAVIYA AVENUE
                    <br />
                    THIRUVAINMIYUR CHENNAI 600041
                    <br />
                    <span className="font-medium">
                      (No walk-ins, Appointment Required,
                      <br />
                      100% online service.)
                    </span>
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-blue-900" />
                </div>
                <div>
                  <h3 className="text-yellow-500 font-semibold mb-2">
                    Phone Number
                  </h3>
                  <p className="text-slate-700 text-sm font-medium">
                    +91 98848 83757
                  </p>
                  <p className="text-slate-500 text-sm">
                    (Monday to Saturday, 10 AM - 6 PM)
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-blue-900" />
                </div>
                <div>
                  <h3 className="text-yellow-500 font-semibold mb-2">
                    Send Email
                  </h3>
                  <p className="text-slate-700 text-sm font-medium">
                    info@chennaivisaservices.in
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="pt-6 border-t border-slate-200">
              <h3 className="text-blue-900 font-semibold mb-4">
                Follow Our Social Media
              </h3>
              <div className="flex gap-3">
                <button className="w-10 h-10 rounded-lg bg-slate-100 hover:bg-yellow-400 flex items-center justify-center transition-colors">
                  <Instagram className="w-5 h-5 text-yellow-500 hover:text-white" />
                </button>
                <button className="w-10 h-10 rounded-lg bg-slate-100 hover:bg-yellow-400 flex items-center justify-center transition-colors">
                  <Facebook className="w-5 h-5 text-yellow-500 hover:text-white" />
                </button>
                <button className="w-10 h-10 rounded-lg bg-slate-100 hover:bg-yellow-400 flex items-center justify-center transition-colors">
                  <Twitter className="w-5 h-5 text-yellow-500 hover:text-white" />
                </button>
                <button className="w-10 h-10 rounded-lg bg-slate-100 hover:bg-yellow-400 flex items-center justify-center transition-colors">
                  <Linkedin className="w-5 h-5 text-yellow-500 hover:text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-2">
                Send us a message
              </h2>
              <p className="text-slate-500 text-sm">
                Fill out the form and we'll get back to you within 24 hours.
              </p>
            </div>

            <form
              action="https://formspree.io/f/xdagebrz"
              method="POST"
              className="space-y-5"
            >
              <input type="hidden" name="_subject" value="New Contact Form Submission" />
              {/* Name */}
              <div>
                <label className="block text-slate-700 font-medium text-sm mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-slate-700 font-medium text-sm mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email Here"
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm"
                  required
                />
                <p className="text-slate-400 text-xs mt-1">
                  Eg: example@example.com
                </p>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-slate-700 font-medium text-sm mb-2">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <div className="flex items-center gap-2 px-3 py-3 border border-slate-200 rounded-lg bg-slate-50">
                    <span className="text-2xl">🇮🇳</span>
                    <span className="text-sm font-medium">+91</span>
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="1234567890"
                    className="flex-1 px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm"
                  />
                </div>
                <p className="text-slate-400 text-xs mt-1">
                  Please enter a valid phone number.
                </p>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-slate-700 font-medium text-sm mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-slate-700 font-medium text-sm mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter Message Here"
                  rows={5}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm resize-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-10 py-3 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold rounded-lg transition-colors shadow-sm"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contactform;
