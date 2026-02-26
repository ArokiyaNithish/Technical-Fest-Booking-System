import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import BookingPage from './pages/BookingPage';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', color: 'white', background: 'black', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h2 style={{ fontFamily: 'Anton', fontSize: '3rem', color: '#d32f2f' }}>SYSTEM ERROR</h2>
          <p style={{ margin: '1rem 0' }}>The application encountered a critical crash.</p>
          <details style={{ whiteSpace: 'pre-wrap', marginTop: '1rem', color: '#ff4444', background: '#111', padding: '1rem', border: '1px solid #333', maxWidth: '80%' }}>
            {this.state.error && this.state.error.toString()}
          </details>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button onClick={() => window.location.reload()} style={{ width: 'auto', padding: '1rem 2rem' }} className="btn-primary">Reload Page</button>
            <button onClick={() => { localStorage.clear(); window.location.reload(); }} style={{ width: 'auto', padding: '1rem 2rem', background: '#333' }} className="btn-secondary">Reset App Cache</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="app-main">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/events" element={<Events />} />
              <Route path="/book/:id" element={<BookingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
