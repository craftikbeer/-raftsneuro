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

function BeforeAfterApp() {
  const [loaded, setLoaded] = React.useState(false);
  const [scrollY, setScrollY] = React.useState(0);
  const [projects, setProjects] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => setLoaded(true), 300);
    loadProjects();
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loadProjects = async () => {
    try {
      const stored = localStorage.getItem('neurocrafts_beforeafter');
      if (stored) {
        const data = JSON.parse(stored);
        setProjects(data.projects || []);
        setLoading(false);
        return;
      }
      
      // Fallback проекты
      const fallbackProjects = [
        {
          id: "1",
          title: "Редизайн сайта для стартапа",
          category: "Web Design",
          before: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=75&fm=webp",
          after: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=75&fm=webp",
          description: "Превратили устаревший сайт в современную платформу. Конверсия выросла на 220%, bounce rate упал на 65%."
        }
      ];
      
      setProjects(fallbackProjects);
      setLoading(false);
      
      try {
        const response = await fetch('data/before-after.json');
        if (response.ok) {
          const data = await response.json();
          setProjects(data.projects || fallbackProjects);
          localStorage.setItem('neurocrafts_beforeafter', JSON.stringify(data));
        } else {
          const fallbackData = { lastUpdated: new Date().toISOString(), projects: fallbackProjects };
          localStorage.setItem('neurocrafts_beforeafter', JSON.stringify(fallbackData));
        }
      } catch (fetchError) {
        console.log('Не удалось загрузить из файла, используем fallback данные');
        const fallbackData = { lastUpdated: new Date().toISOString(), projects: fallbackProjects };
        localStorage.setItem('neurocrafts_beforeafter', JSON.stringify(fallbackData));
      }
    } catch (error) {
      console.error('Ошибка загрузки проектов:', error);
      setProjects([]);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" data-name="before-after-app" data-file="before-after-app.js">
      <Sidebar />
      
      <div className="md:ml-20">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
              transform: `scale(${1 + scrollY * 0.0003})`
            }}
          />
        </div>

        <div 
          className="relative z-10 text-center px-4 max-w-5xl mx-auto"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black mb-8 md:mb-10 tracking-tight leading-[1.1] uppercase max-w-6xl">
            <span className="text-white block mb-2">ДО И</span>
            <span className="text-[var(--yellow)] bg-black px-6 py-2 inline-block transform -skew-x-6">ПОСЛЕ</span>
          </h1>
          <p className="text-xl md:text-3xl lg:text-4xl mb-6 md:mb-8 font-black uppercase tracking-tight">
            Примеры <span className="text-[var(--yellow)]">редизайна</span>
          </p>
          <p className="text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed px-4">
            Двигайте слайдер, чтобы увидеть трансформацию
          </p>
        </div>

        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="icon-chevron-down text-2xl text-gray-400"></div>
        </div>
      </section>

        {/* Projects Section */}
        <section className="py-20 md:py-32 px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto space-y-32">
            {loading ? (
              <div className="text-center py-20">
                <p className="text-gray-400">Загрузка проектов...</p>
              </div>
            ) : projects.length === 0 ? (
              <div className="glass-effect rounded-2xl p-12 text-center">
                <p className="text-gray-400">Пока нет проектов</p>
              </div>
            ) : (
              projects.map((project, index) => (
                <BeforeAfterSlider 
                  key={project.id} 
                  project={project} 
                  index={index} 
                />
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <BeforeAfterApp />
  </ErrorBoundary>
);