import React, { useState } from "react";
import { FaPhoneAlt, FaWhatsapp, FaEnvelope } from "react-icons/fa";

import Navbar from "./Navbar";
import Footer from "./Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "http://localhost:8082/api/v1/user/contact/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      alert(data.message);

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      alert("Message failed to send");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 px-4 py-6 md:px-20">
        <div className="flex items-center gap-3 mb-6">
          <button className="text-xl">←</button>
          <h1 className="text-xl font-semibold mx-auto">Contact Us</h1>
        </div>
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Send us a message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-full border outline-none
                             focus:ring-2 focus:ring-gray-300"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full px-4 py-3 rounded-full border outline-none
                             focus:ring-2 focus:ring-gray-300"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Message</label>
                <textarea
                  rows="4"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  className="w-full px-4 py-3 rounded-xl border outline-none resize-none
                             focus:ring-2 focus:ring-gray-300"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gray-400 text-black font-semibold py-3
                           rounded-full hover:bg-gray-500 transition cursor-pointer"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
        <div className="flex justify-around md:justify-center md:gap-16 mt-10 mb-8">
          <a
            href="tel:+919775638730"
            className="flex flex-col items-center cursor-pointer"
          >
            <div className="w-14 h-14 bg-blue-400 rounded-full flex items-center justify-center text-xl text-white">
              <FaPhoneAlt />
            </div>
            <p className="mt-2 text-sm font-medium">Call</p>
          </a>
          <a
            href="mailto:sanjubhunia93@outlook.com"
            className="flex flex-col items-center cursor-pointer"
          >
            <div className="w-14 h-14 bg-blue-400 rounded-full flex items-center justify-center text-xl text-white">
              <FaEnvelope />
            </div>
            <p className="mt-2 text-sm font-medium">Email</p>
          </a>

          <a
            href="https://wa.me/919775638730?text=Hello%20I%20want%20to%20contact%20you"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center cursor-pointer hover:scale-105 transition"
          >
            <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-2xl text-white">
              <FaWhatsapp />
            </div>
            <p className="mt-2 text-sm font-medium">WhatsApp</p>
          </a>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Contact;
