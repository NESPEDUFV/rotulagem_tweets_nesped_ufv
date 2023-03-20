const express = require('express');
// const path = require('path');
var cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv/config');

const PORT = 3000;
const HOST = '0.0.0.0';

const app = express();

app.use(cors());
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({ extended: false, limit: '5mb' }));

app.set('view engine', 'ejs');
app.use(express.static('public'));
// app.use('/static/public', express.static('public'));

// app.get('/', (req, res) => {
//   res.send('Ok');
// });

require('./controllers/tweets')(app);

// ---------------------------------- //
// Executar o server normalmente

app.listen(process.env.PORT || PORT, HOST, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
}); // yarn run dev