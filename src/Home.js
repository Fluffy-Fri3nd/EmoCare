import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './index.css';

function Home() {
    const [bgPosition, setBgPosition] = useState({ x: 50, y: 50 });
    const navigate = useNavigate();

    // Refs untuk setiap bagian yang ingin digulirkan
    const aboutRef = useRef(null);
    const featuresRef = useRef(null);
    const teamRef = useRef(null);

    const handleNavigate = () => {
        navigate('/emotion-detection');
    };

    const scrollToSection = (ref) => {
        ref.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    };

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = (clientX / innerWidth) * 100;
        const y = (clientY / innerHeight) * 100;
        setBgPosition({ x, y });
    };

    return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 text-gray-800">
                {/* Navbar */}
                <header className="fixed top-0 left-0 w-full bg-purple-600 shadow-md text-white z-50">
                    <div className="container mx-auto flex justify-between items-center py-4 px-20">
                        <Link to="/" className="text-xl font-bold">
                            EmoCare
                        </Link>
                        <nav>
                            <ul className="flex space-x-6">
                                <li>
                                    <button
                                        onClick={() => scrollToSection(aboutRef)}
                                        className="hover:text-gray-300 transition"
                                    >
                                        About
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => scrollToSection(featuresRef)}
                                        className="hover:text-gray-300 transition"
                                    >
                                        Features
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => scrollToSection(teamRef)}
                                        className="hover:text-gray-300 transition"
                                    >
                                        Team
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="py-24" 
                    onMouseMove={handleMouseMove}
                    style={{
                        background: `radial-gradient(circle at ${bgPosition.x}% ${bgPosition.y}%, #a8e6cf, #dcedc1, #ffd3b6)`,
                        transition: 'background 0.1s',
                    }}>
                    <div className="max-w-5xl mx-auto p-8 w-full flex flex-col-reverse lg:flex-row items-center">
                        {/* Text Content */}
                        <div className="lg:w-1/2 text-center lg:text-left">
                            <h1 className="text-5xl font-bold text-purple-700 mb-6 leading-tight">
                                Digital Emotion Assistant
                            </h1>
                            <p className="text-lg mb-8">
                                Shows that EmoCare uses technology to detect and analyze users' emotions through the text they enter.
                            </p>
                            <button
                                onClick={handleNavigate}
                                className="bg-purple-700 text-white py-3 px-6 rounded-lg text-lg font-semibold shadow-lg hover:bg-purple-800 transition transform hover:scale-105"
                            >
                                Get Started
                            </button>
                        </div>
                        {/* Image */}
                        <div className="lg:w-1/2">
                            <img
                                src="logo.png"
                                alt="Emotion Detection"
                                className="max-w-full mx-auto lg:ml-auto hover:scale-105 transition transform"
                            />
                        </div>
                    </div>
                </section>

                <section id="about" ref={aboutRef} className="py-48 bg-white">
                    <div className="max-w-5xl mx-auto p-8 w-full text-center">
                        <h2 className="text-4xl font-bold text-purple-700 mb-8">Mental Health</h2>
                        <p className="text-lg text-gray-600 mb-4">
                            Emphasizing the main purpose of this application, which is to help users to maintain and improve their mental health by providing advice and recommendations based on the results of emotional analysis.
                        </p>
                        <p className="text-lg text-gray-600 mb-8">
                            Using advanced technology to detect and analyze emotions, EmoCare is here as a friend to help relieve anxiety, confusion, and other negative feelings that can affect your mental well-being.
                        </p>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" ref={featuresRef} className="py-16 bg-gray-50">
                    <div className="max-w-5xl mx-auto p-8 w-full text-center">
                        <h2 className="text-4xl font-bold text-purple-700 mb-8">Features</h2>
                        
                        {/* Feature 1: Input Text */}
                        <div className="flex flex-col lg:flex-row items-center mb-16">
                            <div className="lg:w-1/2 text-center lg:text-right mb-8 lg:mb-0">
                                <h3 className="text-xl font-bold text-purple-600 mb-4">Input Text</h3>
                                <p>
                                    Easily input text to analyze emotions, providing insights into the underlying feelings behind any message.
                                </p>
                            </div>
                            <div className="lg:w-1/2 mt-8 lg:mt-0 lg:ml-8">
                                <img
                                    src="image.png" // Replace with the appropriate image
                                    alt="Input Text"
                                    className="max-w-full mx-auto rounded-lg shadow-lg hover:scale-105 transition transform"
                                />
                            </div>
                        </div>


                        {/* Feature 2: Graphic Emotion Prediction and Probabilities */}
                        <div className="flex flex-col-reverse lg:flex-row items-center mb-16">
                            <div className="lg:w-1/2 mt-8 lg:mt-0 lg:mr-8">
                                <img
                                    src="image_graphic.png"
                                    alt="Graphic Emotion Prediction"
                                    className="max-w-full mx-auto rounded-lg shadow-lg hover:scale-105 transition transform"
                                />
                            </div>
                            <div className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
                                <h3 className="text-xl font-bold text-purple-600 mb-4">
                                    Graphic Emotion Prediction and Probabilities
                                </h3>
                                <p>
                                    Visualize emotion probabilities through dynamic graphs, helping you understand the nuances of each prediction with clarity.
                                </p>
                            </div>
                        </div>

                        {/* Feature 3: Predict Emotion */}
                        <div className="flex flex-col lg:flex-row items-center mb-16">
                            <div className="lg:w-1/2 text-center lg:text-right mb-8 lg:mb-0">
                                <h3 className="text-xl font-bold text-purple-600 mb-4">Predict Emotion</h3>
                                <p>
                                    Easily predict the emotion embedded in any text, identifying feelings like happiness, sadness, anger, or fear with precise analysis.
                                </p>
                            </div>
                            <div className="lg:w-1/2 mt-8 lg:mt-0 lg:ml-8">
                                <img
                                    src="image_predict.png"
                                    alt="Predict Emotion"
                                    className="max-w-full mx-auto rounded-lg shadow-lg hover:scale-105 transition transform"
                                />
                            </div>
                        </div>

                        {/* Feature 4: ChatGPT-4 Integration */}
                        <div className="flex flex-col-reverse lg:flex-row items-center mb-16">
                            <div className="lg:w-1/2 mt-8 lg:mt-0 lg:mr-8">
                                <img
                                    src="image_suggest.png" // Update with the appropriate image
                                    alt="ChatGPT-4 Integration"
                                    className="max-w-full mx-auto rounded-lg shadow-lg hover:scale-105 transition transform"
                                />
                            </div>
                            <div className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
                                <h3 className="text-xl font-bold text-purple-600 mb-4">
                                    ChatGPT-4 Integration
                                </h3>
                                <p>
                                    Harness the power of ChatGPT-4 to enhance your experience with intelligent responses, advanced language capabilities, and context-aware interactions.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section id="team" ref={teamRef} className="py-16 bg-white">
                    <div className="max-w-5xl mx-auto p-8 w-full text-center">
                        <h2 className="text-4xl font-bold text-purple-700 mb-8">Meet Our Team</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                            {[
                                {
                                    photo: "foto4.png",
                                    name: "Hasbi Anshari Simbolon",
                                    role: "Team Lead",
                                    school: "Politeknik Ganesha Medan",
                                },
                                {
                                    photo: "foto2.jpg",
                                    name: "Aldona Septiana",
                                    role: "Team Member",
                                    school: "Universitas Amikom Purwokerto",
                                },
                                {
                                    photo: "myphoto.jpg",
                                    name: "Muhamad Saifuddin E. N.",
                                    role: "Team Member",
                                    school: "Universitas Sebelas Maret",
                                },
                                {
                                    photo: "foto1.jpg",
                                    name: "Satriawan Adinugroho",
                                    role: "Team Member",
                                    school: "Universitas Mercu Buana Yogyakarta",
                                },
                                {
                                    photo: "foto3.jpg",
                                    name: "Amin Ridho A.",
                                    role: "Team Member",
                                    school: "Politeknik Negeri Sriwijaya",
                                },
                                {
                                    photo: "foto5.jpg",
                                    name: "Feni Fitriani",
                                    role: "Team Member",
                                    school: "Sekolah Tinggi Teknologi Terpadu Nurul Fikri",
                                },
                                // ... add other members here
                            ].map((member, index) => (
                                <div
                                    key={index}
                                    className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-2"
                                >
                                    <img
                                        src={member.photo}
                                        alt={member.name}
                                        className="w-24 h-24 mx-auto rounded-full object-cover mb-4 hover:scale-110 transition"
                                    />
                                    <h3 className="text-lg font-bold text-purple-700">{member.name}</h3>
                                    <p className="text-gray-600">{member.school}</p>
                                    <p className="text-gray-500">{member.role}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-4 bg-purple-600 text-white">
                    <div className="container mx-auto text-center">
                        <p>&copy; 2024 EmoCare. All rights reserved.</p>
                    </div>
                </footer>
            </div>
    );
}

export default Home;
