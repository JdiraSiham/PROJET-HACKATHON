# Deployment Guide for Smart Skin App

## Live Deployment
**Frontend URL:** [https://frontend-nu-sooty-43.vercel.app](https://frontend-nu-sooty-43.vercel.app)

The Frontend has been deployed to Vercel.

## Backend Deployment (IMPORTANT)
The frontend is currently deployed, but if it relies on the Backend API (Django), that API is likely still running on your **local machine** (localhost).

For the live site to work for everyone (not just you), you must deploy the Backend to a public server (like Render or Railway) and update the Frontend configuration.

### Deployment options for Backend:
[Render](https://render.com/) or [Railway](https://railway.app/) are recommended for Django.

1.  Deploy your `backend` folder to one of these services.
2.  Get the public URL (e.g., `https://my-api.onrender.com`).
3.  Update the Frontend Environment Variable `NEXT_PUBLIC_API_URL` on Vercel to point to this new URL.
4.  Redeploy the Frontend.
