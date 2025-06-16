// Скрипт для обновления всех страниц в папке pages
const fs = require('fs');
const path = require('path');

// Чтение шаблона для CSS и JavaScript частей
const indexContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

// Извлекаем inline CSS из главной страницы
const cssRegex = /<style>([\s\S]*?)<\/style>/;
const cssMatch = indexContent.match(cssRegex);
const cssStyles = cssMatch ? cssMatch[1] : '';

// Обрабатываем все файлы в директории pages
const pagesDir = path.join(__dirname, 'pages');
const files = fs.readdirSync(pagesDir);

files.forEach(file => {
    if (file.endsWith('.html')) {
        const filePath = path.join(pagesDir, file);
        let content = fs.readFileSync(filePath, 'utf8');

        // Заменяем CSS часть
        const currentCssRegex = /<style>([\s\S]*?)<\/style>/;
        content = content.replace(currentCssRegex, `<style>${cssStyles}</style>`);

        // Проверяем и обновляем разметку footer и cookie banner
        // Извлекаем footer из индексной страницы
        const footerRegex = /<footer>([\s\S]*?)<\/footer>/;
        const footerMatch = indexContent.match(footerRegex);
        let footerContent = footerMatch ? footerMatch[1] : '';

        // Изменяем пути в футере на относительные
        footerContent = footerContent
            .replace(/href="legal\//g, 'href="../legal/')
            .replace(/href="index.html"/g, 'href="../index.html"');

        // Заменяем footer
        const currentFooterRegex = /<footer>([\s\S]*?)<\/footer>/;
        content = content.replace(currentFooterRegex, `<footer>${footerContent}</footer>`);

        // Извлекаем cookie banner из индексной страницы
        const cookieRegex = /<div class="cookie-banner" id="cookieBanner">([\s\S]*?)<\/div>\s*<!-- JavaScript -->/;
        const cookieMatch = indexContent.match(cookieRegex);
        let cookieContent = cookieMatch ? cookieMatch[1] : '';

        // Изменяем пути в cookie banner на относительные
        cookieContent = cookieContent
            .replace(/href="legal\//g, 'href="../legal/')
            .replace(/href="index.html"/g, 'href="../index.html"');

        // Заменяем cookie banner
        const currentCookieRegex = /<div class="cookie-banner" id="cookieBanner">([\s\S]*?)<\/div>\s*<!-- JavaScript -->/;
        content = content.replace(currentCookieRegex, `<div class="cookie-banner" id="cookieBanner">${cookieContent}</div>\n\n    <!-- JavaScript -->`);

        // Проверяем и добавляем overflow-x: hidden для body, если отсутствует
        content = content.replace(/body {\s*background-color: var\(--dark-plum\);\s*color: #fff;\s*font-family: "Manrope", sans-serif;\s*line-height: 1.6;\s*}/,
            'body {\n            background-color: var(--dark-plum);\n            color: #fff;\n            font-family: "Manrope", sans-serif;\n            line-height: 1.6;\n            overflow-x: hidden;\n        }');

        // Проверяем и обновляем nav-links стили, если отсутствуют
        if (!content.includes('.nav-links {')) {
            // Находим позицию после .logo стилей
            const logoStyleEndIndex = content.indexOf('-webkit-text-fill-color: transparent;') + '-webkit-text-fill-color: transparent;'.length;
            const navLinksStyles = `
        
        .nav-links {
            display: flex;
            list-style: none;
        }
        
        .nav-links li {
            margin-left: 1.5rem;
            font-family: "Chivo Mono", monospace;
            font-size: 0.9rem;
            text-transform: uppercase;
            position: relative;
        }
        
        .nav-links a:after {
            content: "";
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 0;
            height: 2px;
            background: linear-gradient(45deg, var(--red-accent), var(--yellow-accent));
            transition: width 0.3s ease;
        }
        
        .nav-links a:hover:after {
            width: 100%;
        }
        
        .hamburger {
            display: none;
            cursor: pointer;
            font-size: 1.5rem;
        }`;
            
            // Вставляем стили nav-links после стилей logo
            content = content.substring(0, logoStyleEndIndex) + navLinksStyles + content.substring(logoStyleEndIndex);
        }

        // Добавляем медиа-запросы в конец стилей, если отсутствуют
        const mediaQueryStyles = `
        /* Media Queries */
        @media (max-width: 992px) {
            .articles-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }
        
        @media (max-width: 768px) {
            .nav-links {
                position: fixed;
                top: 0;
                right: -100%;
                height: 100vh;
                width: 80%;
                max-width: 300px;
                background: linear-gradient(135deg, var(--dark-plum), rgba(75, 29, 63, 0.95));
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 2rem;
                transition: all 0.5s ease;
                z-index: 100;
            }
            
            .nav-links.active {
                right: 0;
            }
            
            .nav-links li {
                margin-left: 0;
            }
            
            .hamburger {
                display: block;
                z-index: 101;
            }
        }
        
        @media (max-width: 576px) {
            .footer-content {
                flex-direction: column;
            }
            
            .cookie-banner {
                flex-direction: column;
                text-align: center;
                bottom: 0;
                left: 0;
                transform: none;
                width: 100%;
                border-radius: 12px 12px 0 0;
            }
            
            .cookie-text {
                min-width: 100%;
            }
        }`;

        // Добавляем медиа-запросы перед закрывающим тегом style
        if (!content.includes('@media (max-width:')) {
            content = content.replace('</style>', mediaQueryStyles + '\n    </style>');
        }

        // Записываем обратно в файл
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Обновлена страница: ${file}`);
    }
});

console.log('Все страницы успешно обновлены!');
