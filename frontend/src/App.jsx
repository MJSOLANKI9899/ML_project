import React from 'react';
import PredictionForm from './components/PredictionForm';

function App() {
    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <header className="max-w-4xl mx-auto text-center mb-10">
                <h1 className="text-4xl font-extrabold text-blue-900 tracking-tight">
                    Cardio Health AI
                </h1>
                <p className="text-gray-600 mt-2 text-lg">
                    Advanced Machine Learning for Heart Disease Risk Assessment
                </p>
            </header>

            <main>
                <PredictionForm />
            </main>

            <footer className="max-w-4xl mx-auto text-center mt-12 text-gray-500 text-sm">
                <p>&copy; {new Date().getFullYear()} Cardio Health AI Project. Powered by Random Forest.</p>
            </footer>
        </div>
    );
}

export default App;
