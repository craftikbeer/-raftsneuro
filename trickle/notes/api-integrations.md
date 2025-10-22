# API Интеграции

## ✅ Подключенные API

### 1. AI Чат-бот (Trickle AI)
- **Функция**: Квалификация лидов, консультации
- **Технология**: `invokeAIAgent()` - встроенный AI Trickle
- **Особенности**:
  - Контекстные ответы о услугах
  - История чата
  - Typing indicators
- **Расположение**: `components/AIChatbot.js`

### 2. Real-time уведомления
- **Функция**: Социальное доказательство (fake orders)
- **Технология**: JavaScript intervals
- **Особенности**:
  - Автоматические уведомления каждые 15 сек
  - Анимация появления/исчезновения
  - 5 вариантов заказов
- **Расположение**: `components/LiveNotifications.js`

### 3. Google Analytics 4
- **Функция**: Трекинг поведения пользователей
- **Необходимо**: Заменить `G-XXXXXXXXXX` на реальный Measurement ID
- **События**: Page views, custom events через `window.trackEvent()`

### 4. Yandex.Metrika
- **Функция**: Heatmaps, session recordings, аналитика
- **Необходимо**: Заменить `XXXXXXXX` на реальный Counter ID
- **Особенности**:
  - Clickmap
  - Webvisor
  - Track links

## 🔧 Настройка

### Google Analytics
1. Создать аккаунт на https://analytics.google.com
2. Получить Measurement ID (формат: G-XXXXXXXXXX)
3. Заменить в `index.html`: `G-XXXXXXXXXX` → ваш ID

### Yandex.Metrika
1. Создать счетчик на https://metrika.yandex.ru
2. Получить Counter ID
3. Заменить в `index.html`: `XXXXXXXX` → ваш ID

## 📊 Кастомные события

Примеры трекинга:
```javascript
// Клик на кнопку
window.trackEvent('Button', 'Click', 'Order CTA');

// Отправка формы
window.trackEvent('Form', 'Submit', 'Contact Form');

// Открытие чата
window.trackEvent('Chat', 'Open', 'AI Chatbot');
```

## 🚀 Следующие шаги

- [ ] Получить реальные ID для GA4 и Metrika
- [ ] Настроить цели конверсии
- [ ] Добавить event tracking на ключевые действия
- [ ] Интегрировать с CRM (опционально)