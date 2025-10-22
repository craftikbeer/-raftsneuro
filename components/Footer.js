function Footer() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: 'github', url: '#', label: 'GitHub' },
    { icon: 'twitter', url: '#', label: 'Twitter' },
    { icon: 'linkedin', url: '#', label: 'LinkedIn' },
    { icon: 'instagram', url: '#', label: 'Instagram' }
  ];

  return (
    <footer className="relative py-16 md:py-20 px-4 md:px-8 lg:px-16 border-t border-white border-opacity-10 overflow-hidden" data-name="footer" data-file="components/Footer.js">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-black opacity-50"></div>
      
      <div className="relative max-w-7xl mx-auto">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-3xl md:text-4xl font-black mb-4 uppercase leading-tight">
              <span className="text-[var(--yellow)]">NEURO</span>CRAFTS
            </h3>
            <p className="text-gray-300 leading-relaxed mb-6 font-medium text-base md:text-lg">
              AI-дизайн и нейроразработка<br/>
              премиум-уровня с измеримыми результатами.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.icon}
                  href={social.url}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white bg-opacity-5 hover:bg-opacity-10 flex items-center justify-center transition-all transform hover:scale-110"
                >
                  <div className={`icon-${social.icon} text-lg`}></div>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-base md:text-lg font-semibold mb-4 uppercase tracking-wide">Услуги</h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => scrollToSection('services')} className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">
                  AI-Дизайн
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services')} className="text-gray-400 hover:text-white transition-colors">
                  Creative Tech
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services')} className="text-gray-400 hover:text-white transition-colors">
                  Нейроразработка
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-base md:text-lg font-semibold mb-4 uppercase tracking-wide">Компания</h4>
            <ul className="space-y-3">
              <li>
                <button onClick={() => scrollToSection('gallery')} className="text-gray-400 hover:text-white transition-colors">
                  Портфолио
                </button>
              </li>
              <li>
                <a href="admin.html" className="text-gray-400 hover:text-white transition-colors">
                  Админ-панель
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-base md:text-lg font-semibold mb-4 uppercase tracking-wide">Контакты</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:craftsneuro@gmail.com" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <div className="icon-mail text-base"></div>
                  craftsneuro@gmail.com
                </a>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact-form')} className="text-gray-400 hover:text-white transition-colors">
                  Форма обратной связи
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        {/* Bottom bar */}
        <div className="pt-8 border-t border-white border-opacity-5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2025 NEUROCRAFTS. Все права защищены.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="privacy-policy.html" className="text-gray-500 hover:text-gray-400 transition-colors">
              Политика конфиденциальности
            </a>
            <a href="terms-of-use.html" className="text-gray-500 hover:text-gray-400 transition-colors">
              Условия использования
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
