# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Full-stack NFT marketplace application with a React/TypeScript/Vite frontend and Express.js backend. The project uses Tailwind CSS for styling and React Router for navigation.

## Repository Structure

This is a monorepo containing two main applications:
- `NFT-project/` - Frontend React application
- `NFT-project-backend/` - Backend Express API server
- `sources/` - Additional resources/assets

## Development Commands

### Frontend (NFT-project/)

Start development server (runs on port 5000):
```bash
cd NFT-project
npm run dev
```

Build for production:
```bash
cd NFT-project
npm run build
```

Run linter:
```bash
cd NFT-project
npm run lint
```

Preview production build:
```bash
cd NFT-project
npm run preview
```

### Backend (NFT-project-backend/)

Start development server with hot reload (runs on port 3000):
```bash
cd NFT-project-backend
npm run dev
```

### Full Stack Development

To run both frontend and backend simultaneously, open two terminal sessions:

Terminal 1 - Backend:
```bash
cd NFT-project-backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd NFT-project
npm run dev
```

The frontend (http://localhost:5000) will communicate with the backend (http://localhost:3000).

## Architecture

### Frontend Architecture

**Tech Stack:**
- React 19 with TypeScript
- Vite as build tool and dev server
- React Router for client-side routing
- Axios for HTTP requests
- Tailwind CSS v4 for styling
- ESLint for code quality

**Project Structure:**
- `src/pages/` - Page components organized by route
  - `HomePage/` - Main landing page
  - `HomePage/LoginPage/` - Authentication pages (login/register forms)
- `src/shared/` - Reusable components (e.g., MainMenu navigation)
- `src/App.tsx` - Root component with routing configuration
- `src/main.tsx` - Application entry point with BrowserRouter setup

**Key Patterns:**
- Component-based architecture with CSS modules per component
- Centralized routing in App.tsx using react-router
- Page-level state management with React hooks
- API calls are made directly in components using axios

### Backend Architecture

**Tech Stack:**
- Node.js with ES modules
- Express.js web framework
- CORS enabled for frontend communication

**Structure:**
- `server.js` - Main server entry point
- `RestClients/Api.rest` - REST client file for API testing (use REST Client extension in VS Code)

**API Configuration:**
- Port: 3000
- CORS origin: http://localhost:5000 (frontend dev server)
- Current endpoints:
  - `GET /menu` - Returns menu items

### Communication Flow

1. Frontend (Vite dev server on :5000) makes requests to backend (:3000)
2. Backend has CORS configured to accept requests from frontend origin
3. API responses are handled via axios in React components
4. State updates trigger UI re-renders

## TypeScript Configuration

The frontend uses three TypeScript configs:
- `tsconfig.json` - Base configuration
- `tsconfig.app.json` - Application-specific settings
- `tsconfig.node.json` - Node.js/build tool settings

## Styling

The project uses Tailwind CSS v4 with the Vite plugin for instant HMR. Tailwind classes are used alongside component-specific CSS files where needed.

## Important Notes

- The backend uses `--watch` flag for hot reloading (Node.js built-in, no nodemon needed for dev script)
- Frontend dev server port is explicitly set to 5000 in vite.config.ts
- Login page has conditional rendering for login vs. registration forms
- Password visibility toggle is implemented at the LoginPage level
