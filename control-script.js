// --- AUTHENTICATION ---
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    // Hardcoded credentials (admin / password123)
    if (user === "admin" && pass === "password123") {
        document.getElementById('authOverlay').style.display = 'none';
        sessionStorage.setItem('isControlAuthenticated', 'true');
    } else {
        document.getElementById('authError').style.display = 'block';
    }
});

// LOGOUT FUNCTION
function logout() {
    sessionStorage.removeItem('isControlAuthenticated');
    location.reload(); // Refresh the page to show the login overlay
}

// Session check on load
window.onload = function() {
    if (sessionStorage.getItem('isControlAuthenticated') === 'true') {
        document.getElementById('authOverlay').style.display = 'none';
    }
}

// --- CONTENT MANAGEMENT ---
const menuData = [
    { name: "API Primary", cat: "Datasources", link: "#", icon: "fas fa-database", description: "Main data feed management.", color: "#5c97bd" },
    { name: "System Logs", cat: "Datasources", link: "#", icon: "fas fa-terminal", description: "Raw system output.", color: "#2d3436" },
    { name: "Holiday 2024", cat: "Albums", link: "#", icon: "fas fa-images", description: "Trip photos storage.", color: "#e67e22" },
    { name: "Theme Settings", cat: "Settings", link: "javascript:alert('Theme feature coming soon!')", icon: "fas fa-paint-brush", description: "UI Customization.", color: "#9b59b6" },
    { name: "User Profile", cat: "Settings", link: "#", icon: "fas fa-user-cog", description: "Manage admin account.", color: "#26a69a" },
    { name: "Backup Data", cat: "Settings", link: "javascript:alert('Data backed up!')", icon: "fas fa-download", description: "Export workspace data.", color: "#8d6e63" }
];

let favorites = JSON.parse(localStorage.getItem('controlFavs')) || [];

function toggleFavorite(name) {
    if (favorites.includes(name)) favorites = favorites.filter(f => f !== name);
    else favorites.push(name);
    localStorage.setItem('controlFavs', JSON.stringify(favorites));
    render();
}

function createCardHTML(item, isFav) {
    return `
        <div class="card" style="background-color: ${item.color}">
            <a href="${item.link}" class="card-link">
                <i class="${item.icon} card-icon"></i>
                <div class="card-name">${item.name}</div>
                <div class="card-desc">${item.description}</div>
            </a>
            <div class="card-footer">
                <button class="fav-btn ${isFav ? 'is-active' : ''}" onclick="toggleFavorite('${item.name}')">
                    <i class="fa${isFav ? 's' : 'r'} fa-star"></i>
                </button>
            </div>
        </div>
    `;
}

function render() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const container = document.getElementById('mainContainer');
    container.innerHTML = '';
    
    const filtered = menuData.filter(i => i.name.toLowerCase().includes(query) || i.description.toLowerCase().includes(query));

    const categories = ["Datasources", "Albums", "Settings"];
    
    categories.forEach(cat => {
        const catItems = filtered.filter(i => i.cat === cat);
        if (catItems.length > 0) {
            const section = document.createElement('div');
            section.innerHTML = `
                <div class="section-label">${cat}</div>
                <div class="grid">${catItems.map(i => createCardHTML(i, favorites.includes(i.name))).join('')}</div>
            `;
            container.appendChild(section);
        }
    });

    document.getElementById('noResults').style.display = filtered.length === 0 ? 'block' : 'none';
}

document.getElementById('searchInput').addEventListener('input', render);
render();