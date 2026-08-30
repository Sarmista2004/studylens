# StudyLens

StudyLens is a study tracking and productivity app — track subjects, run focus sessions, plan your schedule, and see analytics on your study habits.

This repository combines the frontend and backend into a single repo for easier development.


## Live App

https://studylens-lilac.vercel.app


## Structure

```
studylens/
├── studylens/     # Frontend — React + Vite
└── server/        # Backend — Node.js + Express API
```

## Frontend (`studylens/`)

- Built with React and Vite
- Requires an environment variable `VITE_API_URL` pointing to the backend API (e.g. `https://studylens-backend.vercel.app/api`)

To run locally:
```bash
cd studylens
npm install
npm run dev
```

## Backend (`server/`)

- Built with Node.js and Express
- Requires environment variables for the database connection and `FRONTEND_URL` (used for CORS)
- See `.env.example` for required variables

To run locally:
```bash
cd server
npm install
npm run dev
```

## Deployment

Both the frontend and backend are deployed on Vercel from this repo, each as a separate Vercel project with its own Root Directory setting (`studylens` and `server` respectively).

## License

Personal project — all rights reserved.
