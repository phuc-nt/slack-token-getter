# Release v1.0.0 - Initial Release

## 🎉 First stable release of Slack Token Getter

A secure Chrome extension to quickly extract Slack tokens for development purposes.

## ✨ Features

- **One-click token extraction** - Extract both XOXC and XOXD tokens instantly
- **Chrome Cookies API integration** - Access HttpOnly cookies securely  
- **JSON format output** - Ready-to-use environment configuration
- **Copy button animations** - Smooth UX with visual feedback
- **Security-first approach** - No data storage, local processing only
- **Manifest V3 compliant** - Future-proof extension architecture

## 📦 Installation

### For Chrome Web Store (Recommended)
Download `slack-token-getter-v1.0.0.zip` and follow Chrome Web Store guidelines.

### For Developers
1. Download `slack-token-getter-source-v1.0.0.zip`
2. Extract and load as unpacked extension in Chrome
3. Enable Developer mode in `chrome://extensions/`

## 🔧 Technical Details

- **Browser Support**: Chrome 88+, Edge 88+
- **Permissions**: `activeTab`, `cookies`, `scripting`
- **Domains**: `*.slack.com` only
- **Architecture**: Manifest V3, CSP compliant

## 🛡️ Security

- Zero data collection or transmission
- Local-only token processing  
- No persistent storage of sensitive data
- Domain-restricted operation

## 📄 Files in Release

- `slack-token-getter-v1.0.0.zip` - Chrome Web Store package (11KB)
- `slack-token-getter-source-v1.0.0.zip` - Full source code (19KB)

## 🐛 Known Issues

None reported. Please create an issue if you encounter problems.

## 🎯 Roadmap

- Support for multiple workspaces
- Token expiration detection
- Additional export formats