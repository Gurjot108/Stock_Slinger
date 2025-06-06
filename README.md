# 📈 StockSlinger

StockSlinger is a full-stack stock market dashboard web app built with the **MERN stack**, designed to deliver real-time market data, news, and personalized watchlist features.

It fetches financial data from **Financial Modeling Prep (FMP)** and **Finnhub** APIs and integrates **Auth0** for user authentication. The app is deployed with **Vercel (frontend)** and **Render (backend)**, and is mobile-responsive with a modern UI.

---

## 🔗 Live Demo

- Frontend: [https://stockslinger.vercel.app](https://stockslinger.vercel.app)
- Backend: [https://stockslinger-api.onrender.com](https://stockslinger-api.onrender.com)

---

## 🚀 Features

- 🔐 **User Authentication** using Auth0
- 📊 **Market Overview** with global indices and price movements
- 📈 **Company Insights** with charts, metrics, and real-time quotes
- 🗞️ **Financial News Feed** using Finnhub API
- ⭐ **Watchlist Management** for personalized stock tracking
- ⚙️ **RESTful API Integration** with FMP and Finnhub
- 🌐 **Deployed to Production** with secure environment handling and CORS setup

---

## 🛠️ Tech Stack

| Layer       | Tech                                     |
|-------------|------------------------------------------|
| Frontend    | React, Next.js, Tailwind CSS             |
| Backend     | Node.js, Express.js                      |
| Database    | MongoDB + Mongoose                       |
| Auth        | Auth0                                    |
| APIs        | Financial Modeling Prep, Finnhub         |
| Deployment  | Vercel (frontend), Render (backend)      |

---

## 📁 Folder Structure

```
stockslinger/
├── client/               # Next.js frontend
│   ├── components/       # Reusable UI components
│   ├── pages/            # Routes for the app
│   ├── public/           # Static assets
│   └── utils/            # API helpers, constants
├── server/               # Express backend
│   ├── controllers/      # Business logic
│   ├── routes/           # API endpoints
│   ├── config/           # DB and API config
│   └── models/           # Mongoose models
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/stockslinger.git
cd stockslinger
```

### 2. Install Dependencies

#### Backend
```bash
cd server
npm install
```

#### Frontend
```bash
cd ../client
npm install
```

---

### 3. Environment Variables

#### Backend `.env`
Create a `.env` file in `server/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
FINNHUB_API_KEY=your_finnhub_key
FRONTEND_URL=http://localhost:3000
```

#### Frontend `.env.local`
Create a `.env.local` in `client/`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
AUTH0_SECRET=your_auth0_secret
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=https://your-auth0-domain
AUTH0_CLIENT_ID=your_auth0_client_id
AUTH0_CLIENT_SECRET=your_auth0_client_secret
```

> Replace `your_*` values with actual credentials.

---

## 🧪 Running Locally

### Start Backend
```bash
cd server
npm start
```

### Start Frontend
```bash
cd client
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## 🌍 Deployment

### Frontend (Vercel)
- Connect the `client/` folder to Vercel.
- Add `.env` variables in Vercel dashboard.
- Set build command to `npm run build` and output to `.next`.

### Backend (Render)
- Create a new Web Service and connect `server/` repo.
- Set environment variables in Render dashboard.
- Auto-deploy on new commits.

---

## 🔐 Auth0 Setup

1. Go to [Auth0](https://auth0.com/) and create an application.
2. Add your callback URLs and allowed logout URLs.
3. Copy credentials to frontend `.env.local`.
4. Wrap pages with `withPageAuthRequired` (for protection).

---

## 📸 Screenshots

| Dashboard | Company Page | Watchlist |
|----------|--------------|-----------|
| ![](./screenshots/dashboard.png) | ![](./screenshots/company.png) | ![](./screenshots/watchlist.png) |

---

## ✨ Future Improvements

- Add user stock portfolio with buy/sell logic
- Add news filtering by ticker
- Optimize API caching and performance

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Built with ❤️ by [Gurjot Singh](https://github.com/gurjot217)
