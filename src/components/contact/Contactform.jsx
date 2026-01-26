import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Book,
  Check,
  // Twitter,
  // Linkedin,
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

  // ✅ FORM SUBMIT HANDLER (FORM SPREE)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://formspree.io/f/xdagebrz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        alert("Failed to send message.");
      }
    } catch (error) {
      alert("Something went wrong!");
    }
  };

  // ✅ INPUT HANDLER
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
          {/* LEFT SIDE */}
          <div className="space-y-8">
            <div>
              <p className="text-yellow-500 font-semibold text-sm tracking-wide mb-2">
                CONTACT US
              </p>
              <h1 className="text-4xl font-bold text-blue-900 mb-4">
                Contact with Us for <br /> Your Any Help
              </h1>
              <p className="text-slate-500 text-sm leading-relaxed">
                Need Help With Your Visa? We're here to assist you at every
                step.
              </p>
            </div>

            {/* LOCATION */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-blue-900" />
              </div>
              <div>
                <h3 className="text-yellow-500 font-semibold mb-2">
                  Our Location
                </h3>
                <p className="text-sm text-slate-700">
                  NO 03 SECOND FLOOR MALAVIYA AVENUE <br />
                  THIRUVAINMIYUR CHENNAI 600041
                </p>
              </div>
            </div>

            {/* PHONE */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-blue-900" />
              </div>
              <div>
                <h3 className="text-yellow-500 font-semibold mb-2">Phone</h3>
                <p className="text-sm text-slate-700">+91 98848 83757</p>
              </div>
            </div>

            {/* EMAIL */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-blue-900" />
              </div>
              <div>
                <h3 className="text-yellow-500 font-semibold mb-2">Email</h3>
                <p className="text-sm text-slate-700">
                  info@chennaivisaservices.in
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                <Book className="w-6 h-6 text-blue-900" />
              </div>
              <div>
                <h3 className="text-yellow-500 font-semibold mb-2">Registration No</h3>
                <p className="text-sm text-slate-700">
                  33BVXPD2230A1Z4
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                <Check className="w-6 h-6 text-blue-900" />
              </div>
              <div>
                <h3 className="text-yellow-500 font-semibold mb-2">ISO No</h3>
                <p className="text-sm text-slate-700">
                  1S0-9001-2015
                </p>
              </div>
            </div>

            {/* SOCIAL */}
            <div className="flex gap-3 pt-4">
              <a
                href=" https://www.instagram.com/chennaivisaservices/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram />
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61583343781733"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook />
              </a>
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div>
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              Send us a message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg"
              />

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg"
              />

              <textarea
                name="message"
                placeholder="Message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg"
              />

              <button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-500 px-8 py-3 rounded-lg font-semibold"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contactform;
