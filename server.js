import express from 'express';
import mongoose from 'mongoose';
import Cards from './dbCards.js';
import Cors from 'cors';

//App config
const app = express();
const port = process.env.PORT || 8001;
const connection_url =
  'mongodb+srv://admin:tinda@cluster0.lfpuzpv.mongodb.net/tindadb?retryWrites=true&w=majority';

//Middlewares
app.use(express.json());
app.use(Cors());

//DB config
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//API Endpoints
app.get('/', (req, res) => {
  res.status(200).send('Hello clever programmers');
});
app.post('/tinda/cards', (req, res) => {
  const dbCard = req.body;
  Cards.create(dbCard)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((error) => res.status(500).send(error));
  //   Cards.create(dbCard, (err, data) => {
  //     if (err) {
  //       res.status(500).send(err);
  //     } else {
  //       res.status(201).send(data);
  //     }
  //   });
});

app.get('/tinda/cards', (req, res) => {
  Cards.find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});
//Listener

app.listen(port, () => {
  console.log(`Listening on localhost: ${port}`);
});
