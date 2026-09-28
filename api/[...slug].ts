// Vercel serverless entry point: forwards every /api/* request to the
// same Express app used for local development and for a persistent-host
// deployment (Render, Railway, Fly.io, a VPS, etc).
import app from '../server';

export default app;
