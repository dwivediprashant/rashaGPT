import createSessionStore from "./store.js";
// session options

const store = createSessionStore();

const sessionOptions = {
  store,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24*60*60*1000, //24 hrs (in ms)
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  },
};

export default sessionOptions;
