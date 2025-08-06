# Slack Token Getter

🔑 A secure Chrome extension to quickly extract Slack tokens for development purposes.

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/phuc-nt/slack-token-getter/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Chrome Web Store](https://img.shields.io/badge/chrome-extension-brightgreen.svg)](https://github.com/phuc-nt/slack-token-getter/releases)

## ✨ Features

- **One-click token extraction** - Extract both XOXC and XOXD tokens instantly
- **Chrome Cookies API integration** - Access HttpOnly cookies securely  
- **JSON format output** - Ready-to-use environment configuration
- **Copy button animations** - Smooth UX with visual feedback
- **Security-first approach** - No data storage, local processing only
- **Manifest V3 compliant** - Future-proof extension architecture

## 🚀 Installation

### Option 1: From GitHub Releases (Recommended)

1. **Download the extension**
   - Go to [Releases](https://github.com/phuc-nt/slack-token-getter/releases)
   - Download `slack-token-getter-v1.0.0.zip`

2. **Install in Chrome**
   - Open `chrome://extensions/`
   - Enable "Developer mode" 
   - Click "Load unpacked" → select extracted folder

### Option 2: From Source

```bash
git clone https://github.com/phuc-nt/slack-token-getter.git
cd slack-token-getter
```

Then follow step 2 above.

## 📖 Usage

1. Open your Slack workspace in Chrome browser
2. Click the extension icon in the toolbar
3. Click "Extract Tokens" button
4. Copy individual tokens or the complete configuration

### Output Format
```json
{
  "env": {
    "SLACK_XOXC_TOKEN": "xoxc-1234567890-...",
    "SLACK_XOXD_TOKEN": "xoxd-1234567890-...",
    "SLACK_TEAM_DOMAIN": "T1234567890"
  }
}
```

## 🔧 Technical Details

- **Browser Support**: Chrome 88+, Edge 88+ (Chromium-based)
- **Permissions**: `activeTab`, `cookies`, `scripting`
- **Domains**: `*.slack.com` only
- **Architecture**: Manifest V3, CSP compliant

### Token Extraction Methods
- **XOXC Token**: From `localStorage.localConfig_v2.teams[].token`
- **XOXD Token**: From Chrome Cookies API (`d` cookie with HttpOnly flag)
- **Team Domain**: From URL pathname `/client/{TEAM_ID}`

## 🛡️ Security & Privacy

- **Zero data collection** - No analytics, tracking, or data transmission
- **Local processing only** - All operations happen in your browser
- **No persistent storage** - Tokens are never saved
- **Domain restricted** - Only operates on Slack domains
- **Open source** - Full code transparency

Read our [Privacy Policy](PRIVACY.md) for details.

## 📦 Releases

- **Latest**: [v1.0.0](https://github.com/phuc-nt/slack-token-getter/releases/latest) - Initial stable release
- **Changelog**: [CHANGELOG.md](CHANGELOG.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This extension is for legitimate development and automation purposes only. Users are responsible for complying with Slack's Terms of Service.