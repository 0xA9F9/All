        const mode= document.getElementById('mode');
        function toggleMode() {
            const html = document.documentElement;
            if (html.getAttribute('data-mode') === 'light') {
                html.setAttribute('data-mode', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                html.setAttribute('data-mode', 'light');
                localStorage.setItem('theme', 'light');
            }
        }

        function initTheme() {
            const storedTheme = localStorage.getItem('theme');
            document.documentElement.setAttribute('data-mode', storedTheme || 'light');
        }

        window.addEventListener('DOMContentLoaded', initTheme);
        mode.addEventListener('click', toggleMode);
