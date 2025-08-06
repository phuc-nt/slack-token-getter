// Content script for Slack Token Getter
// Monitors URL changes and provides additional extraction capabilities

let currentTeam = null;
let currentChannel = null;

function extractInfoFromUrl() {
  const match = window.location.pathname.match(/\/client\/([^\/]+)(?:\/([^\/]+))?/);
  if (match) {
    currentTeam = match[1];
    currentChannel = match[2] || null;
    
    // Send info to popup if needed (for future features)
    try {
      chrome.runtime.sendMessage({
        type: 'urlChanged',
        team: currentTeam,
        channel: currentChannel,
        url: window.location.href
      });
    } catch (error) {
      // Popup might not be open, ignore error
    }
  }
}

// Monitor URL changes in Slack SPA
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    extractInfoFromUrl();
  }
}).observe(document, { subtree: true, childList: true });

// Extract info on initial load
extractInfoFromUrl();

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'getPageInfo') {
    sendResponse({
      team: currentTeam,
      channel: currentChannel,
      url: window.location.href,
      title: document.title
    });
  }
  
  if (request.type === 'extractTokens') {
    try {
      const tokens = extractTokensFromPage();
      sendResponse({ success: true, tokens });
    } catch (error) {
      sendResponse({ success: false, error: error.message });
    }
  }
});

// Alternative token extraction method (backup)
function extractTokensFromPage() {
  const tokens = {};
  
  try {
    // Method 1: localStorage
    const localConfig = localStorage.getItem("localConfig_v2");
    if (localConfig) {
      const config = JSON.parse(localConfig);
      if (config && config.teams) {
        const teamIds = Object.keys(config.teams);
        if (teamIds.length > 0) {
          const team = config.teams[teamIds[0]];
          tokens.xoxc = team.token;
          tokens.teamDomain = teamIds[0];
          tokens.teamName = team.name;
        }
      }
    }
    
    // Method 2: cookies
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'd' && value && value.startsWith('xoxd-')) {
        tokens.xoxd = decodeURIComponent(value);
        break;
      }
    }
    
    // Method 3: URL parsing
    const urlMatch = window.location.pathname.match(/\/client\/([^\/]+)/);
    if (urlMatch && urlMatch[1] && !tokens.teamDomain) {
      tokens.teamDomain = urlMatch[1];
    }
    
  } catch (error) {
    console.error('Content script token extraction error:', error);
    throw error;
  }
  
  return tokens;
}

// Debug helper (only in development)
if (typeof window !== 'undefined') {
  window.slackTokenGetter = {
    extractTokens: extractTokensFromPage,
    getCurrentInfo: () => ({
      team: currentTeam,
      channel: currentChannel,
      url: window.location.href
    })
  };
}