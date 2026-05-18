# rasha-GPT

## Intro

rasha-GPT is a full-stack AI chat application that combines authenticated conversations, chat history management, speech input, and text translation in one interface. Users can register, verify their login with OTP, start new chats, rename or delete chats, and translate assistant messages into supported languages.

## Live Link

https://rasha-gpt.vercel.app

## Features

- User registration and login with phone-based OTP verification.
- Persistent sessions backed by MongoDB.
- AI chat powered by Groq models with selectable model support.
- Chat history sidebar with search, rename, and delete actions.
- Markdown-rendered assistant replies with code highlighting.
- Voice input support for dictating prompts.
- Message translation with saved translated output per message.
- Toast-style notices and loading states for common actions.

## Tech Stack

### Frontend

- React 19
- Vite
- React Router
- Axios
- Tailwind CSS
- React Markdown and rehype-highlight
- react-speech-recognition
- react-loader-spinner

### Backend

- Node.js
- Express
- MongoDB with Mongoose
- express-session and connect-mongo
- Groq SDK for AI responses
- Twilio for OTP delivery
- Nodemailer for email verification
- Joi for request validation
- CORS and bcrypt

## Folder Structure

| Path                       | Description                                                                                                       |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `backend/`                 | Express API server, database connection, session config, routes, models, utilities, and validation rules.         |
| `backend/config/`          | CORS, session, Mongo session store, and Twilio client setup.                                                      |
| `backend/middlewares/`     | Request guards such as the logged-in user check.                                                                  |
| `backend/models/`          | MongoDB schemas for users, chats, and messages.                                                                   |
| `backend/routes/`          | API routes for auth, chat management, and translation.                                                            |
| `backend/utils/`           | Helper functions for OTP, password hashing, translations, Groq responses, email, and language detection.          |
| `backend/validations/`     | Joi schemas for user and translation request validation.                                                          |
| `frontend/`                | Vite React client application and UI assets.                                                                      |
| `frontend/src/components/` | Screens and reusable UI pieces such as chat window, sidebar, login, register, OTP verify, loaders, and utilities. |
| `frontend/src/context/`    | React context providers for auth state, chat state, and notices.                                                  |
| `frontend/src/config/`     | Axios client configuration for API requests.                                                                      |
| `frontend/public/`         | Static public assets served by Vite.                                                                              |

## Local Setup Guide

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd rashaGPT
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with the required values:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
CLIENT_URL=http://localhost:5173
SERVER_URL=http://localhost:5000
GROQ_API_KEY=your_groq_api_key
LINGO_DEV_API_KEY=your_lingo_dev_api_key
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_email_user
SMTP_PASS=your_email_password
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
VERIFIED_PHONE_NUMBER=your_test_phone_number
```

Note: the login flow only allows OTP verification for the configured `VERIFIED_PHONE_NUMBER`, so set this to the number you want to test with.

Run the backend:

```bash
npm start
```

### 3. Set up the frontend

Open a second terminal:

```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/`:

```env
VITE_BACKEND_BASE_URL=http://localhost:5000
```

Run the frontend:

```bash
npm run dev
```

### 4. Open the app

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Available Scripts

### Backend

- `npm start` - run the production server.
- `npm run dev` - run the server with Nodemon.

### Frontend

- `npm run dev` - start the Vite development server.
- `npm run build` - build the production frontend.
- `npm run preview` - preview the built frontend locally.
