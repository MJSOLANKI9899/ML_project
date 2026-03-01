import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const PredictionForm = () => {
    const [formData, setFormData] = useState({
        age: '',
        gender: '1',
        height: '',
        weight: '',
        ap_hi: '',
        ap_lo: '',
        cholesterol: '1',
        gluc: '1',
        smoke: '0',
        alco: '0',
        active: '1'
    });

    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/predict`, formData);
            setResult(response.data);
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Cardio Disease Prediction</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Age */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age (Years)</label>
                    <input type="number" name="age" required value={formData.age} onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
                </div>

                {/* Gender */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition">
                        <option value="1">Female</option>
                        <option value="2">Male</option>
                    </select>
                </div>

                {/* Height */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
                    <input type="number" name="height" required value={formData.height} onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
                </div>

                {/* Weight */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                    <input type="number" name="weight" required value={formData.weight} onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
                </div>

                {/* Systolic BP */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Systolic BP (ap_hi)</label>
                    <input type="number" name="ap_hi" required value={formData.ap_hi} onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
                </div>

                {/* Diastolic BP */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Diastolic BP (ap_lo)</label>
                    <input type="number" name="ap_lo" required value={formData.ap_lo} onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
                </div>

                {/* Cholesterol */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cholesterol</label>
                    <select name="cholesterol" value={formData.cholesterol} onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition">
                        <option value="1">Normal</option>
                        <option value="2">Above Normal</option>
                        <option value="3">Well Above Normal</option>
                    </select>
                </div>

                {/* Glucose */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Glucose</label>
                    <select name="gluc" value={formData.gluc} onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition">
                        <option value="1">Normal</option>
                        <option value="2">Above Normal</option>
                        <option value="3">Well Above Normal</option>
                    </select>
                </div>

                {/* Lifestyle Factors - Checkboxes or Selects? Using Select for consistency with backend (0/1) */}

                {/* Smoking */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Smoking</label>
                    <select name="smoke" value={formData.smoke} onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition">
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                    </select>
                </div>

                {/* Alcohol */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Alcohol Intake</label>
                    <select name="alco" value={formData.alco} onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition">
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                    </select>
                </div>

                {/* Physical Activity */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Physical Activity</label>
                    <select name="active" value={formData.active} onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition">
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                    </select>
                </div>

                <div className="md:col-span-2 mt-4">
                    <button type="submit" disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50">
                        {loading ? 'Processing...' : 'Predict Risk'}
                    </button>
                </div>
            </form>

            {error && (
                <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-lg">
                    {error}
                </div>
            )}

            {result && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-6 p-6 rounded-lg text-center ${result.prediction === 1 ? 'bg-red-50 text-red-800 border border-red-200' : 'bg-green-50 text-green-800 border border-green-200'}`}
                >
                    <h3 className="text-xl font-bold mb-2">
                        {result.prediction === 1 ? 'High Risk Detected' : 'Low Risk Detected'}
                    </h3>
                    <p className="text-lg">
                        Probability of Cardio Disease: <strong>{(result.probability * 100).toFixed(2)}%</strong>
                    </p>
                    <p className="mt-2 text-sm opacity-80">
                        {result.prediction === 1 ? 'Please consult a cardiologist for further examination.' : 'Keep up the healthy lifestyle!'}
                    </p>
                </motion.div>
            )}
        </div>
    );
};

export default PredictionForm;
