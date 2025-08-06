let extractedTokens = {};

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('extractBtn').addEventListener('click', extractTokens);
  
  // Add copy button listeners
  document.getElementById('copyXoxc').addEventListener('click', () => copyToken('xoxc'));
  document.getElementById('copyXoxd').addEventListener('click', () => copyToken('xoxd'));
  document.getElementById('copyDomain').addEventListener('click', () => copyToken('domain'));
  document.getElementById('copyAll').addEventListener('click', copyAllConfig);
});

async function extractTokens() {
  const statusDiv = document.getElementById('status');
  const tokensContainer = document.getElementById('tokensContainer');
  const extractBtn = document.getElementById('extractBtn');
  
  // Show loading state
  statusDiv.className = 'status loading';
  statusDiv.innerHTML = '<span class="loading-spinner"></span>Đang trích xuất tokens...';
  extractBtn.disabled = true;
  tokensContainer.style.display = 'none';
  
  try {
    // Get active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (!tab.url.includes('slack.com')) {
      throw new Error('Vui lòng mở trang Slack trước khi extract tokens');
    }
    
    // Get XOXC token from content script
    let results;
    try {
      results = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: extractXOXCToken
      });
    } catch (error) {
      // Fallback for older Chrome versions
      results = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: extractXOXCToken
      });
    }
    
    const xoxcData = results[0].result;
    
    // Get XOXD token from Chrome Cookies API
    const xoxdCookie = await chrome.cookies.get({
      url: 'https://app.slack.com',
      name: 'd'
    });
    
    if (!xoxcData.xoxc) {
      throw new Error('Không tìm thấy XOXC token. Hãy đảm bảo bạn đã đăng nhập Slack');
    }
    
    extractedTokens = {
      xoxc: xoxcData.xoxc,
      xoxd: xoxdCookie ? xoxdCookie.value : null,
      teamDomain: xoxcData.teamDomain,
      teamName: xoxcData.teamName
    };
    
    // Validate token formats
    if (!extractedTokens.xoxc.startsWith('xoxc-')) {
      throw new Error('XOXC token không đúng định dạng');
    }
    
    if (extractedTokens.xoxd && !extractedTokens.xoxd.startsWith('xoxd-')) {
      throw new Error('XOXD token không đúng định dạng');
    }
    
    // Display tokens
    document.getElementById('xoxcValue').textContent = extractedTokens.xoxc;
    document.getElementById('xoxdValue').textContent = extractedTokens.xoxd || 'Không tìm thấy (có thể không cần)';
    document.getElementById('teamDomain').textContent = extractedTokens.teamDomain || 'Không tìm thấy';
    
    // Create environment config in JSON format
    const envConfig = JSON.stringify({
      "env": {
        "SLACK_XOXC_TOKEN": extractedTokens.xoxc,
        "SLACK_XOXD_TOKEN": extractedTokens.xoxd || "your_xoxd_token_here",
        "SLACK_TEAM_DOMAIN": extractedTokens.teamDomain || "YOUR_TEAM_DOMAIN"
      }
    }, null, 2);
    
    document.getElementById('envConfig').textContent = envConfig;
    
    // Show success state
    statusDiv.className = 'status success';
    statusDiv.innerHTML = '✅ Trích xuất thành công!';
    tokensContainer.style.display = 'block';
    
  } catch (error) {
    console.error('Token extraction error:', error);
    statusDiv.className = 'status error';
    statusDiv.innerHTML = `❌ Lỗi: ${error.message}`;
    tokensContainer.style.display = 'none';
  } finally {
    extractBtn.disabled = false;
  }
}

// Function injected into Slack page - only get XOXC token
function extractXOXCToken() {
  const tokens = {};
  
  try {
    // Extract XOXC token from localStorage
    const localConfig = localStorage.getItem("localConfig_v2");
    
    if (localConfig) {
      const config = JSON.parse(localConfig);
      
      if (config && config.teams) {
        const teamIds = Object.keys(config.teams);
        
        if (teamIds.length > 0) {
          const team = config.teams[teamIds[0]];
          tokens.xoxc = team.token;
          tokens.teamDomain = teamIds[0]; // Team ID
          tokens.teamName = team.name;
        }
      }
    }
    
    // Try to get team domain from URL if not found
    const urlMatch = window.location.pathname.match(/\/client\/([^\/]+)/);
    if (urlMatch && urlMatch[1] && !tokens.teamDomain) {
      tokens.teamDomain = urlMatch[1];
    }
    
  } catch (error) {
    console.error('Error extracting XOXC token:', error);
  }
  
  return tokens;
}

// Copy functions
function copyToken(type) {
  let text = '';
  let buttonId = '';
  
  switch(type) {
    case 'xoxc':
      text = extractedTokens.xoxc;
      buttonId = 'copyXoxc';
      break;
    case 'xoxd':
      text = extractedTokens.xoxd;
      buttonId = 'copyXoxd';
      break;
    case 'domain':
      text = extractedTokens.teamDomain;
      buttonId = 'copyDomain';
      break;
  }
  
  if (text) {
    const button = document.getElementById(buttonId);
    navigator.clipboard.writeText(text).then(() => {
      showCopySuccess(button);
    }).catch(err => {
      console.error('Copy failed:', err);
      showCopyError(button);
    });
  }
}

function copyAllConfig() {
  const envConfig = document.getElementById('envConfig').textContent;
  const button = document.getElementById('copyAll');
  
  navigator.clipboard.writeText(envConfig).then(() => {
    showCopySuccess(button);
  }).catch(err => {
    console.error('Copy failed:', err);
    showCopyError(button);
  });
}

function showCopySuccess(buttonElement) {
  const originalText = buttonElement.textContent;
  const originalClass = buttonElement.className;
  
  // Change button to success state
  buttonElement.textContent = '✓ Copied!';
  buttonElement.className = originalClass + ' copied';
  buttonElement.disabled = true;
  
  setTimeout(() => {
    buttonElement.textContent = originalText;
    buttonElement.className = originalClass;
    buttonElement.disabled = false;
  }, 1500);
}

function showCopyError(buttonElement) {
  const originalText = buttonElement.textContent;
  const originalClass = buttonElement.className;
  
  // Change button to error state
  buttonElement.textContent = '✗ Error';
  buttonElement.className = originalClass + ' error';
  buttonElement.disabled = true;
  
  setTimeout(() => {
    buttonElement.textContent = originalText;
    buttonElement.className = originalClass;
    buttonElement.disabled = false;
  }, 2000);
}