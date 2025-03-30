
# Project: Pokémon Wiki App

## Project Overview

The Pokémon Wiki App is a web application that allows users to manage and explore their Pokémon collection. Users can add, view, and manage their Pokémon, along with viewing specific details such as name, description, type, generation, region, and the date added. Authentication is handled using Google OIDC, and the app uses HTTP-based authentication for secure access.

## Features

- User authentication via Google OIDC.
- Add and manage Pokémon.
- View Pokémon details in an interactive accordion format.
- Session management using cookies.
- Proper handling of CORS for cross-origin requests.

## Tech Stack

### Frontend

- Vue.js with Composition API
- Vite
- Axios for HTTP requests
- Shadcn-Vue for UI components
- Tailwind CSS for styling

### Backend

- Node.js with Express
- Passport.js with Google OIDC strategy
- Session management using express-session
- CORS for secure cross-origin communication
- dotenv for environment variables
- TypeORM for database management

### Frontend

- Vue.js with Composition API
- Vite
- Axios for HTTP requests
- Shadcn-Vue for UI components
- Tailwind CSS for styling

### Backend

- Node.js with Express
- Passport.js with Google OIDC strategy
- Session management using express-session
- CORS for secure cross-origin communication
- dotenv for environment variables

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/pokemon-manager-app.git
   cd pokemon-manager-app
   ```

2. Install dependencies for both frontend and backend:

   ```bash
   npm install
   cd backend
   npm install
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
SESSION_SECRET=your-session-secret
```

## Server Configuration

This project uses separate servers for frontend and backend, each running on different ports:

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:3000](http://localhost:3000)

## Running the Project

### Backend:

```bash
cd backend
npm run backend
```

### Frontend:

```bash
npm run dev
```

## Project Structure

```
project-root/
├── backend/
│   ├── server.js
│   ├── auth.js
│   └── .env
├── src/
│   ├── components/
│   ├── views/
│   └── services/
└── README.md
```

## API Endpoints

- **GET /auth**: Check authentication status.
- **GET /login**: Initiate login via Google.
- **GET /logout**: Log out the current user.
- **GET /pokemon**: Fetch the list of Pokémon.
- **POST /pokemon**: Add a new Pokémon.
- **DELETE /pokemons/:id** : Remove a Pokémon.

### TypeORM API Server

The application connects to an external API server built using TypeORM for managing the Pokémon database. Ensure the API server is running on the appropriate port before starting the frontend.

- **GET /auth**: Check authentication status.
- **GET /login**: Initiate login via Google.
- **GET /logout**: Log out the current user.
- **GET /pokemon**: Fetch the list of Pokémon.

## Troubleshooting

- **CORS Issues**: Make sure to set `credentials: true` and specify the origin in your server configuration.
- **Session Issues**: Ensure that session secrets and environment variables are correctly configured.
- **Login Loop**: Check that the frontend only triggers login when the login button is clicked.

## License

This project is licensed under the MIT License.
