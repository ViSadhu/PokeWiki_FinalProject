import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oidc';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
  methods: ["GET", "POST", "OPTIONS"],
};

const app = express();
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

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

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: 'http://localhost:3000/oauth2/redirect',
    scope: ['email', 'profile']
  },
  (issuer, profile, cb) => cb(null, profile)
));

passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((obj, cb) => cb(null, obj));

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
