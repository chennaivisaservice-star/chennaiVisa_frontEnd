import React from "react";
import { Phone, Mail, Globe, Instagram, Facebook } from "lucide-react";

const countries = [
  { code: "af", name: "Afghanistan" },
  { code: "al", name: "Albania" },
  { code: "ao", name: "Angola" },
  { code: "am", name: "Armenia" },
  { code: "au", name: "Australia" },
  { code: "at", name: "Austria" },
  { code: "az", name: "Azerbaijan" },
  { code: "bh", name: "Bahrain" },
  { code: "bd", name: "Bangladesh" },
  { code: "bj", name: "Benin" },
  { code: "bw", name: "Botswana" },
  { code: "kh", name: "Cambodia" },
  { code: "cm", name: "Cameroon" },
  { code: "ca", name: "Canada" },
  { code: "cv", name: "Cape Verde" },
  { code: "td", name: "Chad" },
  { code: "cn", name: "China" },
  { code: "cr", name: "Costa Rica" },
  { code: "dj", name: "Djibouti" },
  { code: "eg", name: "Egypt" },
  { code: "et", name: "Ethiopia" },
  { code: "fi", name: "Finland" },
  { code: "fr", name: "France" },
  { code: "ga", name: "Gabon" },
  { code: "ge", name: "Georgia" },
  { code: "de", name: "Germany" },
  { code: "gn", name: "Guinea" },
  { code: "hk", name: "Hong Kong" },
  { code: "in", name: "India" },
  { code: "id", name: "Indonesia" },
  { code: "ie", name: "Ireland" },
  { code: "il", name: "Israel" },
  { code: "it", name: "Italy" },
  { code: "jp", name: "Japan" },
  { code: "ke", name: "Kenya" },
  { code: "kw", name: "Kuwait" },
  { code: "la", name: "Laos" },
  { code: "mg", name: "Madagascar" },
  { code: "mw", name: "Malawi" },
  { code: "my", name: "Malaysia" },
  { code: "mn", name: "Mongolia" },
  { code: "ma", name: "Morocco" },
  { code: "mz", name: "Mozambique" },
  { code: "mm", name: "Myanmar" },
  { code: "nr", name: "Nauru" },
  { code: "nl", name: "Netherlands" },
  { code: "nz", name: "New Zealand" },
  { code: "no", name: "Norway" },
  { code: "om", name: "Oman" },
  { code: "pg", name: "Papua New Guinea" },
  { code: "ph", name: "Philippines" },
  { code: "pl", name: "Poland" },
  { code: "pt", name: "Portugal" },
  { code: "ru", name: "Russia" },
  { code: "rw", name: "Rwanda" },
  { code: "sg", name: "Singapore" },
  { code: "sb", name: "Solomon Islands" },
  { code: "kr", name: "South Korea" },
  { code: "es", name: "Spain" },
  { code: "lk", name: "Sri Lanka" },
  { code: "se", name: "Sweden" },
  { code: "ch", name: "Switzerland" },
  { code: "tw", name: "Taiwan" },
  { code: "tz", name: "Tanzania" },
  { code: "th", name: "Thailand" },
  { code: "to", name: "Tonga" },
  { code: "tr", name: "Turkey" },
  { code: "ug", name: "Uganda" },
  { code: "ua", name: "Ukraine" },
  { code: "ae", name: "United Arab Emirates" },
  { code: "gb", name: "United Kingdom" },
  { code: "us", name: "United States" },
  { code: "uz", name: "Uzbekistan" },
  { code: "vn", name: "Vietnam" },
  { code: "zm", name: "Zambia" },
  { code: "zw", name: "Zimbabwe" },
];

const Footer = () => {
  return (
    <footer className="bg-[#04204A] text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6">
        {/* Countries Section */}
        <div className="mb-10">
          <h3 className="text-[#F9CC00] text-sm font-semibold mb-6 uppercase tracking-wider">
            Countries We Serve
          </h3>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            {countries.map((country, index) => (
              <div key={index} className="flex items-center gap-2">
                <img
                  src={`https://flagcdn.com/w20/${country.code}.png`}
                  alt={country.name}
                  className="w-6 h-4 border border-white/30 rounded-sm"
                />
                <span className="text-white">{country.name}</span>
                <span className="text-blue-300 font-thin">|</span>
              </div>
            ))}
            <span className="text-blue-200 font-light">& Many More</span>
          </div>
        </div>

        <div className="border-t border-blue-800 pt-10 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div>
              <div className="mb-4">
                <img
                  src="/white.png"
                  // src="/blacklogo.png"
                  alt="Chennai Visa Service"
                  className="h-10 w-auto"
                />
              </div>

              <p className="text-blue-200 text-sm mb-6 leading-relaxed">
                Chennai Visa Service simplifies visa applications for Indian
                travelers. From tourist to business visas, we make the process
                easy, fast, and fully online — no office visits needed.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="text-[#F9CC00]" size={18} />
                  <div>
                    <div className="text-white">+91  98848 83757</div>
                    <div className="text-blue-300 text-xs">
                      (Monday to Saturday, 10 AM - 6 PM)
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="text-[#F9CC00]" size={18} />
                  <span className="text-blue-200">
                    info@chennaivisaservices.in
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Globe className="text-[#F9CC00]" size={18} />
                  <span className="text-blue-200">
                    Serving all over India, 100% online
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2.5 text-sm">
                {["Home", "Contact Us", "Tours", "FAQ's", "Blogs"].map(
                  (item, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="text-blue-200 hover:text-[#F9CC00] transition-colors flex items-center gap-2"
                      >
                        <span>›</span> {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Other Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Other Links</h3>
              <ul className="space-y-2.5 text-sm">
                {[
                  "Privacy",
                  "Contact Us",
                  "Terms & Conditions",
                  "Shipping Policy",
                  "Cancellation",
                  "Cookies",
                ].map((item, i) => (
                  <li key={i}>
                    <a
                      href="/privacy-policy"
                      className="text-blue-200 hover:text-[#F9CC00] transition-colors flex items-center gap-2"
                    >
                      <span>›</span> {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Follow Us */}
            <div>
              <h3 className="text-white font-semibold mb-4">Follow Us</h3>
              <p className="text-blue-200 text-sm mb-4">
                Stay connected and explore the world with us!
              </p>
              <ul className="space-y-2.5 text-sm">
                <li className="flex items-center gap-2 text-blue-200 hover:text-[#F9CC00] transition-colors">
                  <Instagram size={16} /> Chennai Visa Serviceindia
                </li>
                <li className="flex items-center gap-2 text-blue-200 hover:text-[#F9CC00] transition-colors">
                  <Facebook size={16} /> Chennai Visa Serviceofficial
                </li>
                <li className="flex items-center gap-2 text-blue-200 hover:text-[#F9CC00] transition-colors">
                  <span>@Chennai Visa Serviceofficial</span>
                </li>
                <li className="flex items-center gap-2 text-blue-200 hover:text-[#F9CC00] transition-colors">
                  <span>Chennai Visa Service</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-800 pt-6 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-blue-300">
            <p>© 2025 Chennai Visa Service. All rights reserved.</p>
            {/* <p>
              Made with <span className="text-red-500">❤</span> by{" "}
              <span className="text-white font-semibold">Ascendtis</span>
            </p> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
