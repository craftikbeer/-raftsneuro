function BeforeAfterSection() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [sliderPosition, setSliderPosition] = React.useState(50);
  const [isDragging, setIsDragging] = React.useState(false);
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const containerRef = React.useRef(null);
  const sectionRef = React.useRef(null);

  const projects = [
    {
      title: 'Редизайн сайта для стартапа',
      before: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=75&fm=webp',
      after: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=75&fm=webp',
      result: 'Конверсия +220%, bounce rate -65%'
    },
    {
      title: 'Ребрендинг технологической компании',
      before: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&q=75&fm=webp',
      after: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1200&q=75&fm=webp',
      result: 'Узнаваемость бренда +180%'
    },
    {
      title: 'Редизайн мобильного приложения',
      before: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=75&fm=webp',
      after: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=75&fm=webp',
      result: 'Время в приложении +350%'
    }
  ];

  React.useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight || 1;
        const progress = Math.max(0, Math.min(1, (viewportHeight - rect.top) / viewportHeight));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleMouseMove = (e) => {
    if (isDragging) handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (isDragging && e.touches[0]) handleMove(e.touches[0].clientX);
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', () => setIsDragging(false));
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', () => setIsDragging(false));
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', () => setIsDragging(false));
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', () => setIsDragging(false));
    };
  }, [isDragging]);

  const currentProject = projects[activeIndex];

  return (
    <section 
      id="before-after" 
      ref={sectionRef}
      className="min-h-screen py-20 md:py-32 px-4 md:px-8 lg:px-16 flex items-center" 
      data-name="before-after-section" 
      data-file="components/BeforeAfterSection.js"
    >
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 md:mb-8 text-center tracking-tight uppercase leading-tight px-4">
          ДО И <span className="text-[var(--yellow)]">ПОСЛЕ</span>
        </h2>
        <p className="text-lg md:text-xl lg:text-2xl text-center mb-10 md:mb-16 font-bold max-w-3xl mx-auto px-4">
          Смотрите, как меняется дизайн
        </p>

        <div 
          className="glass-effect rounded-3xl overflow-hidden border-2 border-[var(--yellow)]"
          style={{
            opacity: Math.max(0.3, Math.min(1, scrollProgress)),
            transform: `translateY(${(1 - scrollProgress) * 50}px)`
          }}
        >
          <div
            ref={containerRef}
            className="relative h-96 md:h-[500px] cursor-ew-resize select-none"
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
          >
            <img
              src={currentProject.after}
              alt="После"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img
                src={currentProject.before}
                alt="До"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white cursor-ew-resize shadow-[0_0_20px_rgba(255,255,255,0.5)]"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-transform hover:scale-110">
                <div className="icon-chevrons-left-right text-2xl text-black"></div>
              </div>
            </div>

            <div className="absolute top-4 md:top-8 left-4 md:left-8 px-3 md:px-5 py-1.5 md:py-2 bg-black border-2 border-white/30 text-xs md:text-sm font-black uppercase">
              ДО
            </div>
            <div className="absolute top-4 md:top-8 right-4 md:right-8 px-3 md:px-5 py-1.5 md:py-2 bg-[var(--yellow)] text-black text-xs md:text-sm font-black uppercase border-2 border-black">
              ПОСЛЕ
            </div>
          </div>

          <div className="p-6 md:p-8 bg-gradient-to-r from-black to-transparent">
            <h3 className="text-2xl md:text-3xl font-black mb-3 uppercase">{currentProject.title}</h3>
            <p className="text-lg md:text-xl text-[var(--yellow)] font-black mb-6">{currentProject.result}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {projects.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === activeIndex ? 'bg-[var(--yellow)] w-8' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
              
              <a 
                href="before-after.html"
                className="px-6 py-3 bg-[var(--yellow)] text-black font-black text-sm uppercase hover:bg-white transition-all border-2 border-black"
              >
                ВСЕ КЕЙСЫ →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}