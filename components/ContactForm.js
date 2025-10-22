function ContactForm() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [focusedField, setFocusedField] = React.useState(null);


  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Введите имя';
    if (!formData.email.trim()) newErrors.email = 'Введите email';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Некорректный email';
    if (!formData.message.trim()) newErrors.message = 'Введите сообщение';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    try {
      // Проверка наличия EmailJS
      if (typeof emailjs === 'undefined') {
        console.error('EmailJS library not loaded');
        throw new Error('Библиотека EmailJS не загружена');
      }
      
      if (!window.EMAILJS_PUBLIC_KEY) {
        console.error('EmailJS public key missing');
        throw new Error('Отсутствует публичный ключ EmailJS');
      }
      
      if (!window.EMAILJS_SERVICE_ID || !window.EMAILJS_TEMPLATE_ID) {
        console.error('EmailJS credentials missing:', {
          serviceId: window.EMAILJS_SERVICE_ID,
          templateId: window.EMAILJS_TEMPLATE_ID
        });
        throw new Error('Отсутствуют данные для отправки. Проверьте настройки EmailJS.');
      }
      
      // Отправка через EmailJS на craftsneuro@gmail.com
      const emailParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'craftsneuro@gmail.com'
      };
      
      console.log('Sending email with params:', emailParams);
      
      const response = await emailjs.send(
        window.EMAILJS_SERVICE_ID,
        window.EMAILJS_TEMPLATE_ID,
        emailParams
      );
      
      console.log('EmailJS response:', response);
      
      // Сохранение в LocalStorage (как резервная копия)
      const submission = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        message: formData.message,
        submittedAt: new Date().toISOString()
      };
      
      const stored = localStorage.getItem('neurocrafts_submissions');
      const data = stored ? JSON.parse(stored) : { submissions: [] };
      data.submissions.push(submission);
      data.lastUpdated = new Date().toISOString();
      localStorage.setItem('neurocrafts_submissions', JSON.stringify(data));
      
      setSubmitted(true);
      setErrors({});
      setTimeout(() => setSubmitted(false), 15000);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Form submission error:', error);
      console.error('Error details:', JSON.stringify({
        message: error?.message || 'Unknown error',
        text: error?.text || 'No error text',
        status: error?.status || 'No status',
        name: error?.name || 'No error name',
        stack: error?.stack || 'No stack trace'
      }, null, 2));
      
      let errorMessage = 'Ошибка отправки. ';
      
      if (error?.text) {
        errorMessage += error.text;
      } else if (error?.message) {
        errorMessage += error.message;
      } else if (typeof error === 'string') {
        errorMessage += error;
      } else {
        errorMessage += 'Проверьте настройки EmailJS или подключение к интернету.';
      }
      
      setErrors({ submit: errorMessage });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact-form" className="min-h-screen py-20 md:py-32 px-4 md:px-8 lg:px-16 flex items-center" data-name="contact-form" data-file="components/ContactForm.js">
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 md:mb-8 text-center tracking-tight uppercase leading-tight px-4">
          ГОТОВЫ <span className="text-[var(--yellow)]">НАЧАТЬ?</span>
        </h2>
        <p className="text-lg md:text-xl lg:text-2xl text-center mb-10 md:mb-16 font-bold text-gray-300 max-w-3xl mx-auto px-4">
          Заполните форму — отвечу в течение 24 часов
        </p>
        <form onSubmit={handleSubmit} className="glass-effect p-8 md:p-12 lg:p-16 rounded-3xl border-4 border-[var(--yellow)] shadow-[0_0_100px_rgba(255,214,0,0.1)]">
          <div className="mb-6 relative">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              placeholder="ИМЯ"
              required
              className={`w-full bg-transparent border-b-2 py-4 md:py-5 px-2 text-base md:text-lg font-bold focus:outline-none transition-all uppercase placeholder-gray-500 ${
                errors.name ? 'border-[var(--red)]' : 'border-[var(--yellow)] focus:border-white'
              }`}
              style={{
                transform: focusedField === 'name' ? 'translateY(-2px)' : 'translateY(0)',
                transition: 'all 0.3s ease'
              }}
            />
            {errors.name && <p className="text-[var(--red)] text-sm mt-2 font-bold">{errors.name}</p>}
          </div>
          <div className="mb-6 relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              placeholder="EMAIL"
              required
              className={`w-full bg-transparent border-b-2 py-4 px-2 text-lg font-bold focus:outline-none transition-all uppercase placeholder-gray-500 ${
                errors.email ? 'border-[var(--red)]' : 'border-[var(--yellow)] focus:border-white'
              }`}
              style={{
                transform: focusedField === 'email' ? 'translateY(-2px)' : 'translateY(0)',
                transition: 'all 0.3s ease'
              }}
            />
            {errors.email && <p className="text-[var(--red)] text-sm mt-2 font-bold">{errors.email}</p>}
          </div>
          <div className="mb-8 relative">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField(null)}
              placeholder="ЧТО НУЖНО СДЕЛАТЬ?"
              required
              rows="5"
              className={`w-full bg-transparent border-b-2 py-4 px-2 text-lg font-bold focus:outline-none transition-all resize-none uppercase placeholder-gray-500 ${
                errors.message ? 'border-[var(--red)]' : 'border-[var(--yellow)] focus:border-white'
              }`}
              style={{
                transform: focusedField === 'message' ? 'translateY(-2px)' : 'translateY(0)',
                transition: 'all 0.3s ease'
              }}
            />
            {errors.message && <p className="text-[var(--red)] text-sm mt-2 font-bold">{errors.message}</p>}
          </div>

          {errors.submit && <p className="text-[var(--red)] text-lg mb-4 font-bold">{errors.submit}</p>}
          <button
            type="submit"
            className={`w-full py-5 md:py-6 font-black text-base md:text-xl uppercase tracking-wide transition-all transform hover:scale-105 border-4 border-black ${
              submitted 
                ? 'bg-green-500 text-white' 
                : 'bg-[var(--yellow)] text-black hover:bg-white'
            }`}
          >
            {submitted ? '✓ ОТПРАВЛЕНО! СКОРО ОТВЕТЮ' : 'ОТПРАВИТЬ ЗАЯВКУ'}
          </button>
          
          {submitted && (
            <div className="mt-6 p-6 bg-green-500 bg-opacity-20 border-2 border-green-500 rounded-2xl">
              <p className="text-lg font-black mb-2 uppercase text-green-400">✓ Успешно отправлено!</p>
              <p className="text-sm font-bold text-gray-300">
                Ваше сообщение получено. Мы свяжемся с вами в ближайшее время на указанный email.
              </p>
            </div>
          )}
          
          <div className="mt-10 pt-10 border-t-2 border-[var(--yellow)]">
            <p className="text-center text-gray-400 mb-6 text-sm md:text-base font-bold uppercase">или свяжитесь другим способом:</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a 
                  href="mailto:craftsneuro@gmail.com"
                  className="flex items-center justify-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-black border-2 border-[var(--yellow)] hover:bg-[var(--yellow)] hover:text-black transition-all font-bold uppercase text-sm md:text-base"
                >
                  <div className="icon-mail text-xl"></div>
                  <span>Email</span>
                </a>
              <a 
                href="https://t.me/neurocraftsru"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-black border-2 border-[var(--yellow)] hover:bg-[var(--yellow)] hover:text-black transition-all font-bold uppercase text-sm md:text-base"
              >
                <div className="icon-message-circle text-xl"></div>
                <span>Telegram</span>
              </a>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}