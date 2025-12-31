/**
 * control-script.js
 * Handles Admin Authentication and modular master-detail rendering.
 */

// --- GLOBAL STATE ---
let CONFIG = {};
let favorites = JSON.parse(localStorage.getItem('controlFavs')) || [];

const menuData = [
    { 
        name: "Tasks", 
        cat: "Datasources", 
        link: "tasks.html", 
        icon: "fas fa-tasks", 
        description: "Track project milestones and daily to-dos.", 
        color: "#2ecc71" 
    },
    { 
        name: "Voice notes", 
        cat: "Datasources", 
        link: "voices.html", 
        icon: "fas fa-microphone", 
        description: "Record and manage voice memos.", 
        color: "#ff7675" 
    },
    { 
        name: "Bookmarks", 
        cat: "Datasources", 
        link: "bookmarks.html", 
        icon: "fas fa-bookmark", 
        description: "Manage saved web resources and articles.", 
        color: "#f1c40f" 
    },
    { 
        name: "Videos", 
        cat: "Datasources", 
        link: "videos.html", 
        icon: "fas fa-video", 
        description: "Manage video library and metadata.", 
        color: "#f39c12" 
    },
    { 
        name: "Books", 
        cat: "Datasources", 
        link: "books.html", 
        icon: "fas fa-book-open", 
        description: "Manage library entries and book excerpts.", 
        color: "#6c5ce7" 
    },
    { 
        name: "Jokes", 
        cat: "Datasources", 
        link: "jokes.html", 
        icon: "fas fa-laugh-squint", 
        description: "Manage visual jokes and comic content.", 
        color: "#fd9644" 
    },
    { 
        name: "Photos", 
        cat: "Albums", 
        link: "photos.html", 
        icon: "fas fa-camera", 
        description: "Manage high-resolution photography and assets.", 
        color: "#686de0" 
    },
    { 
        name: "System Health", 
        cat: "Datasources", 
        link: "health.html", 
        icon: "fas fa-terminal", 
        description: "System healh.", 
        color: "#2d3436" 
    },
    { 
        name: "Files", 
        cat: "Datasources", 
        link: "files.html", 
        icon: "fas fa-database", 
        description: "Files manager.", 
        color: "#2d3436" 
    },
    { name: "API Feed", cat: "Datasources", link: "api-feed.html", icon: "fas fa-database", description: "JSON configuration viewer.", color: "#5c97bd" },
    { name: "Summer 2024", cat: "Albums", link: "album-view.html", icon: "fas fa-images", description: "Holiday photographs storage.", color: "#e67e22" },
    { name: "Theme Toggle", cat: "Settings", link: "theme-settings.html", icon: "fas fa-paint-brush", description: "Switch between UI modes.", color: "#9b59b6" },
    { name: "User Profile", cat: "Settings", link: "profile.html", icon: "fas fa-user-cog", description: "Manage admin account settings.", color: "#26a69a" },
    { name: "Backup Data", cat: "Settings", link: "javascript:exportConfig()", icon: "fas fa-download", description: "Export workspace favorites.", color: "#8d6e63" }
];

// --- INITIALIZATION ---

async function loadConfig() {
    try {
        const response = await fetch('config.json');
        if (!response.ok) throw new Error("Config file not found");
        CONFIG = await response.json();
    } catch (err) {
        console.error("Critical Error: Could not load config.json", err);
    }
}

// --- CORE FUNCTIONS ---

/**
 * Updates the Detail Pane iframe with the selected content
 */
function openDetail(url) {
    const frame = document.getElementById('detailFrame');
    const placeholder = document.getElementById('detailPlaceholder');
    
    if (!url || url === "#") return;

    // Handle special javascript links like Export
    if (url.startsWith("javascript:")) {
        const script = url.replace("javascript:", "");
        eval(script);
        return;
    }

    placeholder.style.display = 'none';
    frame.style.display = 'block';
    frame.src = url;
}

function toggleFavorite(name) {
    if (favorites.includes(name)) {
        favorites = favorites.filter(f => f !== name);
    } else {
        favorites.push(name);
    }
    localStorage.setItem('controlFavs', JSON.stringify(favorites));
    render();
}

function createCardHTML(item, isFav) {
    return `
        <div class="card" style="background-color: ${item.color}" onclick="openDetail('${item.link}')">
            <div class="card-link" style="cursor: pointer;">
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
    const searchInput = document.getElementById('searchInput');
    const query = (searchInput ? searchInput.value : '').toLowerCase();
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
    if (noResults) {
        noResults.style.display = filtered.length === 0 ? 'block' : 'none';
    }
}

// --- AUTHENTICATION ---

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
        const response = await fetch(`${CONFIG.api_host}/api/auth/login`, {
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

function exportConfig() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(favorites));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "workspace_favs.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

// --- BOOTSTRAP ---

window.onload = async function() {
    await loadConfig();
    
    if (sessionStorage.getItem('isControlAuthenticated') === 'true') {
        const overlay = document.getElementById('authOverlay');
        if (overlay) overlay.style.display = 'none';
        render();
    }

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', render);
    }
};