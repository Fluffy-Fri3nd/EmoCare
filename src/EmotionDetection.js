import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import { Bar } from 'react-chartjs-2'; // Import Bar chart from react-chartjs-2
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary components of Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function EmotionDetection() {
    const [text, setText] = useState('');
    const [predictions, setPredictions] = useState([]);
    const [probabilities, setProbabilities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState({});
    const [loadingSuggestions, setLoadingSuggestions] = useState({});
    const [bgPosition, setBgPosition] = useState({ x: 50, y: 50 });

    const handleMouseMove = (e) => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        setBgPosition({ x, y });
    };

    const emotionLabels = ['🤗 Caring', '😍 Love', '😄 Gratitude', '😭 Sadness', '😨 Fear', '😡 Anger'];

    // Emoji mapping for emotions
    const emotionEmojis = {
        'caring': (
            <picture>
                <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f917/512.webp" type="image/webp" />
                <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f917/512.gif" alt="🤗" width="32" height="32" />
            </picture>
        ),
        'love': (
            <picture>
                <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f60d/512.webp" type="image/webp" />
                <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f60d/512.gif" alt="😍" width="32" height="32" />
            </picture>
        ),
        'gratitude': (
            <picture>
                <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f604/512.webp" type="image/webp" />
                <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f604/512.gif" alt="😄" width="32" height="32" />
            </picture>
        ),
        'sadness': (
            <picture>
                <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f62d/512.webp" type="image/webp" />
                <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f62d/512.gif" alt="😭" width="32" height="32" />
            </picture>
        ),
        'fear': (
            <picture>
                <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f628/512.webp" type="image/webp" />
                <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f628/512.gif" alt="😨" width="32" height="32" />
            </picture>
        ),
        'anger': (
            <picture>
                <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f621/512.webp" type="image/webp" />
                <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f621/512.gif" alt="😡" width="32" height="32" />
            </picture>
        )
    };

    const exampleText = "I feel so grateful and happy today because of everything going well in my life!"; // Example input

    const predictEmotions = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://aldonast1907-emocare.hf.space/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch predictions from the server');
            }

            const data = await response.json();
            if (data && data.predicted_emotions) {
                setPredictions(data.predicted_emotions);
                // Convert probabilities to percentages
                setProbabilities(data.probabilities[0].map(prob => (prob * 100).toFixed(2))); // Convert to percentage and fix to 2 decimals
            } else {
                setPredictions([]);
                setProbabilities([]);
            }
        } catch (error) {
            console.error('Error:', error);
            alert(`Error: ${error.message}`);
            setPredictions([]);
            setProbabilities([]);
        }
        setLoading(false);
    };

    const getSuggestions = async (emotion) => {
        setLoadingSuggestions((prev) => ({ ...prev, [emotion]: true })); // Set loading true for current emotion
        try {
            const response = await fetch(`https://aldonast1907-emocare.hf.space/suggestions?emotion=${emotion}&text=${encodeURIComponent(text)}`);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Error response: ${errorText}`);
                throw new Error(`Failed to fetch suggestions for ${emotion}`);
            }
            
            const data = await response.json();
            setSuggestions((prev) => ({ ...prev, [emotion]: data.suggestions }));
        } catch (error) {
            console.error('Error:', error);
            alert(`Error: ${error.message}`);
        } finally {
            setLoadingSuggestions((prev) => ({ ...prev, [emotion]: false })); // Reset loading status when done
        }
    };

    const handleTextChange = (e) => {
        const value = e.target.value;
        if (value.length <= 300) {
            setText(value);
        }
    };

    const handleExampleInput = () => {
        setText(exampleText); // Set example text to textarea
    };

    // Prepare data for the bar chart
    const chartData = {
        labels: emotionLabels, // Emojis included in labels
        datasets: [
            {
                label: 'Probabilities',
                data: probabilities, // Now probabilities are in percentage
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Chart options to display percentage on the y-axis
    const chartOptions = {
        scales: {
            y: {
                ticks: {
                    callback: function (value) {
                        return value + '%'; // Format ticks as percentage
                    },
                    beginAtZero: true, // Ensure the y-axis starts from 0
                    max: 100, // Ensure the max value is 100% 
                },
            },
        },
    };

    return (
        <div
            onMouseMove={handleMouseMove}
            className="min-h-screen flex flex-col items-center py-8 px-4"
            style={{
                background: `radial-gradient(circle at ${bgPosition.x}% ${bgPosition.y}%, #a8e6cf, #dcedc1, #ffd3b6)`,
                transition: 'background 0.1s',
            }}
        >
        {/* Navbar */}
        <header className="fixed top-0 left-0 w-full bg-purple-600 shadow-md text-white z-50">
            <div className="container mx-auto flex justify-between items-center py-4 px-20">
                <Link to="/" className="text-2xl font-bold">
                    EmoCare
                </Link>
            </div>
        </header>
        
        <div className="bg-white shadow-2xl rounded-lg p-8 max-w-5xl w-full mt-24">
                <h1 className="text-5xl font-extrabold text-purple-800 text-center mb-8">
                    Emotion Detection
                </h1>
                <textarea
                    rows="4"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all resize-none"
                    value={text}
                    onChange={handleTextChange}
                    placeholder="Type your text here... (Max 300 characters)"
                />
                <div className="text-right text-sm text-gray-500 mt-1">
                    {text.length}/300
                </div>
                <div className="flex gap-4 mt-4">
                    <button
                        onClick={handleExampleInput}
                        className="w-full py-3 rounded-lg text-lg font-semibold text-white bg-yellow-500 hover:bg-yellow-600 transition-all"
                    >
                        Example Input
                    </button>
                    
                    <button
                        onClick={predictEmotions}
                        disabled={loading}
                        className={`w-full py-3 rounded-lg text-lg font-semibold text-white transition-all flex justify-center items-center ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'}`}
                    >
                        {loading ? (
                            <>
                                <picture className="mb-3">
                                    <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f407/512.webp" type="image/webp" />
                                    <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f407/512.gif" alt="🐇" width="32" height="32" />
                                </picture>
                                <span>Loading...</span>
                            </>
                        ) : (
                            'Predict Emotions'
                        )}
                    </button>


                </div>

                <div className="mt-6">
                    {predictions.length > 0 ? (
                        <>
                            <div className="bg-white p-6 rounded-lg shadow-xl mb-6">
                                <h3 className="text-2xl font-semibold text-purple-800 mb-4">Emotion Prediction Probabilities:</h3>
                                {loading ? (
                                    <div className="w-full py-3 rounded-lg text-lg font-semibold text-white transition-all flex justify-center items-center">
                                        <picture className="mb-3">
                                            <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f426/512.webp" type="image/webp" />
                                            <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f426/512.gif" alt="🐦 Loading..." width="32" height="32" />
                                        </picture>
                                        <span className='text-blue-400'>Loading...</span>
                                    </div>
                                ) : (
                                    <Bar data={chartData} options={chartOptions} />
                                )}

                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-xl mb-6">
                                <h3 className="text-2xl font-semibold text-purple-800 mb-4">Predicted Emotions:</h3>
                                {loading ? (
                                    <div className="w-full py-3 rounded-lg text-lg font-semibold text-white transition-all flex justify-center items-center">
                                        <picture className="mb-3">
                                            <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f426/512.webp" type="image/webp" />
                                            <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f426/512.gif" alt="🐦 Loading..." width="32" height="32" />
                                        </picture>
                                        <span className='text-blue-400'>Loading...</span>
                                    </div>
                                ) : (
                                    <ul className="space-y-4">
                                        {predictions.map((emotion) => (
                                            <li
                                                key={emotion}
                                                className={`bg-white p-4 rounded-md shadow-md border-l-4 border-purple-500 transition-all duration-500 ease-in-out 
                                                    ${emotion === 'caring' ? 'bg-green-100' : 
                                                    emotion === 'anger' ? 'bg-red-100' :
                                                    emotion === 'love' ? 'bg-pink-100' : 
                                                    emotion === 'gratitude' ? 'bg-yellow-100' : 
                                                    emotion === 'sadness' ? 'bg-blue-100' : 
                                                    emotion === 'fear' ? 'bg-indigo-100' : ''
                                                }`}
                                            >
                                                <div className="flex items-center text-lg font-medium text-gray-800 mb-2">
                                                    <span className="mr-2">{emotionEmojis[emotion]}</span> 
                                                    <span className="capitalize">{emotion}</span>
                                                </div>
                                                <p className="text-sm text-gray-600 mb-2">
                                                    You might be feeling <strong className="capitalize">{emotion}</strong>, do you need suggestions?
                                                </p>
                                                <button
                                                    onClick={() => getSuggestions(emotion)}
                                                    disabled={loadingSuggestions[emotion]} // Disable button if loading
                                                    className={`w-full py-3 px-6 rounded-lg text-sm font-medium text-white bg-orange-400 hover:bg-orange-400 transition-all transform active:scale-95 flex justify-center items-center shadow-lg hover:shadow-xl ${loadingSuggestions[emotion] ? 'bg-orange-400 cursor-not-allowed' : 'bg-gradient-to-r from-orange-400 to-orange-400 hover:from-orange-500 hover:to-orange-500'}`}
                                                >
                                                    {loadingSuggestions[emotion] ? (
                                                        <>
                                                            <picture className="mb-3">
                                                                <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f415/512.webp" type="image/webp" />
                                                                <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f415/512.gif" alt="🐕" width="32" height="32" />
                                                            </picture>
                                                            <span>Loading...</span>
                                                        </>
                                                    ) : (
                                                        'Get Suggestions'
                                                    )}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {/* Suggestions Div - Separated from the Predicted Emotions */}
                            {Object.keys(suggestions).length > 0 && (
                                <div className="bg-white p-6 rounded-lg shadow-xl">
                                    <h3 className="text-2xl font-semibold text-purple-800 mb-4">Suggestions:</h3>
                                    <ul className="space-y-4">
                                        {predictions.map((emotion) => (
                                            <li key={emotion} className="bg-white p-4 rounded-md shadow-md border-l-4 border-purple-500">
                                                <div className="text-gray-600 text-sm">
                                                    {suggestions[emotion] && Array.isArray(suggestions[emotion]) && (
                                                        <div className="flex flex-col space-y-3">
                                                            {suggestions[emotion].map((suggestion, idx) => (
                                                                <li key={idx}>{suggestion}</li>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </>
                    ) : (
                        <h3 className="text-center text-lg text-gray-500 mt-4">
                            No emotions detected.
                        </h3>
                    )}
                </div>
            </div>
        </div>
    );
}

export default EmotionDetection;
