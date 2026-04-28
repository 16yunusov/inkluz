// Mutaxasis ishchilar — Mavzu (yorug'/qorong'u)

export function setTheme(theme) {
    const htmlTheme = document.getElementById('htmlTheme');
    const themeLight = document.getElementById('themeLight');
    const themeDark = document.getElementById('themeDark');
    if (htmlTheme) htmlTheme.setAttribute('data-theme', theme === 'dark' ? 'dark' : '');
    if (themeLight) themeLight.classList.toggle('active', theme === 'light');
    if (themeDark) themeDark.classList.toggle('active', theme === 'dark');
    localStorage.setItem('uzum_theme', theme);
}

export function initTheme() {
    const savedTheme = localStorage.getItem('uzum_theme') || 'light';
    setTheme(savedTheme);
}
