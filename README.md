# Survey Application

A full-stack survey application with user authentication, dynamic survey questions, and a modern UI.

## Features
- User registration and login with JWT authentication
- Survey with multiple question types (text, single-choice, multi-choice)
- Required and optional questions
- Progress bar for survey completion
- Local response storage and review
- Modern UI with React, Tailwind CSS, and purple gradient theming

## Tech Stack
- **Frontend:** React (TypeScript), Tailwind CSS
- **Backend:** Node.js, Express, TypeScript, Prisma ORM
- **Database:** PostgreSQL

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- PostgreSQL

### Backend Setup
1. Install dependencies:
   ```bash
   cd server
   npm install
   ```
2. Configure your database in `.env` (see `.env.example`).
3. Run Prisma migrations:
   ```bash
   npx prisma migrate dev --name init
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Install dependencies:
   ```bash
   cd my-app
   npm install
   ```
2. Start the frontend:
   ```bash
   npm start
   ```

### Usage
- Register a new user or login with existing credentials.
- Complete the survey, answering required questions.
- View your responses after finishing the survey.

## Folder Structure
```
Survey Application/
├── my-app/         # React frontend
├── server/        # Node.js/Express backend
```

## Customization
- Edit survey questions in the database or via backend logic.
- Adjust UI colors and layout in the React components and Tailwind config.

## License
MIT
