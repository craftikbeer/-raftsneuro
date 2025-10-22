function ProjectModal({ project, currentIndex, totalProjects, onNavigate, onClose, allProjects }) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [imageLoaded, setImageLoaded] = React.useState(false);

  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    setTimeout(() => setIsLoaded(true), 50);
    setTimeout(() => setImageLoaded(true), 150);
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  React.useEffect(() => {
    setImageLoaded(false);
    setTimeout(() => setImageLoaded(true), 50);
  }, [project.id]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95"
      onClick={handleBackdropClick}
      data-name="project-modal"
      data-file="components/ProjectModal.js"
      style={{
        opacity: isLoaded ? 1 : 0,
        backdropFilter: isLoaded ? 'blur(20px)' : 'blur(0px)',
        transition: 'all 0.5s ease-out'
      }}
    >
      <div 
        className="relative max-w-6xl w-full"
        style={{
          transform: isLoaded ? 'scale(1) translateY(0) rotate(0deg)' : 'scale(0.8) translateY(40px) rotate(-3deg)',
          transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      >
        <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl overflow-hidden border-4 border-white/10 shadow-[0_0_100px_rgba(255,255,255,0.1)]">
          <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white/5 to-transparent"></div>
          
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs text-gray-500 font-mono">ACTIVE</span>
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-red-500/20 hover:bg-red-500/30 flex items-center justify-center transition-all group border border-red-500/30"
          >
            <div className="icon-x text-lg md:text-xl text-red-400 group-hover:rotate-90 transition-transform"></div>
          </button>
          
          <div className="absolute top-6 left-6 z-20 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20">
            <span className="text-sm font-bold">{currentIndex + 1} / {totalProjects}</span>
          </div>
          
          {totalProjects > 1 && (
            <>
              <button
                onClick={() => onNavigate('prev')}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all backdrop-blur-xl border border-white/20 group"
              >
                <div className="icon-chevron-left text-2xl text-white group-hover:-translate-x-1 transition-transform"></div>
              </button>
              <button
                onClick={() => onNavigate('next')}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all backdrop-blur-xl border border-white/20 group"
              >
                <div className="icon-chevron-right text-2xl text-white group-hover:translate-x-1 transition-transform"></div>
              </button>
            </>
          )}

          <div className="relative mt-12 md:mt-16 mb-6 md:mb-8 px-4 md:px-8">
            <div 
              className="relative rounded-2xl overflow-hidden border-2 border-white/10"
              style={{
                boxShadow: imageLoaded 
                  ? 'inset 0 0 60px rgba(255,255,255,0.03), 0 0 80px rgba(255,214,0,0.2)' 
                  : 'inset 0 0 60px rgba(255,255,255,0.03)',
                transition: 'box-shadow 0.8s ease-out'
              }}
            >
              <div 
                className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"
                style={{
                  opacity: imageLoaded ? 1 : 0,
                  transition: 'opacity 0.6s ease-out 0.3s'
                }}
              ></div>
              <img 
                src={project.image} 
                alt={project.title}
                loading="lazy"
                className="w-full h-[500px] object-cover"
                style={{
                  transform: imageLoaded ? 'scale(1)' : 'scale(1.15)',
                  filter: imageLoaded ? 'brightness(1)' : 'brightness(0.3)',
                  transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              />
              <div 
                className="absolute inset-0 pointer-events-none" 
                style={{
                  background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, transparent 2px, transparent 4px)',
                  animation: imageLoaded ? 'scan 8s linear infinite' : 'none',
                  opacity: imageLoaded ? 1 : 0,
                  transition: 'opacity 0.5s ease-out 0.5s'
                }}
              ></div>
            </div>
          </div>

          <div className="px-6 md:px-12 pb-8 md:pb-12">
            <div 
              className="mb-4 md:mb-6"
              style={{
                opacity: imageLoaded ? 1 : 0,
                transform: imageLoaded ? 'translateX(0)' : 'translateX(-20px)',
                transition: 'all 0.5s ease-out 0.6s'
              }}
            >
              <span className="inline-block px-4 md:px-5 py-1.5 md:py-2 bg-[var(--yellow)] text-black text-sm md:text-base font-black tracking-wider uppercase transform -skew-x-6">{project.category}</span>
            </div>
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 tracking-tight"
              style={{
                opacity: imageLoaded ? 1 : 0,
                transform: imageLoaded ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.5s ease-out 0.7s'
              }}
            >
              {project.title}
            </h2>
            {project.comment && (
              <p 
                className="text-lg md:text-xl lg:text-2xl text-[var(--yellow)] font-black mb-4 md:mb-6 leading-relaxed"
                style={{
                  opacity: imageLoaded ? 1 : 0,
                  transform: imageLoaded ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.5s ease-out 0.8s'
                }}
              >
                "{project.comment}"
              </p>
            )}
            <p 
              className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed mb-6 md:mb-8"
              style={{
                opacity: imageLoaded ? 1 : 0,
                transform: imageLoaded ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.5s ease-out 0.9s'
              }}
            >
              {project.description}
            </p>
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 md:gap-3">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 md:px-4 py-1.5 md:py-2 bg-black text-white border-2 border-[var(--yellow)] text-xs md:text-sm font-bold uppercase hover:bg-[var(--yellow)] hover:text-black transition-all"
                    style={{
                      opacity: imageLoaded ? 1 : 0,
                      transform: imageLoaded ? 'scale(1)' : 'scale(0.8)',
                      transition: `all 0.4s ease-out ${1 + index * 0.05}s`
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-gradient-to-b from-gray-800/50 to-transparent rounded-b-3xl blur-xl"></div>
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