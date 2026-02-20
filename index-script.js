const menuData = [
    { name: "YouTube", cat: "Media", link: "https://yblebon.github.io/youtube", icon: "fab fa-youtube", description: "Access my favorite YouTube videos.", color: "#e74c3c" },
    { name: "Dictionary", cat: "Knowledge", link: "https://yblebon.github.io/dictionary", icon: "fas fa-book", description: "Words play a part in our lives.", color: "#5c97bd" },
    { name: "Weather", cat: "Daily Essentials", link: "https://yblebon.github.io/weather", icon: "fas fa-cloud-sun", description: "Meteorological forecasts.", color: "#1abc9c" },
    { name: "News", cat: "Daily Essentials", link: "https://yblebon.github.io/news", icon: "fas fa-newspaper", description: "Daily global news updates.", color: "#9b59b6" },
    { name: "Stocks", cat: "Daily Essentials", link: "https://yblebon.github.io/stocks", icon: "fas fa-money-bill-trend-up", description: "Market data and trends.", color: "#27ae60" },
    { name: "Top50songs", cat: "Media", link: "https://yblebon.github.io/top50songs", icon: "fas fa-music", description: "Top 50 songs list.", color: "#e67e22" },
    { name: "Moon", cat: "Knowledge", link: "https://yblebon.github.io/moon", icon: "fas fa-moon", description: "Explore lunar phases.", color: "#34495e" },
    { name: "Journal", cat: "Knowledge", link: "https://yblebon.github.io/journal", icon: "fas fa-book", description: "Daily thoughts.", color: "#26a69a" },
    { name: "Podcasts", cat: "Knowledge", link: "https://yblebon.github.io/podcasts", icon: "fas fa-podcast", description: "Favorite discussions.", color: "#26a69a" },
    { name: "This and that", cat: "Media", link: "https://yblebon.github.io/thisandthat", icon: "fas fa-ellipsis-h", description: "Random thoughts.", color: "#26a69a" },
    { name: "Logs", cat: "Organization", link: "https://yblebon.github.io/logs", icon: "fas fa-file-alt", description: "Technical progress.", color: "#26a69a" },
    { name: "Quicknotes", cat: "Organization", link: "https://yblebon.github.io/quicknotes", icon: "fas fa-sticky-note", description: "Quick thoughts.", color: "#5c6bc0" },
    { name: "Bookmarks", cat: "Organization", link: "https://yblebon.github.io/bookmarks", icon: "fas fa-bookmark", description: "Saved resources.", color: "#5c6bc0" },
    { name: "Book from the books", cat: "Knowledge", link: "https://yblebon.github.io/thebook", icon: "fas fa-book-open", description: "Insights.", color: "#5c6bc0" },
    { name: "Videos", cat: "Media", link: "https://yblebon.github.io/videos", icon: "fas fa-video", description: "Tutorials.", color: "#5c6bc0" },
    { name: "Momjokes", cat: "Fun", link: "https://yblebon.github.io/momjokes", icon: "fas fa-face-grin-tongue-wink", description: "Jokes list.", color: "#ef5350" },
    { name: "Hardtarget", cat: "Fun", link: "https://yblebon.github.io/hardtarget", icon: "fas fa-sun-plant-wilt", description: "Movie quotes.", color: "#ef5350" },
    { name: "Hahaha", cat: "Fun", link: "https://yblebon.github.io/hahaha", icon: "fas fa-laugh-beam", description: "Funny moments.", color: "#ef5350" },
    { name: "Carre", cat: "Media", link: "https://yblebon.github.io/carre", icon: "fas fa-square", description: "Creative works.", color: "#ef5350" },
    { name: "Arcade", cat: "Fun", link: "https://yblebon.github.io/arcade", icon: "fas fa-gamepad", description: "Brain training.", color: "#ef5350" },
    { name: "Influencers", cat: "Media", link: "https://yblebon.github.io/influencers", icon: "fas fa-users", description: "Influencers.", color: "#ef5350" },
    { name: "Crookentials", cat: "Media", link: "https://yblebon.github.io/crookentials/", icon: "fas fa-camera-retro", description: "Insights.", color: "#8d6e63" },
    { name: "Image Uploader", cat: "Tools", link: "https://yblebon.github.io/image_uploader/", icon: "fas fa-camera-retro", description: "Upload images.", color: "#8d6e63" },
    { name: "Encryption", cat: "Tools", link: "https://yblebon.github.io/encryption/", icon: "fas fa-signature", description: "Files encryption.", color: "#8d6e63" },
    { name: "Text To PDF", cat: "Tools", link: "https://yblebon.github.io/text_2_pdf/", icon: "fas fa-file-pdf", description: "Text to PDF.", color: "#8d6e63" },
    { name: "Jsonformatter", cat: "Tools", link: "https://yblebon.github.io/jsonformatter", icon: "fas fa-code", description: "Beautify JSON.", color: "#8d6e63" },
    { name: "Color picker", cat: "Tools", link: "https://yblebon.github.io/color_picker", icon: "fas fa-palette", description: "Custom colors.", color: "#8d6e63" },
    { name: "Rest debug", cat: "Tools", link: "https://yblebon.github.io/rest_debug", icon: "fas fa-bug", description: "API tools.", color: "#8d6e63" },
    { name: "Password Generator", cat: "Tools", link: "https://yblebon.github.io/password_generator", icon: "fas fa-key", description: "Security tool.", color: "#8d6e63" },
    { name: "Webench", cat: "Tools", link: "https://yblebon.github.io/webench", icon: "fas fa-laptop-code", description: "Benchmarks.", color: "#8d6e63" },
    { name: "Events", cat: "Organization", link: "https://yblebon.github.io/events", icon: "fas fa-calendar-alt", description: "Upcoming activities.", color: "#ffa726" },
    { name: "Coins", cat: "Organization", link: "https://yblebon.github.io/coins", icon: "fas fa-coins", description: "Currency insights.", color: "#ffa726" },
    { name: "Daily_workout", cat: "Organization", link: "https://yblebon.github.io/daily_workout", icon: "fas fa-dumbbell", description: "Exercise routines.", color: "#ffa726" },
    { name: "Food", cat: "Organization", link: "https://yblebon.github.io/food", icon: "fas fa-utensils", description: "Recipes.", color: "#ffa726" },
    { name: "Electricity", cat: "Daily Essentials", link: "https://yblebon.github.io/electricity", icon: "fas fa-bolt", description: "Electricity tracking.", color: "#ffa726" },
    { name: "Transport", cat: "Daily Essentials", link: "https://yblebon.github.io/transport", icon: "fas fa-car", description: "Travel routes.", color: "#ffa726" },
    { name: "IP", cat: "Daily Essentials", link: "https://yblebon.github.io/ip", icon: "fas fa-server", description: "Display IP.", color: "#ffa726" }
];

let favorites = JSON.parse(localStorage.getItem('myHubFavs')) || [];

function toggleFavorite(name) {
    if (favorites.includes(name)) favorites = favorites.filter(f => f !== name);
    else favorites.push(name);
    localStorage.setItem('myHubFavs', JSON.stringify(favorites));
    render();
}

function clearAllFavs() {
    favorites = [];
    localStorage.removeItem('myHubFavs');
    render();
}

function createCardHTML(item, isFav) {
    return `<div class="card" style="background-color: ${item.color}">
        <a href="${item.link}" class="card-link" target="_blank">
            <i class="${item.icon} card-icon"></i>
            <div class="card-name">${item.name}</div>
            <div class="card-desc">${item.description}</div>
        </a>
        <div class="card-footer">
            <button class="fav-btn ${isFav ? 'is-active' : ''}" onclick="toggleFavorite('${item.name}')">
                <i class="fa${isFav ? 's' : 'r'} fa-star"></i>
            </button>
        </div>
    </div>`;
}

function render() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const container = document.getElementById('mainContainer');
    container.innerHTML = '';
    const filtered = menuData.filter(i => i.name.toLowerCase().includes(query) || i.description.toLowerCase().includes(query));

    const favItems = filtered.filter(i => favorites.includes(i.name));
    if (favItems.length > 0 && query === '') {
        const section = document.createElement('div');
        section.innerHTML = `<div class="section-label"><i class="fas fa-star" style="color:#fdcb6e"></i> Favorites</div><div class="grid">${favItems.map(i => createCardHTML(i, true)).join('')}</div>`;
        container.appendChild(section);
    }

    const categories = [...new Set(menuData.map(item => item.cat))];
    categories.forEach(cat => {
        const catItems = filtered.filter(i => i.cat === cat && (query !== '' || !favorites.includes(i.name)));
        if (catItems.length > 0) {
            const section = document.createElement('div');
            section.innerHTML = `<div class="section-label">${cat}</div><div class="grid">${catItems.map(i => createCardHTML(i, favorites.includes(i.name))).join('')}</div>`;
            container.appendChild(section);
        }
    });
}

document.getElementById('searchInput').addEventListener('input', render);
render();