const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();

const usersRoutes = require('./routes/users.routes.js');
const adsRoutes = require('./routes/ads.routes.js');
const authRoutes = require('./routes/auth.routes.js');

mongoose.connect('mongodb+srv://Grzegonim:tl31njirDbdh4OnF@cluster0.xzoiqmy.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'advertDB' });
const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to the advert datebase', process.env.NODE_ENV);
});
db.on('error', err => console.log('Error' + err));

app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
/*if(process.env.NODE_ENV !== 'production') {
  app.use(
    cors({
      origin: ['http://localhost:3000'],
      credentials: true,
    })
  );
}*/
if(process.env.NODE_ENV !== 'production') {
  app.use(
    cors({
      origin: ['http://localhost:3000'],
      methods: ["POST", "PUT", "GET", "OPTIONS", "DELETE", "HEAD"],
      credentials: true,
    })
  );
};

app.use(session({ 
  secret: 'xyz', 
  store: MongoStore.create({
  mongoUrl: 'mongodb://localhost:27017/advertDB'
  }),
  resave: false,
  saveUninitialized: true,
  cookie: {
    //secure: process.env.NODE_ENV == 'production',
  }
}));


app.use('/api', usersRoutes);
app.use('/api', adsRoutes);
app.use('/auth', authRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.listen(process.env.PORT || 8001, (req, res) => {
  console.log('Server is running on port: 8001');
});
