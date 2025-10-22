function Benefits() {
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef(null);

  React.useEffect(() => {
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
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const benefits = [
    {
      icon: 'shield-check',
      title: 'Гарантия результата',
      description: '1 бесплатная правка включена. Если результат совсем не тот — вернём 50% стоимости.'
    },
    {
      icon: 'zap',
      title: 'Скорость как оружие',
      description: 'AI-портрет за 1-2 дня. Перенос логотипа за 2-3 дня. Упаковка за неделю.'
    },
    {
      icon: 'target',
      title: 'Работаю напрямую',
      description: 'Без посредников и менеджеров. Связь со мной напрямую в Telegram.'
    }
  ];

  return (
    <section 
      id="benefits" 
      ref={sectionRef}
      className="py-20 md:py-32 px-4 md:px-8 lg:px-16" 
      data-name="benefits" 
      data-file="components/Benefits.js"
    >
      <div className="max-w-7xl mx-auto">
        <h2 
          className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 md:mb-8 text-center tracking-tight uppercase leading-tight px-4"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease-out'
          }}
        >
          ПОЧЕМУ Я, А НЕ <span className="text-[var(--yellow)]">СТУДИЯ</span>
        </h2>
        <p 
          className="text-lg md:text-xl lg:text-2xl text-center mb-12 md:mb-20 font-bold text-gray-300 max-w-3xl mx-auto px-4"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease-out 0.2s'
          }}
        >
          Фрилансер = меньше цена, больше скорость, прямая связь
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="glass-effect p-8 md:p-10 rounded-2xl text-center"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                transition: `all 0.6s ease-out ${0.3 + index * 0.1}s`
              }}
            >
              <div className="w-16 h-16 bg-[var(--yellow)] mx-auto mb-6 flex items-center justify-center">
                <div className={`icon-${benefit.icon} text-3xl text-black`}></div>
              </div>
              <h3 className="text-2xl md:text-3xl font-black uppercase mb-4">{benefit.title}</h3>
              <p className="text-base md:text-lg text-gray-300 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}