function PromptsPopup() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('prompts_popup_seen');
    
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        sessionStorage.setItem('prompts_popup_seen', 'true');
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError('Введите корректный email');
      return;
    }

    setIsSubmitting(true);

    try {
      if (typeof emailjs === 'undefined') {
        throw new Error('EmailJS не загружен');
      }

      const emailParams = {
        from_email: email,
        to_email: 'craftsneuro@gmail.com',
        message: `Запрос на получение 50 AI промтов от: ${email}`
      };

      await emailjs.send(
        window.EMAILJS_SERVICE_ID,
        window.EMAILJS_TEMPLATE_ID,
        emailParams
      );

      const submission = {
        id: Date.now().toString(),
        email: email,
        type: 'prompts_request',
        submittedAt: new Date().toISOString()
      };

      const stored = localStorage.getItem('neurocrafts_submissions');
      const data = stored ? JSON.parse(stored) : { submissions: [] };
      data.submissions.push(submission);
      data.lastUpdated = new Date().toISOString();
      localStorage.setItem('neurocrafts_submissions', JSON.stringify(data));

      setIsSuccess(true);
      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (err) {
      console.error('Email submission error:', err);
      setError('Ошибка отправки. Попробуйте позже или напишите в Telegram.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
      style={{
        opacity: isClosing ? 0 : 1,
        transition: 'opacity 0.3s ease-out'
      }}
      data-name="prompts-popup"
      data-file="components/PromptsPopup.js"
    >
      <div 
        className="relative max-w-lg w-full glass-effect rounded-3xl overflow-hidden border-4 border-[var(--yellow)] shadow-[0_0_100px_rgba(255,214,0,0.4)]"
        style={{
          transform: isClosing ? 'scale(0.95)' : 'scale(1)',
          transition: 'transform 0.3s ease-out'
        }}
      >
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 z-20 w-12 h-12 md:w-10 md:h-10 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-all shadow-lg active:scale-95"
          aria-label="Закрыть"
        >
          <div className="icon-x text-2xl md:text-xl text-white"></div>
        </button>

        <div className="p-8 md:p-12 text-center">
          {!isSuccess ? (
            <>
              <div className="mb-6">
                <div className="w-20 h-20 bg-[var(--yellow)] mx-auto mb-6 flex items-center justify-center animate-pulse">
                  <div className="icon-sparkles text-4xl text-black"></div>
                </div>
              </div>

              <h3 className="text-3xl md:text-4xl font-black mb-4 uppercase tracking-tight leading-tight">
                БЕСПЛАТНО<br/>
                <span className="text-[var(--yellow)]">50 AI ПРОМТОВ</span>
              </h3>

              <p className="text-lg md:text-xl mb-6 font-bold text-gray-300 leading-relaxed">
                Готовые промты для генерации:<br/>
                <span className="text-white">Портретов • Логотипов • Упаковок</span>
              </p>

              <div className="mb-8 p-6 bg-black/50 rounded-2xl border-2 border-[var(--yellow)]/30">
                <p className="text-base text-gray-400 leading-relaxed">
                  Экономьте время на подборе слов.<br/>
                  Просто копируйте и используйте в любой AI-системе.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ВАШ EMAIL"
                  required
                  className="w-full px-6 py-4 mb-4 bg-black border-2 border-[var(--yellow)] focus:border-white focus:outline-none text-center font-bold uppercase tracking-wide placeholder-gray-500"
                />
                {error && <p className="text-red-500 text-sm mb-4 font-bold">{error}</p>}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 bg-[var(--yellow)] text-black font-black text-lg uppercase tracking-wide hover:bg-white transition-all transform hover:scale-105 border-4 border-black disabled:opacity-50"
                >
                  {isSubmitting ? 'ОТПРАВКА...' : 'ПОЛУЧИТЬ ПРОМТЫ →'}
                </button>
              </form>

              <button
                onClick={handleClose}
                className="text-sm text-gray-500 hover:text-gray-400 transition-colors"
              >
                Нет, спасибо
              </button>
            </>
          ) : (
            <>
              <div className="w-20 h-20 bg-green-500 mx-auto mb-6 flex items-center justify-center">
                <div className="icon-check text-4xl text-white"></div>
              </div>
              <h3 className="text-3xl md:text-4xl font-black mb-4 uppercase text-green-400">
                ОТЛИЧНО!
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                50 AI-промтов отправлены на<br/>
                <span className="text-white font-bold">{email}</span>
              </p>
            </>
          )}
        </div>

        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-gradient-to-b from-[var(--yellow)]/20 to-transparent rounded-b-3xl blur-xl"></div>
      </div>
    </div>
  );
}