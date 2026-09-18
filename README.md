# Stone Paper Scissors — MERN Stack

A 2-player Stone/Paper/Scissors game, 6 rounds per match, with player names,
persistent game history stored in MongoDB, and a separate history page.

## Tech Stack
- **Frontend:** React (Vite), React Router, Axios
- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose)

## Folder Structure
```
stone-paper-scissors/
├── backend/     # Express API + MongoDB models
└── frontend/    # React SPA
```

## Rules
- Stone beats Scissors
- Scissors beat Paper
- Paper beats Stone
- Same choice = Tie
- 6 rounds per game; most round-wins after 6 rounds wins the game (or overall Tie).

## Running Locally

### 1. Backend
```bash
cd backend
cp .env.example .env   # fill in your MongoDB URI
npm install
npm run dev             # starts on http://localhost:5000
```

### 2. Frontend
```bash
cd frontend
cp .env.example .env   # points to your backend URL
npm install
npm run dev             # starts on http://localhost:5173
```

Open `http://localhost:5173` in two browser tabs or just pass the device
between two players. Enter both player names, then play 6 rounds. After
round 6, the result is saved to MongoDB and viewable on the **Game History**
page (`/history`).

## API Endpoints
| Method | Endpoint                  | Description                              |
|--------|----------------------------|-------------------------------------------|
| POST   | `/api/games`               | Create a new game (player names)          |
| PATCH  | `/api/games/:id/complete`  | Save completed 6-round game                |
| GET    | `/api/games`                | List all completed games                   |
| GET    | `/api/games/:id`            | Get a single game                          |

## Deployment (AWS / GCP free tier)

This app is deployed on **[fill in: AWS EC2 / GCP Compute Engine]** free-tier
compute, not on Vercel/Netlify, per the task requirements.

Suggested approach (AWS EC2 free tier, Ubuntu):
1. Launch a `t2.micro`/`t3.micro` EC2 instance (free tier eligible), open ports
   22, 80, 443, and 5000 (or reverse-proxy through Nginx on 80/443).
2. Install Node.js, clone this repo.
3. Set up MongoDB Atlas (free M0 cluster) and put the connection string in
   `backend/.env`.
4. Run backend with `pm2` (`pm2 start server.js --name sps-backend`).
5. Build frontend (`npm run build` inside `frontend/`) and serve the static
   `dist/` folder via Nginx, proxying `/api` requests to the backend on
   port 5000.
6. Point a domain or use the EC2 public IP to access the app.

(Equivalent steps apply on GCP Compute Engine using the always-free `e2-micro`
instance.)

## Live Links
- App: _add your deployed URL here_
- GitHub Repo: _add your repo URL here_
