import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oidc';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables from.env file
dotenv.config();

// Defining the CORS options
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
  methods: ["GET", "POST", "OPTIONS"],
};

// Express app setup
const app = express();

// CORS setup
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecretkey',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, 
    httpOnly: true, 
    sameSite: 'lax', 
  },
}));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy(
  {
    // Load data from .env file
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: 'http://localhost:3000/oauth2/redirect',
    scope: ['email', 'profile']
  },
  (issuer, profile, cb) => cb(null, profile)
));

// Serialize and deserialize user session data
passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((obj, cb) => cb(null, obj));


/**
 * Handles the authentication route.
 *
 * This route checks if the user is authenticated. If the user is authenticated, it returns a JSON response with the 'authenticated' property set to true and the 'user' property containing the user's profile information.
 * If the user is not authenticated, it returns a JSON response with the 'authenticated' property set to false.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
app.get('/auth', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ authenticated: true, user: req.user });
  } else {
    res.json({ authenticated: false });
  }
});


app.get('/login', passport.authenticate('google'));

app.get("/oauth2/redirect", passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login",
    failureMessage: true,
  }),
  (req, res) => {
    res.redirect("http://localhost:5173/");
  }
);

/**
 * Handles the logout route.
 *
 * This route logs out the user by clearing the session and cookie.
 * It uses Passport's logout method to clear the user's session data.
 * If an error occurs during the logout process, it returns a 500 status code with an error message.
 * Otherwise, it clears the 'connect.sid' cookie and returns a 200 status code with a success message.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }

    res.clearCookie('connect.sid', { 
      httpOnly: true, 
      secure: false,
      sameSite: 'Lax' 
    });

    res.status(200).json({ message: 'Logged out successfully' });
  });
});


app.listen(3000, () => console.log('Back-end running on http://localhost:3000'));
