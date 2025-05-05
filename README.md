# dls-worker

A lightweight and efficient DLSite RJ works' data retriever designed specifically for Cloudflare Workers deployment. This service provides easy access to DLSite product information through a simple API interface.

## ⚠️ Important Notice

This project is designed to be deployed on Cloudflare Workers and must be used in compliance with DLSite's terms of service and usage rules. Please ensure you:

- Follow DLSite's terms of service and usage guidelines
- Respect rate limits and fair usage policies
- Use the API responsibly and for legitimate purposes
- Do not use this service for any unauthorized or commercial purposes without proper permission

## 🌟 Features

- **Cloudflare Workers Optimized**: Specifically designed for Cloudflare's edge computing platform
- **Two API Endpoints**:
  - `/full/:rjc` - Returns complete raw data from DLSite API
  - `/pretty/:rjc` - Returns refined and beautified data
- **Lightweight**: Minimal dependencies and optimized for edge computing
- **Global Availability**: Leverages Cloudflare's global edge network

## 🚀 Deployment to Cloudflare Workers

1. First, install Wrangler CLI globally:
```bash
npm install -g wrangler
```

2. Login to your Cloudflare account:
```bash
wrangler login
```

3. Clone the repository:
```bash
git clone https://github.com/yourusername/dls-worker.git
cd dls-worker
```

4. Install dependencies:
```bash
npm install
```

5. Deploy to Cloudflare Workers:
```bash
wrangler deploy
```

## 📝 API Usage

### Get Full Data
```http
GET /full/RJ123456
```
Returns complete raw data from DLSite API.

### Get Pretty Data
```http
GET /pretty/RJ123456
```
Returns refined data with the following structure:
```json
{
  "age_category": "string",
  "product_id": "string",
  "product_name": "string",
  "product_image": "string",
  "product_price": "number",
  "product_official_price": "number",
  "created_by": ["string"],
  "scenario_by": ["string"],
  "illust_by": ["string"],
  "voice_by": ["string"],
  "genres": ["string"],
  "update_date": "string",
  "regist_date": "string"
}
```

## 🛠️ Development

### Prerequisites
- Node.js (v16 or higher)
- Wrangler CLI
- Cloudflare account with Workers enabled

### Local Development
```bash
wrangler dev
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/dls-worker/issues).

## 📞 Support

If you encounter any issues or have questions, please open an issue in the GitHub repository.

## ⚖️ Legal Disclaimer

This project is not affiliated with, authorized, maintained, sponsored, or endorsed by DLSite or any of its affiliates or subsidiaries. This is an independent and unofficial project. Use at your own risk.
