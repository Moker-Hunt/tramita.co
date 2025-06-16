/**
 * Скрипт для обновления всех страниц статей
 * Добавляет одинаковые изображения из карточек и улучшает информативность
 */

const fs = require('fs');
const path = require('path');

// Получаем данные о статьях из main.js
const mainJsPath = path.join(__dirname, 'assets', 'js', 'main.js');
let mainJsContent = fs.readFileSync(mainJsPath, 'utf8');

// Извлекаем объект articleImages из main.js
let articleImagesStr = '';
const articleImagesRegex = /const\s+articleImages\s*=\s*\{([^}]+)\};/s;
const match = mainJsContent.match(articleImagesRegex);
if (match && match[1]) {
  articleImagesStr = match[1];
}

// Преобразуем строку в объект JavaScript
const articleImages = {};
articleImagesStr.split('\n').forEach(line => {
  // Ищем строки вида 'id': 'path/to/image.webp',
  const lineMatch = line.match(/'([^']+)'\s*:\s*'([^']+)'/);
  if (lineMatch) {
    const id = lineMatch[1];
    const imagePath = lineMatch[2];
    articleImages[id] = imagePath;
  }
});

console.log(`Найдено ${Object.keys(articleImages).length} изображений статей`);

// Категории для отображения
const categories = {
  'tramites': 'Trámites',
  'documentos': 'Documentos',
  'finanzas': 'Finanzas',
  'impuestos': 'Impuestos',
  'vehiculos': 'Vehículos',
  'viajes': 'Viajes',
  'educacion': 'Educación',
  'seguridad': 'Seguridad Social',
  'salud': 'Salud'
};

// Обновляем все HTML файлы в папке pages
const pagesDir = path.join(__dirname, 'pages');
const htmlFiles = fs.readdirSync(pagesDir).filter(file => file.endsWith('.html'));

console.log(`Найдено ${htmlFiles.length} HTML файлов для обновления`);

htmlFiles.forEach(file => {
  const articleId = file.replace('.html', '');
  const filePath = path.join(pagesDir, file);
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Извлекаем заголовок и описание
  let title = '';
  let description = '';
  let category = '';
  
  const titleMatch = content.match(/<title>(.*?)<\/title>/);
  if (titleMatch && titleMatch[1]) {
    // Удаляем " | Tramita.co" из заголовка
    title = titleMatch[1].replace(/ \| Tramita\.co$/, '');
  }
  
  const descriptionMatch = content.match(/<meta name="description" content="(.*?)">/);
  if (descriptionMatch && descriptionMatch[1]) {
    description = descriptionMatch[1];
  }
  
  // Определяем категорию из содержимого (можно по-разному, например из хлебных крошек или других элементов)
  // Здесь просто предположим, что категория указана в article-category-tag если есть
  const categoryMatch = content.match(/<div class="category-tag[^>]*>(.*?)<\/div>/);
  if (categoryMatch && categoryMatch[1]) {
    // Преобразуем название категории обратно в ключ
    const categoryName = categoryMatch[1].trim();
    for (const [key, value] of Object.entries(categories)) {
      if (value === categoryName) {
        category = key;
        break;
      }
    }
  }
  
  if (!category) {
    // Если категория не найдена, пытаемся определить её по содержимому
    if (content.includes('IMSS') || content.includes('Seguridad Social')) {
      category = 'seguridad';
    } else if (content.includes('documento') || content.includes('acta')) {
      category = 'documentos';
    } else if (content.includes('impuesto') || content.includes('SAT')) {
      category = 'impuestos';
    } else if (content.includes('licencia') || content.includes('vehículo')) {
      category = 'vehiculos';
    } else if (content.includes('banco') || content.includes('dinero')) {
      category = 'finanzas';
    } else {
      category = 'tramites'; // категория по умолчанию
    }
  }
  
  // Определяем путь к изображению
  let imagePath = '';
  
  if (articleImages[articleId]) {
    // Используем изображение из объекта articleImages
    imagePath = articleImages[articleId];
  } else {
    // Если нет специфического изображения, используем категорийное
    imagePath = `assets/img/categories/${category}.webp`;
  }
  
  // Ищем секцию с изображением в тексте и заменяем её
  const featuredImageRegex = /<div class="article-featured-image">\s*<img[^>]*>\s*<div class="image-caption">[^<]*<\/div>\s*<\/div>/s;
  
  const newFeaturedImage = `
<div class="article-featured-image">
    <img src="../${imagePath}" alt="${title}" class="featured-image">
    <div class="image-caption">Información visual sobre ${title}</div>
</div>`;
  
  // Проверяем, есть ли уже метаданные - если есть, не добавляем снова
  const hasMetaInfo = content.includes('article-meta-info');
  const hasSummary = content.includes('article-summary');
  const hasResources = content.includes('additional-resources');
  
  // Ищем начало содержимого статьи после изображения
  let contentWithNewImage = content;
  
  if (featuredImageRegex.test(content)) {
    // Заменяем существующее изображение
    contentWithNewImage = content.replace(featuredImageRegex, newFeaturedImage);
  }
  
  // Если нет метаинформации и резюме, добавляем их после изображения
  if (!hasMetaInfo) {
    const categoryDisplayName = categories[category] || 'Trámites';
    
    const metaInfo = `
<div class="article-meta-info">
    <div class="article-category-info">
        <span class="article-meta-label">Categoría:</span>
        <span class="article-meta-value">${categoryDisplayName}</span>
    </div>
    <div class="article-author-info">
        <span class="article-meta-label">Autor:</span>
        <span class="article-meta-value">Equipo editorial Tramita.co</span>
    </div>
    <div class="article-share">
        <span class="article-meta-label">Compartir:</span>
        <div class="social-share-buttons">
            <a href="https://www.facebook.com/sharer/sharer.php?u=https://tramita.co/pages/${articleId}.html" target="_blank" class="share-button facebook">Facebook</a>
            <a href="https://twitter.com/intent/tweet?url=https://tramita.co/pages/${articleId}.html&text=${encodeURIComponent(title)}" target="_blank" class="share-button twitter">Twitter</a>
            <a href="https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' - https://tramita.co/pages/' + articleId + '.html')}" target="_blank" class="share-button whatsapp">WhatsApp</a>
        </div>
    </div>
</div>`;
    
    // Добавляем мета-информацию после изображения
    contentWithNewImage = contentWithNewImage.replace(
      newFeaturedImage,
      `${newFeaturedImage}\n${metaInfo}`
    );
  }
  
  // Если нет резюме, добавляем его после мета-информации
  if (!hasSummary && description) {
    const summary = `
<div class="article-summary">
    <h4>Resumen:</h4>
    <p>${description}</p>
</div>`;
    
    // Если мы только что добавили мета-информацию, добавляем резюме после неё
    if (!hasMetaInfo) {
      const metaInfoEnd = '</div>';
      const lastIndex = contentWithNewImage.lastIndexOf(metaInfoEnd) + metaInfoEnd.length;
      contentWithNewImage = 
        contentWithNewImage.substring(0, lastIndex) + 
        '\n' + summary + 
        contentWithNewImage.substring(lastIndex);
    } else {
      // Иначе добавляем после изображения
      contentWithNewImage = contentWithNewImage.replace(
        newFeaturedImage,
        `${newFeaturedImage}\n${summary}`
      );
    }
  }
  
  // Если нет секции ресурсов, добавляем её перед дисклеймером
  if (!hasResources) {
    const resources = `
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
</div>`;
    
    // Находим дисклеймер и вставляем ресурсы перед ним
    const disclaimerRegex = /<div class="disclaimer">/;
    if (disclaimerRegex.test(contentWithNewImage)) {
      contentWithNewImage = contentWithNewImage.replace(
        disclaimerRegex, 
        `${resources}\n\n<!-- Стандартный disclaimer -->\n<div class="disclaimer">`
      );
    }
  }
  
  // Записываем обновленный контент
  fs.writeFileSync(filePath, contentWithNewImage);
  console.log(`Обновлен файл: ${file}`);
});

console.log('Обновление завершено!');
