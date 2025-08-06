# Privacy Policy

## Data Collection
Slack Token Getter **does not collect, store, or transmit** any personal data or tokens.

## Data Processing
All token extraction happens **locally** in your browser:
- XOXC tokens are read from Slack's localStorage
- XOXD tokens are accessed via Chrome Cookies API
- No data leaves your device

## Permissions Used
- `activeTab`: Access current Slack tab only when you click the extension
- `cookies`: Read Slack cookies (including HttpOnly) for token extraction
- `scripting`: Inject code to read localStorage from Slack pages

## Data Storage
- **No persistent storage** of tokens or personal data
- **No analytics** or tracking
- **No external connections** or API calls

## Domain Restrictions
Extension only operates on:
- `https://app.slack.com/*`
- `https://*.slack.com/*`

## Contact
For privacy concerns, please create an issue on GitHub.