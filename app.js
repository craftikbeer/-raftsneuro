class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-black">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Что-то пошло не так</h1>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-all"
            >
              Перезагрузить
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  try {
    return (
      <div style={{ animation: 'fadeIn 1s ease-in forwards' }} data-name="app" data-file="app.js">
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}</style>
        <ParallaxElements />
        <ScrollIndicator />
        <Sidebar />
        <PromptsPopup />
        <div className="md:ml-20 relative z-10">
          <Hero3D />
          <Services />
          <Benefits />
          <Gallery />
          <BeforeAfterSection />
          <ContactForm />
          <Footer />
        </div>
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);