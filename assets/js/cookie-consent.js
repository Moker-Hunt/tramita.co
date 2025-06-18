document.addEventListener('DOMContentLoaded', function() {
    // Функция для проверки наличия сохраненных куки
    function checkCookieConsent() {
        // Проверяем, было ли согласие дано ранее
        if (localStorage.getItem('cookieConsentAccepted') !== 'true') {
            // Если согласие не было дано, показываем баннер
            document.getElementById('cookie-consent').style.display = 'block';
        }
    }

    // Функция для обработки нажатия на кнопку принятия куки
    function handleCookieAccept() {
        // Сохраняем согласие пользователя
        localStorage.setItem('cookieConsentAccepted', 'true');
        
        // Скрываем баннер
        document.getElementById('cookie-consent').style.display = 'none';
        
        console.log('Cookie consent has been accepted');
    }

    // Добавляем обработчик событий для кнопки принятия куки
    const acceptButton = document.getElementById('cookie-accept');
    if (acceptButton) {
        acceptButton.addEventListener('click', handleCookieAccept);
    }

    // Проверяем куки при загрузке страницы
    checkCookieConsent();
});