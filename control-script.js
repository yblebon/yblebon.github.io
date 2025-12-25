/**
 * control-script.js
 * Handles Admin Authentication via external API and content rendering.
 */

// --- GLOBAL STATE ---
let CONFIG = {};
let favorites = JSON.parse(localStorage.getItem('controlFavs')) || [];

const menuData = [
    { name: "API Feed", cat: "Datasources", link: "#", icon: "fas fa-database", description: "Primary data endpoints.", color: "#5c97bd" },
    { name: "System Logs", cat: "Datasources", link: "#", icon: "fas fa-terminal", description: "Raw system output.", color: "#2d3436" },
    { name: "Summer 2024", cat: "Albums", link: "#", icon: "fas fa-images", description: "Holiday photographs storage.", color: "#e67e22" },
    { name: "Theme Toggle", cat: "Settings", link: "#", icon: "fas fa-paint-brush", description: "Switch between UI modes.", color: "#9b59b6" },
    { name: "User Profile", cat: "Settings", link: "#", icon: "fas fa-user-cog", description: "Manage admin account settings.", color: "#26a69a" },
    { name: "Backup Data", cat: "Settings", link: "javascript:exportConfig()", icon: "fas fa-download", description: "Export workspace favorites.", color: "#8d6e63" }
];

// --- INITIALIZATION ---

/**
 * Loads the external configuration file.
 */
async function loadConfig() {
    try {
        const response = await fetch('config.json');
        if (!response.ok) throw new Error("Config file not found");
        CONFIG = await response.json();
        console.log("Config loaded successfully.");
    } catch (err) {
        console.error("Critical Error: Could not load config.json", err);
        const errorMsg = document.getElementById('authError');
        if (errorMsg) {
            errorMsg.innerText = "System Error: config.json missing or inaccessible.";
            errorMsg.style.display = 'block';
        }
    }
}

// --- AUTHENTICATION ---

document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('authError');
    const submitBtn = e.target.querySelector('button');

    // Ensure config is available
    if (!CONFIG.api_host) {
        await loadConfig();
    }

    // UI Feedback
    submitBtn.innerText = "Authenticating...";
    submitBtn.disabled = true;
    errorMsg.style.display = 'none';

    try {
        // Matches your curl: curl -X POST "$API_HOST/login" -H "Content-Type: application/json" -d "..."
        const authUrl = `${CONFIG.api_host}/login`;
        
        const response = await fetch(authUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok && data.token) {
            // Success: Store JWT and session flag
            sessionStorage.setItem('jwt_token', data.token);
            sessionStorage.setItem('isControlAuthenticated', 'true');
            
            document.getElementById('authOverlay').style.display = 'none';
            render(); 
        } else {
            // API Error
            errorMsg.innerText = data.message || "Unauthorized: Invalid credentials";
            errorMsg.style.display = 'block';
        }
    } catch (error) {
        // Network Error
        console.error("Fetch error:", error);
        errorMsg.innerText = "Connection failed: API Host unreachable.";
        errorMsg.style.display = 'block';
    } finally {
        submitBtn.innerText = "Sign In";
        submitBtn.disabled = false;
    }
});

/**
 * Clears the session and reloads the page.
 */
function logout() {
    sessionStorage.removeItem('jwt_token');
    sessionStorage.removeItem('isControlAuthenticated');
    location.reload();
}

// --- RENDERING LOGIC ---

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
    if (noResults) {
        noResults.style.display = filtered.length === 0 ? 'block' : 'none';
    }
}

/**
 * Simple export function for the "Backup Data" card
 */
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
    
    // Check if user is already logged in
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