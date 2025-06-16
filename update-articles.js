/**
 * Скрипт для обновления страниц статей
 * 
 * Этот скрипт обновляет выбранные страницы статей, применяя шаблон и новые стили.
 * Он сохраняет существующий контент статьи и добавляет новые элементы: метаданные, изображение,
 * структурированный контент и секцию похожих статей.
 */

// Массив с основными данными о статьях
const articlesData = [
    {
        id: 'afore-consulta',
        title: 'Consulta de saldo AFORE en línea',
        description: 'Guía para revisar tu saldo de AFORE sin salir de casa.',
        category: 'finanzas',
        readingTime: '5 min',
        image: 'assets/img/articles/finanzas-retiro-1.webp'
    },
    {
        id: 'afore-cambio',
        title: 'Proceso de cambio de AFORE: requisitos y pasos',
        description: 'Todo lo que necesitas saber para cambiar tu cuenta de AFORE a otra administradora.',
        category: 'finanzas',
        readingTime: '8 min',
        image: 'assets/img/articles/finanzas-retiro-2.webp'
    },
    {
        id: 'afore-retiro',
        title: 'Retiro parcial de AFORE: casos aplicables',
        description: 'Situaciones en las que puedes retirar parte de tus ahorros de tu cuenta de AFORE antes de jubilarte.',
        category: 'finanzas',
        readingTime: '5 min',
        image: 'assets/img/articles/finanzas-retiro-3.webp'
    },
    // Acta de nacimiento
    {
        id: 'acta-nacimiento',
        title: '¿Cómo obtener una copia de tu acta de nacimiento en línea?',
        description: 'Proceso para solicitar y descargar tu acta de nacimiento de forma digital.',
        category: 'documentos',
        readingTime: '4 min',
        image: 'assets/img/articles/documentos-tramites-1.webp'
    },
    {
        id: 'acta-correccion',
        title: 'Corrección de errores en el acta de nacimiento',
        description: 'Procedimiento para rectificar datos incorrectos en tu acta de nacimiento.',
        category: 'documentos',
        readingTime: '5 min',
        image: 'assets/img/articles/documentos-acta-2.webp'
    },
    {
        id: 'actas-extranjero',
        title: 'Obtención de actas de nacimiento para mexicanos en el extranjero',
        description: 'Guía para conseguir actas de nacimiento si vives fuera de México.',
        category: 'documentos',
        readingTime: '6 min',
        image: 'assets/img/articles/documentos-internacional-1.webp'
    },
    // Pagos digitales
    {
        id: 'codi-pagos',
        title: 'CoDi: Sistema de pagos digitales en México',
        description: 'Todo sobre la plataforma de Cobro Digital del Banco de México y cómo utilizarla.',
        category: 'finanzas',
        readingTime: '4 min',
        image: 'assets/img/articles/finanzas-digital-1.webp'
    },
    {
        id: 'spei-transferencias',
        title: 'Transferencias SPEI: guía completa',
        description: 'Información sobre el Sistema de Pagos Electrónicos Interbancarios y cómo realizar transferencias.',
        category: 'finanzas',
        readingTime: '8 min',
        image: 'assets/img/articles/finanzas-digital-2.webp'
    },
    {
        id: 'billeteras-digitales',
        title: 'Billeteras digitales disponibles en México',
        description: 'Comparativa de las principales opciones de pago digital en el país.',
        category: 'finanzas',
        readingTime: '5 min',
        image: 'assets/img/articles/finanzas-digital-3.webp'
    },
    // Licencia de conducir
    {
        id: 'licencia-tramite',
        title: 'Trámite de licencia de conducir en México',
        description: 'Requisitos y proceso para obtener tu licencia de conducir por primera vez.',
        category: 'vehiculos',
        readingTime: '4 min',
        image: 'assets/img/articles/vehiculos-licencia-1.webp'
    },
    {
        id: 'licencia-renovacion',
        title: 'Renovación de licencia de conducir: documentos necesarios',
        description: 'Lo que necesitas para renovar tu licencia de conducir vencida o próxima a vencer.',
        category: 'vehiculos',
        readingTime: '6 min',
        image: 'assets/img/articles/vehiculos-licencia-2.webp'
    },
    {
        id: 'licencia-permanente',
        title: 'Licencia permanente: requisitos y estados donde está disponible',
        description: 'Estados de México donde puedes obtener una licencia de conducir permanente y sus requisitos.',
        category: 'vehiculos',
        readingTime: '5 min',
        image: 'assets/img/articles/vehiculos-licencia-3.webp'
    },
    {
        id: 'licencia-cdmx',
        title: 'Licencia de conducir en CDMX: trámite digital',
        description: 'Cómo tramitar o renovar tu licencia de manejo en la Ciudad de México a través del sistema digital.',
        category: 'vehiculos',
        readingTime: '7 min',
        image: 'assets/img/articles/vehiculos-cdmx-1.webp'
    }
];

// Категории с читаемым названием
const categories = {
    'tramites': {
        name: 'Trámites',
        icon: '📋'
    },
    'documentos': {
        name: 'Documentos',
        icon: '📄'
    },
    'finanzas': {
        name: 'Finanzas',
        icon: '💰'
    },
    'impuestos': {
        name: 'Impuestos',
        icon: '📊'
    },
    'vehiculos': {
        name: 'Vehículos',
        icon: '🚗'
    },
    'viajes': {
        name: 'Viajes',
        icon: '✈️'
    },
    'educacion': {
        name: 'Educación',
        icon: '🎓'
    }
};

// Функция для получения связанных статей по категории
function getRelatedArticles(currentArticleId, category, count = 3) {
    // Фильтруем статьи той же категории, исключая текущую статью
    const sameCategory = articlesData.filter(article => 
        article.category === category && article.id !== currentArticleId);
    
    // Если статей недостаточно, добавляем статьи из других категорий
    let relatedArticles = [...sameCategory];
    
    // Если нужно больше статей, добавляем из других категорий
    if (relatedArticles.length < count) {
        const otherArticles = articlesData.filter(article => 
            article.category !== category && article.id !== currentArticleId);
        
        // Добавляем статьи из других категорий
        relatedArticles = [
            ...relatedArticles,
            ...otherArticles.slice(0, count - relatedArticles.length)
        ];
    }
    
    // Возвращаем только нужное количество статей
    return relatedArticles.slice(0, count);
}

// Функция для создания HTML-кода связанных статей
function generateRelatedArticlesHTML(currentArticleId, category) {
    const relatedArticles = getRelatedArticles(currentArticleId, category);
    
    let html = `
<div class="related-articles">
    <h3>Artículos relacionados</h3>
    <div class="related-articles-grid">`;
    
    relatedArticles.forEach(article => {
        // Используем image из данных статьи или запасной вариант
        const imageUrl = article.image || `../assets/img/articles/default.webp`;
        
        html += `
        <a href="${article.id}.html" class="related-article-card">
            <img src="../${imageUrl}" alt="${article.title}">
            <h4>${article.title}</h4>
        </a>`;
    });
    
    html += `
    </div>
</div>`;
    
    return html;
}

// Функция для обновления HTML-страницы статьи
function updateArticlePage(articleId) {
    // Находим данные статьи
    const article = articlesData.find(a => a.id === articleId);
    if (!article) {
        console.log(`Статья с ID ${articleId} не найдена`);
        return false;
    }
    
    // Получаем информацию о категории
    const categoryInfo = categories[article.category] || categories.tramites;
    
    // Формируем HTML для метаданных статьи
    const metadataHTML = `
            <div class="article-meta">
                <span class="category-tag ${article.category}">${categoryInfo.name}</span>
                <span class="reading-time">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    ${article.readingTime}
                </span>
                <span class="last-update">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    Actualizado: Mayo 2023
                </span>
            </div>`;
    
    // Формируем HTML для изображения статьи
    const imageHTML = `
        <div class="article-featured-image">
            <img src="../${article.image}" alt="${article.title}" class="featured-image">
            <div class="image-caption">Información detallada sobre ${article.title}</div>
        </div>`;
    
    // Формируем HTML для навигации и связанных статей
    const navigationHTML = `
            <div class="article-navigation">
                <a href="../index.html" class="back-to-home">Volver a inicio</a>
                
                ${generateRelatedArticlesHTML(article.id, article.category)}
            </div>`;
    
    // Возвращаем обновленные элементы HTML
    return {
        articleId: article.id,
        metadataHTML: metadataHTML,
        imageHTML: imageHTML,
        navigationHTML: navigationHTML
    };
}

// Примеры вызова функции
// Эти примеры нужно будет запустить для обновления страниц
const updatedLicenciaCDMX = updateArticlePage('licencia-cdmx');
const updatedAforeRetiro = updateArticlePage('afore-retiro');
const updatedCODIPagos = updateArticlePage('codi-pagos');
