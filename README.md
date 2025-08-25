# Frontend (React)

This is the frontend for the Survey Application, built with React and TypeScript.

## Features
- User registration and login
- Dynamic survey with text, single-choice, and multi-choice questions
- Required question validation
- Progress bar and modern UI (Tailwind CSS)
- Local response review after survey completion

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Setup
1. Install dependencies:
	```bash
	npm install
	```
2. Start the frontend:
	```bash
	npm start
	```

## Folder Structure
```
my-app/
├── src/
│   ├── components/
│   ├── api/
│   └── ...
├── public/
└── ...
```

## Customization
- Edit survey UI and logic in `src/components/Survey.tsx`.
- Adjust theme/colors in Tailwind config or component classes.

## Components and Files Overview

### `src/components/`
- **Register.tsx**: Registration form for new users. Handles validation, error display, and calls the backend API to register a user.
- **Login.tsx**: Login form for existing users. Handles validation, error display, and calls the backend API to authenticate. Stores the JWT token in localStorage.
- **Survey.tsx**: Main survey component. Fetches questions, manages survey state, validates required questions, displays a progress bar, and shows user responses after completion.
- **accessTab.tsx**: Tabbed interface for switching between Register and Login. Manages authentication state and renders the Survey component after login.

### `src/api/`
- **api.ts**: Contains all API functions for communicating with the backend (register, login, getQuestions, submitResponse, etc.). Handles fetch requests and error management.

### `public/`
- **index.html**: Main HTML file loaded by React. Contains the root div and meta tags.
- **favicon.ico**, **logo.svg**, etc.: Static assets for branding and icons.

### Root Files
- **package.json**: Lists project dependencies and scripts.
- **tsconfig.json**: TypeScript configuration.
- **tailwind.config.js**: Tailwind CSS configuration.
- **postcss.config.js**: PostCSS configuration for Tailwind.
- **README.md**: Project documentation (this file).
- **.gitignore**: Specifies files/folders to exclude from git.
- **.env.example**: Example environment variables (never commit real `.env`).

---

Each component and file is modular and focused on a single responsibility, making the codebase easy to maintain and extend.

## License
MIT
