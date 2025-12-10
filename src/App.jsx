import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import Visa from "./pages/Visa";
import VisaDetail from "./components/visa/VisaDetail";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import AuthProvider from "./context/AuthContext";
import VisaOptions from "./components/visa/VisaOptions";
import VisaApply from "./components/visa/VisaApply";
import ApplyVisa from "./components/visa/ApplyVisa";

// NEW
import TravellerForm from "./components/visa/TravellerForm";
import ReviewPay from "./components/visa/ReviewPay";
// import { ApplicationProvider } from "./context/ApplicationContext";

import ScrollToTop from "./components/common/ScrollToTop";
import ApplicationProvider from "./context/ApplicationContext";
import Blog from "./components/home/Blog";
import ProfilePage from "./components/common/ProfilePage";
import PaymentSuccess from "./pages/PaymentSuccess";
import NotFound from "./pages/NotFound";
import WhatsappFloatingButton from "./components/common/WhatsappFloatingButton";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        {/* provide dates + travellers state to the flow */}
        <ApplicationProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/visa" element={<Visa />} />
                <Route path="/visa/:slug" element={<VisaDetail />} />
                <Route path="/visa/:slug/:purpose" element={<VisaOptions />} />

                <Route path="/profile" element={<ProfilePage />} />

                <Route
                  path="/visa/:slug/:purpose/visapply"
                  element={<VisaApply />}
                />
                <Route
                  path="/visa/:slug/:purpose/applyvisa"
                  element={<ApplyVisa />}
                />

                <Route
                  path="/visa/:slug/:purpose/traveller/new"
                  element={<TravellerForm />}
                />
                <Route
                  path="/visa/:slug/:purpose/review"
                  element={<ReviewPay />}
                />

                <Route path="/payment-success" element={<PaymentSuccess />} />

                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/blogs" element={<Blog />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            {/* WhatsApp Floating Button added here */}
            <WhatsappFloatingButton />
          </div>
        </ApplicationProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}
