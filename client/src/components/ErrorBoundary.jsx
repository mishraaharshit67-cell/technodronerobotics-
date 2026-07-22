import { Component } from 'react';
import { Link } from 'react-router-dom';
import { FiAlertTriangle, FiRefreshCw, FiHome } from 'react-icons/fi';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
              <FiAlertTriangle size={28} className="text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-navy mb-2">Something went wrong</h1>
            <p className="text-gray-500 text-sm mb-6">An unexpected error occurred. Our team has been notified.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => window.location.reload()} className="btn-outline inline-flex items-center gap-2 text-sm">
                <FiRefreshCw size={14} /> Reload
              </button>
              <Link to="/" className="btn-primary inline-flex items-center gap-2 text-sm">
                <FiHome size={14} /> Home
              </Link>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
