# Slack Token Getter

🔑 Chrome extension để nhanh chóng trích xuất Slack tokens cho development.

## ✨ Tính năng

- **One-click extraction** - Lấy tokens chỉ với một click
- **An toàn** - Chỉ hoạt động trên Slack, không lưu trữ tokens  
- **JSON format** - Export config sẵn sàng sử dụng
- **Copy feedback** - Button animation khi copy thành công

## 🚀 Cài đặt

1. **Download extension**
   ```bash
   git clone <repo-url>
   cd slack-token-getter
   ```

2. **Load vào Chrome**
   - Mở `chrome://extensions/`
   - Bật "Developer mode"
   - Click "Load unpacked" → chọn thư mục này

3. **Pin extension** vào toolbar

## 📖 Sử dụng

1. Mở Slack workspace trong Chrome
2. Click extension icon → "Extract Tokens"
3. Copy tokens hoặc toàn bộ config

### Output format
```json
{
  "env": {
    "SLACK_XOXC_TOKEN": "xoxc-...",
    "SLACK_XOXD_TOKEN": "xoxd-...",
    "SLACK_TEAM_DOMAIN": "T1234567890"
  }
}
```

## 🛡️ Bảo mật

- Chỉ hoạt động trên `*.slack.com`
- Không lưu trữ hoặc gửi tokens đi đâu
- Sử dụng Chrome Cookies API để bypass HttpOnly restriction
- Tất cả xử lý diễn ra local

## 🔧 Technical

**Extraction methods:**
- XOXC: `localStorage.localConfig_v2.teams[].token`
- XOXD: Chrome Cookies API (`d` cookie)
- Team ID: URL pathname `/client/{TEAM_ID}`

**Browser support:** Chrome 88+, Edge 88+ (Manifest V3)

## ⚠️ Disclaimer

Chỉ sử dụng cho development hợp pháp. Tuân thủ Terms of Service của Slack.