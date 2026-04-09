import React from 'react';
import { logError } from '../utils/activityLogger';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Catches React render crashes that would otherwise show a blank screen.
 * Logs the error for troubleshooting and shows a recovery UI.
 */
export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logError('react-crash', error);
    logError('react-crash-info', new Error(errorInfo.componentStack || 'no stack'));
  }

  handleRestart = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          background: '#0B424E',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'sans-serif',
          padding: '2rem',
          textAlign: 'center',
        }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Something went wrong</h1>
          <p style={{ fontSize: '1.5rem', opacity: 0.8, marginBottom: '2rem' }}>
            The application encountered an error. Tap below to restart.
          </p>
          <button
            onClick={this.handleRestart}
            style={{
              background: 'white',
              color: '#0B424E',
              border: 'none',
              borderRadius: '9999px',
              padding: '1.5rem 4rem',
              fontSize: '2rem',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Restart
          </button>
          <p style={{ fontSize: '0.8rem', opacity: 0.4, marginTop: '2rem', maxWidth: '600px' }}>
            Error: {this.state.error?.message}
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
