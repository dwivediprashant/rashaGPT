// session options
const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: Date.now() + 24 * 60 * 60 * 1000, //24 hrs (in ms)
    httpOnly: true,
  },
};

export default sessionOptions;
