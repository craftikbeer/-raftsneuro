function Hero3D() {
  const canvasRef = React.useRef(null);
  const [imagesLoaded, setImagesLoaded] = React.useState(false);
  const [currentFrame, setCurrentFrame] = React.useState(0);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const frameCount = 30; // Уменьшено с 60 до 30
    const images = [];
    const imageSeq = { frame: 0 };

    const imageUrls = [
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&q=75&fm=webp',
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=75&fm=webp',
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=75&fm=webp',
      'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1200&q=75&fm=webp'
    ];

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = imageUrls[Math.floor(i / (frameCount / imageUrls.length)) % imageUrls.length];
      images.push(img);
    }

    images[0].onload = () => {
      setImagesLoaded(true);
      render();
    };

    function render() {
      const img = images[Math.floor(imageSeq.frame)];
      if (img && img.complete) {
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width - img.width * scale) / 2;
        const y = (canvas.height - img.height * scale) / 2;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.filter = `brightness(${0.4 + (imageSeq.frame / frameCount) * 0.6})`;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      }
    }

    // Intersection Observer для анимации при скролле
    let scrollProgress = 0;
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const heroHeight = canvas.offsetHeight * 1.2;
      scrollProgress = Math.min(window.scrollY / heroHeight, 1);
      
      imageSeq.frame = Math.min(frameCount - 1, scrollProgress * (frameCount - 1));
      setCurrentFrame(imageSeq.frame);
      render();
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToGallery = () => {
    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      className="relative h-screen w-full overflow-hidden" 
      data-name="hero" 
      data-file="components/Hero3D.js"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: imagesLoaded ? 1 : 0, transition: 'opacity 1s' }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black pointer-events-none" />

      <div className="absolute inset-0 flex items-center justify-center text-center px-4 z-10">
        <div
          style={{
            opacity: imagesLoaded ? 1 : 0,
            transform: imagesLoaded ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <div className="mb-6 md:mb-6">
            <span className="inline-block px-5 md:px-6 py-2.5 md:py-2 bg-[var(--yellow)] text-black font-black text-sm md:text-sm uppercase tracking-wide">
              Фрилансер • AI-Дизайн • Без воды
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 md:mb-8 tracking-tight leading-[1.1] uppercase max-w-6xl px-2">
            <span className="text-white block mb-2">AI-ПОРТРЕТЫ</span>
            <span className="text-white block mb-2">ПЕРЕНОС ЛОГОТИПА</span>
            <span className="text-[var(--yellow)] bg-black px-4 md:px-6 py-2 inline-block transform -skew-x-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">УПАКОВКА</span>
          </h1>

          <p className="text-base md:text-lg lg:text-xl mb-8 md:mb-10 font-bold text-gray-300 max-w-2xl mx-auto leading-relaxed px-4">
            От 2,000₽ до 25,000₽<br className="hidden sm:block"/>
            Готовность: 1-7 дней<br/>
            <span className="text-[var(--yellow)]">1 правка бесплатно • Возврат 50% если не устроит</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-5 md:gap-6 justify-center items-center px-4">
            <button 
              onClick={scrollToForm}
              className="w-full sm:w-auto px-14 md:px-20 py-6 md:py-6 bg-[var(--yellow)] text-black font-black text-lg md:text-xl uppercase tracking-wide hover:bg-white transition-all transform hover:scale-105 hover:shadow-[0_0_60px_rgba(255,214,0,0.6)] border-4 border-black"
            >
              ЗАКАЗАТЬ →
            </button>
            <button 
              onClick={scrollToGallery}
              className="w-full sm:w-auto px-14 md:px-20 py-6 md:py-6 bg-black text-white border-4 border-[var(--yellow)] font-black text-lg md:text-xl uppercase tracking-wide hover:bg-[var(--yellow)] hover:text-black transition-all transform hover:scale-105"
            >
              ПОРТФОЛИО
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}