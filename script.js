/* ============================================
   ПРЕМИАЛЬНАЯ ВЫСТАВКА: АВАНГАРД В МОДЕ
   ============================================
   JavaScript для цифровой выставки об авангарде
   в искусстве и моде конца XIX–XX века
   ============================================ */

// Регистрация плагинов GSAP
gsap.registerPlugin(ScrollTrigger);

// Плавная прокрутка отключена - используется нативная прокрутка браузера
// Это обеспечивает равномерную, отзывчивую прокрутку без рывков

// ============================================
// АНИМАЦИЯ ГЛАВНОГО ЭКРАНА (HERO)
// ============================================
function initHeroAnimations() {
    const heroYear = document.querySelector('.hero-year-range');
    const heroTitleLines = document.querySelectorAll('.hero-title-line');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroScrollHint = document.querySelector('.hero-scroll-hint');
    
    const heroTimeline = gsap.timeline({ delay: 0.5 });
    
    heroTimeline
        .to(heroYear, {
            opacity: 1,
            duration: 1,
            ease: 'power3.out'
        })
        .to(heroTitleLines, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power3.out'
        }, '-=0.5')
        .to(heroSubtitle, {
            opacity: 1,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.3')
        .to(heroScrollHint, {
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.5');
}

// ============================================
// АНИМАЦИЯ СЕКЦИЙ ПРИ ПРОКРУТКЕ
// ============================================
function initScrollAnimations() {
    // Анимация введения (Manifesto)
    gsap.utils.toArray('.manifesto-text-block').forEach((block, index) => {
        gsap.fromTo(block, 
            {
                opacity: 0,
                y: 50
            },
            {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: block,
                    start: 'top 80%',
                    end: 'top 50%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Анимация таймлайна
    gsap.utils.toArray('.timeline-item').forEach((item, index) => {
        gsap.fromTo(item,
            {
                opacity: 0,
                x: -50
            },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: 'power3.out',
                delay: index * 0.1,
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Анимация цитаты
    const quoteText = document.querySelector('.quote-text');
    if (quoteText) {
        gsap.fromTo(quoteText,
            {
                opacity: 0,
                y: 50
            },
            {
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: quoteText,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }
    
    // Анимация карточек личностей — плавно и без долгой задержки
    gsap.utils.toArray('.personality-card').forEach((card, index) => {
        gsap.fromTo(card,
            {
                opacity: 0,
                y: 40,
                scale: 0.98
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.45,
                ease: 'power3.out',
                delay: index * 0.03,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 92%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Анимация карточек тем
    gsap.utils.toArray('.theme-card').forEach((card, index) => {
        gsap.fromTo(card,
            {
                opacity: 0,
                y: 40
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.45,
                ease: 'power3.out',
                delay: index * 0.04,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 92%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Анимация заключения
    const closingTitle = document.querySelector('.closing-title');
    const closingParagraphs = document.querySelectorAll('.closing-text p');
    
    if (closingTitle) {
        gsap.fromTo(closingTitle,
            {
                opacity: 0,
                y: 50
            },
            {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: closingTitle,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }
    
    closingParagraphs.forEach((p, index) => {
        gsap.fromTo(p,
            {
                opacity: 0,
                y: 30
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                delay: index * 0.2,
                scrollTrigger: {
                    trigger: p,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
}

// ============================================
// МОДАЛЬНОЕ ОКНО ДЕТАЛЕЙ ЛИЧНОСТИ
// ============================================
function initPersonalityModal() {
    const modal = document.getElementById('personalityModal');
    const modalContent = modal.querySelector('.modal-content');
    const closeButton = modal.querySelector('.modal-close');
    const personalityCards = document.querySelectorAll('.personality-card');
    const personalityDetailsTemplate = document.getElementById('personalityDetails');
    
    // Открытие модального окна
    personalityCards.forEach(card => {
        card.addEventListener('click', () => {
            const personalityId = card.getAttribute('data-personality-id');
            const detailElement = personalityDetailsTemplate.content 
                ? personalityDetailsTemplate.content.querySelector(`[data-detail-id="${personalityId}"]`)
                : personalityDetailsTemplate.querySelector(`[data-detail-id="${personalityId}"]`);
            
            if (detailElement) {
                // Клонируем содержимое детального профиля
                const detailClone = detailElement.cloneNode(true);
                modalContent.innerHTML = '';
                modalContent.appendChild(detailClone);
                // Сбрасываем скролл и модала, и контента — каждая карточка открывается с начала
                modal.scrollTop = 0;
                modalContent.scrollTop = 0;
                requestAnimationFrame(() => {
                    modal.scrollTop = 0;
                    modalContent.scrollTop = 0;
                });
                
                // Показываем модальное окно
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Получаем элементы для анимации
                const hero = detailClone.querySelector('.personality-detail-hero');
                const header = detailClone.querySelector('.personality-detail-header');
                const sections = detailClone.querySelectorAll('.personality-detail-section');
                const gallery = detailClone.querySelector('.personality-detail-gallery');
                const galleryItems = gallery ? gallery.querySelectorAll('.gallery-item') : [];
                
                // Устанавливаем начальное состояние для анимации
                gsap.set(modal, { opacity: 0 });
                gsap.set(modalContent, { opacity: 0, scale: 0.96, y: 12 });
                gsap.set([hero, header, ...sections, gallery], { opacity: 0, y: 16 });
                gsap.set(galleryItems, { opacity: 0, scale: 0.98 });
                
                const openTimeline = gsap.timeline({
                    onComplete: () => {
                        modal.scrollTop = 0;
                        modalContent.scrollTop = 0;
                    }
                });
                // Появление фона и окна — быстро и плавно
                openTimeline.to(modal, { opacity: 1, duration: 0.2, ease: 'power2.out' });
                openTimeline.to(modalContent, {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.28,
                    ease: 'power2.out'
                }, '-=0.15');
                // Контент внутри — короткие смещения по времени
                if (hero) openTimeline.to(hero, { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }, '-=0.2');
                if (header) openTimeline.to(header, { opacity: 1, y: 0, duration: 0.22, ease: 'power2.out' }, '-=0.18');
                sections.forEach((section, i) => {
                    openTimeline.to(section, { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' }, i === 0 ? '-=0.15' : '-=0.12');
                });
                if (gallery) {
                    openTimeline.to(gallery, { opacity: 1, y: 0, duration: 0.22, ease: 'power2.out' }, '-=0.12');
                    galleryItems.forEach((item, i) => {
                        openTimeline.to(item, { opacity: 1, scale: 1, duration: 0.18, ease: 'power2.out' }, i === 0 ? '-=0.18' : '-=0.08');
                    });
                }
            }
        });
    });
    
    // Закрытие модального окна — быстро и плавно
    function closeModal() {
        const closeTimeline = gsap.timeline({
            onComplete: () => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
                modalContent.innerHTML = '';
            }
        });
        closeTimeline.to(modalContent, {
            opacity: 0,
            scale: 0.98,
            y: 8,
            duration: 0.18,
            ease: 'power2.in'
        });
        closeTimeline.to(modal, {
            opacity: 0,
            duration: 0.2,
            ease: 'power2.in'
        }, '-=0.12');
    }
    
    closeButton.addEventListener('click', closeModal);
    
    // Закрытие по клику на фон
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Закрытие по клавише Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// ============================================
// ПАРАЛЛАКС ЭФФЕКТЫ
// ============================================
function initParallaxEffects() {
    const hero = document.querySelector('.hero');
    // Параллакс для hero-картинки
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        gsap.to(heroImage, {
            y: '30%',
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
    }
    // Параллакс для hero геометрического фона
    const heroGeometric = document.querySelector('.hero-geometric');
    if (heroGeometric) {
        gsap.to(heroGeometric, {
            y: '50%',
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
    }
}

// ============================================
// HOVER ЭФФЕКТЫ ДЛЯ КАРТОЧЕК
// ============================================
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.personality-card, .theme-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.02,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

// ============================================
// ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
// ============================================
function init() {
    // Ждём полной загрузки DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initHeroAnimations();
            initScrollAnimations();
            initPersonalityModal();
            initParallaxEffects();
            initCardHoverEffects();
        });
    } else {
        initHeroAnimations();
        initScrollAnimations();
        initPersonalityModal();
        initParallaxEffects();
        initCardHoverEffects();
    }
}

// Запуск инициализации
init();

// ============================================
// ОБНОВЛЕНИЕ SCROLLTRIGGER ПРИ ИЗМЕНЕНИИ РАЗМЕРА ОКНА
// ============================================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
});

// ============================================
// ПОДДЕРЖКА REDUCED MOTION
// ============================================
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Отключаем анимации GSAP для пользователей с reduced motion
    gsap.config({
        nullTargetWarn: false,
        trialWarn: false
    });
    
    // Упрощаем анимации
    gsap.set('.hero-year-range, .hero-title-line, .hero-subtitle, .hero-scroll-hint', {
        opacity: 1,
        y: 0
    });
}

// ============================================
// КОММЕНТАРИИ ДЛЯ РАСШИРЕНИЯ КОДА
// ============================================
/*
КАК ДОБАВИТЬ НОВУЮ ЛИЧНОСТЬ:

1. В HTML (index.html):
   - Найдите секцию .personalities-grid
   - Скопируйте блок .personality-card
   - Измените data-personality-id на уникальный ID (например, "newperson")
   - Замените все текстовые поля (имя, страна, годы, описание, тег)
   - Добавьте соответствующий блок .personality-detail в template#personalityDetails
   - Убедитесь, что data-detail-id совпадает с data-personality-id

2. Для изображений:
   - Замените .personality-card-placeholder на <img src="путь/к/изображению.jpg">
   - Замените .personality-detail-image-placeholder на <img>
   - Добавьте изображения в .personality-detail-gallery

3. Анимации добавятся автоматически благодаря GSAP ScrollTrigger

КАК ИЗМЕНИТЬ АНИМАЦИИ:

1. Измените параметры в initHeroAnimations() для анимации главного экрана
2. Измените параметры в initScrollAnimations() для анимации секций
3. Измените параметры в initParallaxEffects() для параллакс эффектов
4. Все анимации используют GSAP, документация: https://greensock.com/docs/

КАК ИЗМЕНИТЬ ЦВЕТА И СТИЛИ:

1. Откройте styles.css
2. Измените переменные в :root (--color-*)
3. Или измените конкретные стили для нужных элементов

КАК ДОБАВИТЬ НОВУЮ СЕКЦИЮ:

1. Добавьте HTML разметку в index.html
2. Добавьте стили в styles.css
3. Добавьте анимацию в initScrollAnimations() в script.js
4. Используйте gsap.utils.toArray() для анимации множественных элементов
*/

