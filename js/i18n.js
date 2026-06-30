/**
 * DevUnivers Internationalization (i18n) System
 */

document.addEventListener('DOMContentLoaded', () => {
    const DEFAULT_LANG = 'fr';
    const SUPPORTED_LANGS = ['fr', 'en', 'ar'];
    
    // Get language from localStorage or default to 'fr'
    let currentLang = localStorage.getItem('devunivers_lang');
    if (!currentLang || !SUPPORTED_LANGS.includes(currentLang)) {
        currentLang = DEFAULT_LANG;
    }

    // Initialize Language Switcher Dropdown (Assuming we add one to the header)
    const initLanguageSwitcher = () => {
        const switchers = document.querySelectorAll('.lang-switcher');
        switchers.forEach(switcher => {
            // Update active state
            switcher.querySelectorAll('.lang-btn').forEach(btn => {
                if(btn.getAttribute('data-lang') === currentLang) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
                
                // Add click listener
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const lang = btn.getAttribute('data-lang');
                    if (lang && lang !== currentLang && SUPPORTED_LANGS.includes(lang)) {
                        setLanguage(lang);
                    }
                });
            });
        });
    };

    const applyTranslations = (lang) => {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations && translations[key] && translations[key][lang]) {
                // If it's an input/textarea with placeholder, translate placeholder
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    if (el.hasAttribute('placeholder')) {
                        el.setAttribute('placeholder', translations[key][lang]);
                    }
                } else {
                    el.innerHTML = translations[key][lang];
                }
            }
        });

        // Update page title if data-i18n-title attribute exists
        const titleEl = document.querySelector('title[data-i18n-title]');
        if (titleEl) {
            const titleKey = titleEl.getAttribute('data-i18n-title');
            if (translations && translations[titleKey] && translations[titleKey][lang]) {
                document.title = translations[titleKey][lang];
            }
        }

        // Update meta description if data-i18n-meta attribute exists
        const metaDesc = document.querySelector('meta[data-i18n-meta]');
        if (metaDesc) {
            const metaKey = metaDesc.getAttribute('data-i18n-meta');
            if (translations && translations[metaKey] && translations[metaKey][lang]) {
                metaDesc.setAttribute('content', translations[metaKey][lang]);
            }
        }
    };

    const setLanguage = (lang) => {
        currentLang = lang;
        localStorage.setItem('devunivers_lang', lang);
        
        // Update HTML attributes
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        
        // Apply text
        applyTranslations(lang);
        
        // Update Switcher UI
        initLanguageSwitcher();
    };

    // Run on load
    setLanguage(currentLang);
});
