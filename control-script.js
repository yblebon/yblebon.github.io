/**
 * control-script.js
 * Updated for Master-Detail side-by-side view.
 */

let CONFIG = {};
let favorites = JSON.parse(localStorage.getItem('controlFavs')) || [];

const menuData = [
    { name: "API Feed", cat: "Datasources", link: "https://app-blue-kappa.vercel.app/api/auth", icon: "fas fa-database", description: "Primary data endpoints.", color: "#5c97bd" },
    { name: "System Logs", cat: "Datasources", link: "#", icon: "fas fa-terminal", description: "Raw system output.", color: "#2d3436" },
    { name: "Summer 2024", cat: "Albums", link: "#", icon: "fas fa-images", description: "Holiday photographs storage.", color: "#e67e22" },
    { name: "Theme Toggle", cat: "Settings", link: "#", icon: "fas fa-paint-brush", description: "Switch between UI modes.", color: "#9b59b6" },
    { name: "User Profile", cat: "Settings", link: "#", icon: "fas fa-user-cog", description: "Manage admin account settings.", color: "#26a69a" },
    { name: "Backup Data", cat: "Settings", link: "javascript:exportConfig()", icon: "fas fa-download", description: "Export workspace favorites.", color: "#8d6e63" }
];

async function loadConfig() {
    try {
        const response = await fetch('config.json');
        if (!response.ok) throw new Error("Config file not found");
        CONFIG = await response.json();
    } catch (err) {
        console.error("Critical Error: Could not load config.json", err);
    }
}

// Authentication logic remains unchanged
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('authError');
    const submitBtn = e.target.querySelector('button');

    if (!CONFIG.api_host) await loadConfig();

    submitBtn.innerText = "Authenticating...";
    submitBtn.disabled = true;

    try {
        const response = await fetch(`${CONFIG.api_host}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();

        if (response.ok && data.token) {
            sessionStorage.setItem('jwt_token', data.token);
            sessionStorage.setItem('isControlAuthenticated', 'true');
            document.getElementById('authOverlay').style.display = 'none';
            render(); 
        } else {
            errorMsg.style.display = 'block';
        }
    } catch (error) {
        errorMsg.innerText = "Connection failed.";
        errorMsg.style.display = 'block';
    } finally {
        submitBtn.innerText = "Sign In";
        submitBtn.disabled = false;
    }
});

function logout() {
    sessionStorage.removeItem('jwt_token');
    sessionStorage.removeItem('isControlAuthenticated');
    location.reload();
}

/**
 * NEW: Handles opening links in the detail pane iframe
 */
function openDetail(url) {
    const frame = document.getElementById('detailFrame');
    const placeholder = document.getElementById('detailPlaceholder');
    
    if (!url || url === "#") return;
    if (url.startsWith("javascript:")) {
        eval(url.replace("javascript:", ""));
        return;
    }

    placeholder.style.display = 'none';
    frame.style.display = 'block';
    frame.src = url;
}

function toggleFavorite(name) {
    if (favorites.includes(name)) favorites = favorites.filter(f => f !== name);
    else favorites.push(name);
    localStorage.setItem('controlFavs', JSON.stringify(favorites));
    render();
}

function createCardHTML(item, isFav) {
    // Updated to use openDetail instead of direct navigation
    return `
        <div class="card" style="background-color: ${item.color}" onclick="openDetail('${item.link}')">
            <div class="card-link">
                <i class="${item.icon} card-icon"></i>
                <div class="card-name">${item.name}</div>
                <div class="card-desc">${item.description}</div>
            </div>
            <div class="card-footer">
                <button class="fav-btn ${isFav ? 'is-active' : ''}" onclick="event.stopPropagation(); toggleFavorite('${item.name}')">
                    <i class="fa${isFav ? 's' : 'r'} fa-star"></i>
                </button>
            </div>
        </div>
    `;
}

function render() {
    const query = (document.getElementById('searchInput')?.value || '').toLowerCase();
    const container = document.getElementById('mainContainer');
    if (!container) return;
    container.innerHTML = '';
    
    const filtered = menuData.filter(i => 
        i.name.toLowerCase().includes(query) || 
        i.description.toLowerCase().includes(query)
    );

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

    const noResults = document.getElementById('noResults');
    if (noResults) noResults.style.display = filtered.length === 0 ? 'block' : 'none';
}

function exportConfig() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(favorites));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "workspace_favs.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

window.onload = async function() {
    await loadConfig();
    if (sessionStorage.getItem('isControlAuthenticated') === 'true') {
        document.getElementById('authOverlay').style.display = 'none';
        render();
    }
    document.getElementById('searchInput')?.addEventListener('input', render);
};