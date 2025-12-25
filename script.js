const menuData = [
    // DATASOURCES CATEGORY
    { name: "Global News API", cat: "Datasources", link: "#", icon: "fas fa-database", description: "Real-time feed for international news sources.", color: "#5c97bd" },
    { name: "Market Stocks", cat: "Datasources", link: "#", icon: "fas fa-chart-line", description: "Financial data endpoints and historical trends.", color: "#27ae60" },
    { name: "Weather Station", cat: "Datasources", link: "#", icon: "fas fa-satellite", description: "Meteorological data collection nodes.", color: "#1abc9c" },
    
    // ALBUMS CATEGORY
    { name: "Travel 2024", cat: "Albums", link: "#", icon: "fas fa-images", description: "Photos from the summer road trip.", color: "#e67e22" },
    { name: "Project Screenshots", cat: "Albums", link: "#", icon: "fas fa-camera-retro", description: "Collection of UI/UX research drafts.", color: "#9b59b6" },
    { name: "Family Archive", cat: "Albums", link: "#", icon: "fas fa-folder-open", description: "Scanned legacy photographs and documents.", color: "#e74c3c" }
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
    return `
        <div class="card" style="background-color: ${item.color}">
            <a href="${item.link}" class="card-link" target="_blank">
                <i class="${item.icon} card-icon"></i>
                <div class="card-name">${item.name}</div>
                <div class="card-desc">${item.description}</div>
            </a>
            <div class="card-footer">
                <button class="fav-btn ${isFav ? 'is-active' : ''}" onclick="toggleFavorite('${item.name}')">
                    <i class="fa${isFav ? 's' : 'r'} fa-star"></i>
                </button>
                <i class="fas fa-external-link-alt" style="opacity:0.5; font-size:0.7rem"></i>
            </div>
        </div>
    `;
}

function render() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const container = document.getElementById('mainContainer');
    container.innerHTML = '';

    const filtered = menuData.filter(i => 
        i.name.toLowerCase().includes(query) || 
        i.description.toLowerCase().includes(query)
    );

    // 1. Render Favorites Section
    const favItems = filtered.filter(i => favorites.includes(i.name));
    if (favItems.length > 0 && query === '') {
        const favSection = document.createElement('div');
        favSection.innerHTML = `
            <div class="section-label"><i class="fas fa-star" style="color:#fdcb6e"></i> Favorites</div>
            <div class="grid">${favItems.map(i => createCardHTML(i, true)).join('')}</div>
        `;
        container.appendChild(favSection);
    }

    // 2. Group by Category (Datasources and Albums)
    const categories = ["Datasources", "Albums"];
    
    categories.forEach(category => {
        // Show item if it matches search OR (if not searching) if it's not already in favorites
        const catItems = filtered.filter(i => i.cat === category && (query !== '' || !favorites.includes(i.name)));
        
        if (catItems.length > 0) {
            const section = document.createElement('div');
            section.innerHTML = `
                <div class="section-label">${category}</div>
                <div class="grid">${catItems.map(i => createCardHTML(i, favorites.includes(i.name))).join('')}</div>
            `;
            container.appendChild(section);
        }
    });

    document.getElementById('noResults').style.display = filtered.length === 0 ? 'block' : 'none';
}

document.getElementById('searchInput').addEventListener('input', render);
render();