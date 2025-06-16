/**
 * Утилита для генерации HTML-страниц статей на основе шаблона
 * 
 * Этот скрипт помогает генерировать HTML-контент для статей,
 * используя данные из массива articlesData и шаблона HTML
 */

// Функция для получения категории в читаемом виде
function getCategoryReadableName(categoryKey) {
    const categories = {
        'tramites': 'Trámites',
        'documentos': 'Documentos',
        'finanzas': 'Finanzas',
        'impuestos': 'Impuestos',
        'vehiculos': 'Vehículos',
        'viajes': 'Viajes',
        'educacion': 'Educación'
    };
    
    return categories[categoryKey] || 'Trámites';
}

// Функция для форматирования даты в виде "Месяц Год"
function formatDate(dateString) {
    // Если дата не указана, используем текущий месяц и год
    if (!dateString) {
        const now = new Date();
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        return `${months[now.getMonth()]} ${now.getFullYear()}`;
    }
    
    // Иначе преобразуем указанную дату
    const date = new Date(dateString);
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

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

/**
 * Функция для генерации основы HTML-страницы статьи
 * 
 * @param {Object} articleData - Данные статьи из массива articlesData
 * @param {string} subtitleText - Подзаголовок статьи (опционально)
 * @param {string} imageCaption - Подпись к изображению (опционально)
 * @param {string} introText - Вводный текст статьи (опционально)
 * @returns {string} HTML-код страницы статьи
 */
function generateArticleTemplate(articleData, subtitleText = '', imageCaption = '', introText = '') {
    // Используем данные из объекта статьи
    const {
        id,
        title,
        description,
        category,
        readingTime
    } = articleData;
    
    // Определяем изображение для статьи
    // Всегда используем изображение из данных статьи - то же самое, что и в карточке
    let image = articleData.image || `assets/img/categories/${category}.webp` || 'assets/img/categories/default.webp';
    
    // Если подзаголовок не указан, используем описание из данных статьи
    const subtitle = subtitleText || description;
    
    // Если подпись к изображению не указана, создаем стандартную
    const caption = imageCaption || `Información sobre ${title}`;
    
    // Если вводный текст не указан, используем описание
    const intro = introText || description;
    
    // Получаем читаемое название категории
    const categoryName = getCategoryReadableName(category);
    
    // Формируем дату обновления (можно заменить на реальные данные)
    const updateDate = formatDate();
    
    // Формируем HTML-код для связанных статей
    const relatedArticlesHTML = generateRelatedArticlesHTML(id, category);
    
    // Формируем базовый HTML-код страницы статьи
    const articleHTML = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${description}">
    <title>${title} | Tramita.co</title>
    
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="../assets/img/favicon.png">
    
    <!-- CSS -->
    <link rel="stylesheet" href="../assets/css/styles.css">
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Chivo+Mono:wght@400;600&family=Manrope:wght@400;500;600;700&family=Unbounded:wght@400;500;700&display=swap" rel="stylesheet">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <!-- Header -->
    <header>
        <div class="container">
            <nav>
                <a href="../index.html" class="logo">Tramita.co</a>
                
                <!-- Mobile Menu Toggle -->
                <div class="mobile-menu-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                
                <div class="nav-links">
                    <a href="../index.html">Inicio</a>
                    <div class="dropdown">
                        <button class="dropdown-toggle">
                            Categorías
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512">
                                <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/>
                            </svg>
                        </button>
                        <div class="dropdown-menu">
                            <a href="#" class="category-link" data-category="tramites">
                                <span class="category-icon">📋</span>
                                <span>Trámites</span>
                            </a>
                            <a href="#" class="category-link" data-category="documentos">
                                <span class="category-icon">📄</span>
                                <span>Documentos</span>
                            </a>
                            <a href="#" class="category-link" data-category="finanzas">
                                <span class="category-icon">💰</span>
                                <span>Finanzas</span>
                            </a>
                            <a href="#" class="category-link" data-category="impuestos">
                                <span class="category-icon">📊</span>
                                <span>Impuestos</span>
                            </a>
                            <a href="#" class="category-link" data-category="vehiculos">
                                <span class="category-icon">🚗</span>
                                <span>Vehículos</span>
                            </a>
                            <a href="#" class="category-link" data-category="viajes">
                                <span class="category-icon">✈️</span>
                                <span>Viajes</span>
                            </a>
                            <a href="#" class="category-link" data-category="educacion">
                                <span class="category-icon">🎓</span>
                                <span>Educación</span>
                            </a>
                        </div>
                    </div>
                    <a href="../legal/about-us.html">Sobre Nosotros</a>
                </div>
            </nav>
        </div>
    </header>
    
    <!-- Article Header -->
    <section class="article-header">
        <div class="container">
            <h1>${title}</h1>
            <p>${subtitle}</p>
            
            <div class="article-meta">
                <span class="category-tag ${category}">${categoryName}</span>
                <span class="reading-time">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    ${readingTime}
                </span>
                <span class="last-update">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    Actualizado: ${updateDate}
                </span>
            </div>
        </div>
    </section>
    
    <!-- Article Content -->
    <div class="container">
        <div class="article-featured-image">
            <img src="../${image}" alt="${title}" class="featured-image">
            <div class="image-caption">${caption}</div>
        </div>
        
        <div class="article-content">
            <!-- Метаданные статьи для улучшения информативности -->
            <div class="article-meta-info">
                <div class="article-category-info">
                    <span class="article-meta-label">Categoría:</span>
                    <span class="article-meta-value">${getCategoryReadableName(category)}</span>
                </div>
                <div class="article-author-info">
                    <span class="article-meta-label">Autor:</span>
                    <span class="article-meta-value">Equipo editorial Tramita.co</span>
                </div>
                <div class="article-share">
                    <span class="article-meta-label">Compartir:</span>
                    <div class="social-share-buttons">
                        <a href="https://www.facebook.com/sharer/sharer.php?u=https://tramita.co/pages/${id}.html" target="_blank" class="share-button facebook">Facebook</a>
                        <a href="https://twitter.com/intent/tweet?url=https://tramita.co/pages/${id}.html&text=${encodeURIComponent(title)}" target="_blank" class="share-button twitter">Twitter</a>
                        <a href="https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' - https://tramita.co/pages/' + id + '.html')}" target="_blank" class="share-button whatsapp">WhatsApp</a>
                    </div>
                </div>
            </div>
            
            <!-- Resumen de artículo -->
            <div class="article-summary">
                <h4>Resumen:</h4>
                <p>${description}</p>
            </div>
            
            <!-- Introducción -->
            <p>${intro}</p>
            
            <!-- Aquí вставляется основное содержимое статьи -->
            <!-- ARTICLE_CONTENT -->
            
            <!-- Información adicional y recursos -->
            <div class="additional-resources">
                <h3>Recursos adicionales</h3>
                <ul class="resources-list">
                    <li>
                        <a href="https://www.gob.mx/" target="_blank" class="resource-link">Sitio oficial del Gobierno de México</a>
                        <span class="resource-description">Portal oficial para trámites gubernamentales</span>
                    </li>
                    <li>
                        <a href="../index.html" class="resource-link">Más trámites en Tramita.co</a>
                        <span class="resource-description">Consulta otros trámites populares en nuestro sitio</span>
                    </li>
                </ul>
            </div>
            
            <!-- Стандартный disclaimer -->
            <div class="disclaimer">
                <p><strong>Importante:</strong> Esta información es meramente referencial. Los requisitos y costos pueden variar según la entidad federativa y la fecha de consulta. Para información más precisa, consulta directamente con las autoridades correspondientes o en los portales oficiales del gobierno mexicano.</p>
            </div>
            
            <!-- Навигация и связанные статьи -->
            <div class="article-navigation">
                <a href="../index.html" class="back-to-home">Volver a inicio</a>
                
                ${relatedArticlesHTML}
            </div>
        </div>
    </div>
    
    <!-- Footer -->
    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-logo-container">
                    <div class="footer-logo">Tramita.co</div>
                    <p>Información objetiva sobre trámites mexicanos</p>
                </div>
                
                <div class="footer-links">
                    <h4>Legal</h4>
                    <a href="../legal/terms-of-use.html">Términos de Uso</a>
                    <a href="../legal/privacy-policy.html">Política de Privacidad</a>
                    <a href="../legal/privacy-policy-cookies.html">Política de Cookies</a>
                </div>
                
                <div class="footer-links">
                    <h4>Sitio</h4>
                    <a href="../index.html">Inicio</a>
                    <a href="../legal/about-us.html">Sobre Nosotros</a>
                    <a href="../legal/contacto.html">Contacto</a>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; 2023 Tramita.co - Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>

    <!-- Scripts -->
    <script src="../assets/js/main.js"></script>
</body>
</html>`;

    return articleHTML;
}

/**
 * Примеры использования
 * 
 * // Найти нужную статью в массиве articlesData
 * const article = articlesData.find(article => article.id === 'acta-nacimiento');
 * 
 * // Сгенерировать HTML для страницы
 * const htmlTemplate = generateArticleTemplate(article);
 * 
 * // Заменить метку <!-- ARTICLE_CONTENT --> на реальное содержимое статьи
 * // и сохранить файл
 */
