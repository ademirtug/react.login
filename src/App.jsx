import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SplitLogin from './components/Login'; // Assuming SplitLogin.jsx is in the same directory
import AuthProvider, { useAuth } from './providers/AuthProvider'; // Assuming AuthProvider.jsx is in the same directory
import './i18n';
import { useTranslation } from 'react-i18next'; // Add this import


// A simple home page component to show once a user is logged in
const HomePage = () => {
    const { user, logout } = useAuth();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
                <h1 className="text-3xl font-bold mb-4 text-gray-800">Welcome, {user?.email}!</h1>
                <p className="text-gray-600 mb-6">You are logged in with the role: <span className="font-semibold">{user?.role}</span></p>
                <button
                    onClick={logout}
                    className="w-full py-3 px-4 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-colors"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

// A wrapper component to protect routes.
// It redirects to the login page if the user is not authenticated.
const ProtectedWrapper = ({ children }) => {
    const { user, loading } = useAuth();

    // Wait for the auth state to be ready
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="text-xl text-gray-500">Loading authentication state...</div>
            </div>
        );
    }

    // Redirect to login if no user is found
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Render the protected content
    return children;
};

// The main App component where routing is set up
function App() {
    const { i18n } = useTranslation();

    i18n.changeLanguage("tr");
    return (
        // The AuthProvider makes the auth context available to all child components
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Public route for the login page */}
                    <Route path="/login" element={<SplitLogin />} />

                    {/* Protected route for the home page */}
                    <Route path="/" element={
                        <ProtectedWrapper>
                            <HomePage />
                        </ProtectedWrapper>
                    } />

                    {/* Redirect any other path to the home page if logged in, or login if not */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;