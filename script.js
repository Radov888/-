function scrollToMenu() {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
        menuSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function initPopup(phones = []) {
    // Проверяем существование поп‑апа
    const existingPopup = document.getElementById('phonePopup');
    if (existingPopup) {
        // Если поп‑ап есть — просто возвращаем его
        return existingPopup;
    }

    // Формируем HTML
    const popupHTML = `
        <div class="popup" id="phonePopup" role="dialog" aria-modal="true" aria-labelledby="popupTitle" tabindex="-1">
            <div class="popup-content">
                <span class="close-btn" aria-label="Закрыть окно">&times;</span>
                <h3 id="popupTitle">Заказать пиццу</h3>
                <p>Позвоните нам:</p>
                <ul class="phone-list">
                    ${phones.map(phone => `
                        <li><a href="tel:${phone.number}">${phone.display}</a></li>
                    `).join('')}
                </ul>
            </div>
        </div>
    `;

    // Вставляем в DOM
    document.body.insertAdjacentHTML('beforeend', popupHTML);

    return document.getElementById('phonePopup');
}

function setupPopupEvents(popup) {
    const closeBtn = popup.querySelector('.close-btn');

    // Обработчик закрытия по крестику
    closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    // Обработчик закрытия при клике вне контента
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.style.display = 'none';
        }
    });
}

function openPopup() {
    // Получаем поп‑ап (создаём или берём существующий)
    const popup = initPopup([
        { number: '+79939001095', display: '+7 (993) 900-10-95' },
        { number: '+79376933330', display: '+7 (937) 693-33-30' }
    ]);

    // Настраиваем события только если они ещё не привязаны
    if (!popup.dataset.initialized) {
        setupPopupEvents(popup);
        popup.dataset.initialized = 'true';
    }

    // Показываем поп‑ап
    popup.style.display = 'flex';
}

// Инициализация после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    // Кнопка "Посмотреть меню"
    const btnViewMenu = document.querySelector('.btn-view-menu');
    if (btnViewMenu) {
        btnViewMenu.addEventListener('click', scrollToMenu);
    }

    // Кнопка "Заказать" (общая)
    const btnOrder = document.querySelector('.btn-order');
    if (btnOrder) {
        btnOrder.addEventListener('click', openPopup);
    }

    // Кнопки "Заказать" в карточках меню
    document.querySelectorAll('.card button').forEach(button => {
        button.addEventListener('click', openPopup);
    });
});