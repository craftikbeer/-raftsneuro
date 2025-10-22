function Services() {
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef(null);
  const [hoveredIndex, setHoveredIndex] = React.useState(null);
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePos({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const services = [
    {
      title: 'AI-ПОРТРЕТ',
      description: 'Уникальные портреты через AI для соцсетей и профилей',
      icon: 'user',
      price: 'от 2,000 ₽',
      features: [
        '6 уникальных портретов',
        'Высокое качество 1080 и 2К',
        '1-2 правки бесплатно',
        'Готовность: 1-2 дня'
      ]
    },
    {
      title: 'ПЕРЕНОС ЛОГОТИПА',
      description: 'Профессиональный перенос логотипа на любые носители',
      icon: 'copy',
      price: 'от 7,000 ₽',
      features: [
        '7 переносов на предметы',
        'Формат PNG',
        '1-2 правки бесплатно',
        'Готовность: 2-3 дня',
        'Все размеры и форматы'
      ]
    },
    {
      title: 'УПАКОВКА ПРОДУКТА',
      description: 'Дизайн упаковки, который продаёт с полки',
      icon: 'box',
      price: 'от 25,000 ₽',
      features: [
        'Дизайн упаковки',
        '2-3 концепта',
        'AI видео креатив товара',
        'Готовность: 5-7 дней',
        'Логотип + фирменный стиль за доп плату'
      ]
    }
  ];

  return (
    <section 
      id="services" 
      ref={sectionRef} 
      className="min-h-screen py-20 md:py-32 px-4 md:px-8 lg:px-16 flex items-center" 
      data-name="services" 
      data-file="components/Services.js"
    >
      <div className="max-w-7xl mx-auto w-full">
        <h2 
          className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 md:mb-8 text-center tracking-tight uppercase leading-tight px-4"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease-out'
          }}
        >
          ЧТО Я <span className="text-[var(--yellow)]">ДЕЛАЮ</span>
        </h2>
        <p 
          className="text-lg md:text-xl lg:text-2xl text-center mb-12 md:mb-20 font-bold text-gray-300 max-w-3xl mx-auto px-4"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease-out 0.2s'
          }}
        >
          Три услуги. Фиксированные цены. Чёткие сроки.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div 
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="glass-effect p-6 md:p-7 rounded-2xl transition-all duration-500 cursor-pointer group hover:bg-white/10 flex flex-col"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible 
                  ? `translateY(0) perspective(1000px) rotateX(${(mousePos.y - 0.5) * -5}deg) rotateY(${(mousePos.x - 0.5) * 5}deg)` 
                  : 'translateY(50px)',
                transition: hoveredIndex === index 
                  ? 'all 0.1s ease-out' 
                  : `all 0.6s ease-out ${0.3 + index * 0.1}s`,
                boxShadow: hoveredIndex === index ? '0 30px 80px rgba(255,255,255,0.15)' : 'none'
              }}
            >
              <div className="mb-6">
                <div className="w-14 h-14 bg-[var(--yellow)] flex items-center justify-center mb-4"
                  style={{
                    transform: hoveredIndex === index ? 'scale(1.1) rotate(-5deg)' : 'scale(1)',
                    transition: 'transform 0.3s ease'
                  }}
                >
                  <div className={`icon-${service.icon} text-2xl text-black`}></div>
                </div>
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-3 leading-tight">{service.title}</h3>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed">{service.description}</p>
              </div>
              
              <div className="space-y-2 mb-4 flex-1">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <div className="w-4 h-4 bg-[var(--yellow)] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="icon-check text-xs text-black"></div>
                    </div>
                    <span className="text-sm font-medium leading-snug">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-auto pt-4 border-t border-white/10">
                <div className="text-2xl font-black text-[var(--yellow)] mb-3">{service.price}</div>
                <a 
                  href="https://t.me/neurocraftsru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-4 py-2.5 bg-[var(--yellow)] text-black font-black text-sm uppercase tracking-wide hover:bg-white transition-all transform hover:scale-105 border-2 border-black flex items-center justify-center gap-2"
                >
                  <div className="icon-send text-base"></div>
                  ЗАКАЗАТЬ
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}