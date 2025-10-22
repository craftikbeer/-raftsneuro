function ProjectModal({ project, currentIndex, totalProjects, onNavigate, onClose, allProjects }) {
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    setTimeout(() => setIsLoaded(true), 50);

    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-xl overflow-y-auto"
      onClick={handleBackdropClick}
      data-name="project-modal"
      data-file="components/ProjectModal.js"
      style={{
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.4s ease-out'
      }}
    >
      <div 
        className="relative max-w-4xl w-full my-8"
        style={{
          transform: isLoaded ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(20px)',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-14 h-14 md:w-12 md:h-12 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-all shadow-lg group active:scale-95"
          aria-label="Закрыть"
          title="Закрыть (ESC)"
        >
          <div className="icon-x text-2xl md:text-xl text-white group-hover:rotate-90 transition-transform"></div>
        </button>

        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 px-4 py-2 bg-black/70 backdrop-blur-xl border border-white/20 rounded-full">
          <span className="text-xs md:text-sm text-gray-300">ESC или клик вне окна для закрытия</span>
        </div>

        <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-xl md:rounded-3xl overflow-hidden border-2 border-white/10 shadow-[0_0_100px_rgba(255,255,255,0.1)]">
          <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20">
            <span className="text-xs md:text-sm font-bold">{currentIndex + 1} / {totalProjects}</span>
          </div>
          
          {totalProjects > 1 && (
            <>
              <button
                onClick={() => onNavigate('prev')}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all backdrop-blur-xl border border-white/20 group"
                aria-label="Предыдущий проект"
              >
                <div className="icon-chevron-left text-xl text-white group-hover:-translate-x-1 transition-transform"></div>
              </button>
              <button
                onClick={() => onNavigate('next')}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all backdrop-blur-xl border border-white/20 group"
                aria-label="Следующий проект"
              >
                <div className="icon-chevron-right text-xl text-white group-hover:translate-x-1 transition-transform"></div>
              </button>
            </>
          )}

          <div className="relative pt-16 pb-4 px-4 md:px-8">
            <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black/20">
              <img 
                src={project.image} 
                alt={project.title}
                loading="lazy"
                className="w-full object-contain"
                style={{ maxHeight: '67vh' }}
              />
            </div>
          </div>

          <div className="px-4 md:px-8 pb-6 md:pb-8">
            <div className="mb-4">
              <span className="inline-block px-4 py-1.5 bg-[var(--yellow)] text-black text-xs md:text-sm font-black tracking-wider uppercase transform -skew-x-6">{project.category}</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 tracking-tight">
              {project.title}
            </h2>
            {project.comment && (
              <p className="text-base md:text-xl text-[var(--yellow)] font-black mb-3 md:mb-4 leading-relaxed">
                "{project.comment}"
              </p>
            )}
            <p className="text-sm md:text-lg text-gray-300 leading-relaxed mb-4 md:mb-6">
              {project.description}
            </p>
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-black text-white border border-[var(--yellow)] text-xs font-bold uppercase hover:bg-[var(--yellow)] hover:text-black transition-all"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
}