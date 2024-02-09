import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import List from './front/List';
import MessagingUI from './front/Message';
import CarPage from './front/CarPage';
import LoginForm from './front/LoginForm';
import { loginUser } from './front/authService'; // Ensure this path is correct
import { AuthProvider } from './front/context/AuthContext';
import ProtectedRoute from './front/ProtectedRoute';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './front/context/AuthContext'; // Add this import

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<List />} />
          {/* Use a route with an element to properly handle navigation */}
          <Route path="login" element={<LoginRoute />} />
          <Route path="message" element={<ProtectedRoute><MessagingUI /></ProtectedRoute>} />
          <Route path="carpage" element={<ProtectedRoute><CarPage /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

// Define a separate component for the login route to use useNavigate
function LoginRoute() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Destructure the login function from the context

  const handleLogin = async (username, password) => {
    try {
      const response = await loginUser({ username, password });
      if (response) {
        login(response); // Use the login function from AuthContext
        console.log("Login successful", response);
        navigate('/'); // Redirect on success
      } else {
        console.error("Login failed", response);
      }
    } catch (error) {
      console.error("Login error", error);
    }
  };

  return <LoginForm onLogin={handleLogin} />;
}

export default App;
