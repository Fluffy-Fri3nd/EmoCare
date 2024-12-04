import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Change Switch to Routes
import Home from './Home';
import EmotionDetection from './EmotionDetection'; // Halaman kedua yang Anda buat

function App() {
    return (
        <Router>
            <Routes> {/* Changed from <Switch> */}
                <Route path="/" element={<Home />} /> {/* Changed from component to element */}
                <Route path="/emotion-detection" element={<EmotionDetection />} /> {/* Same change */}
            </Routes> {/* Changed from </Switch> */}
        </Router>
    );
}

export default App;
