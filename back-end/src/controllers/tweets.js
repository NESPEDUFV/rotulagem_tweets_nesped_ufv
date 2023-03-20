const express = require('express');

const router = express.Router();

const Tweet = require('../models/tweet');

router.get('/listar/todos', async (req, res) => {
  try {

    const tweets = await Tweet.find({});

    return res.send({ tweets });
    
  } catch (err) {
    return res.status(400).send({ error: err });
  }
});

router.get('/listar/rotulados', async (req, res) => {
  try {

    const tweets = await Tweet.find({rotulado: true});

    return res.send({ tweets });
    
  } catch (err) {
    return res.status(400).send({ error: err });
  }
});

router.get('/listar/:idTweet', async (req, res) => {
  try {

    const tweet = await Tweet.find({idTweet: req.params.idTweet});

    return res.send({ tweet });
    
  } catch (err) {
    return res.status(400).send({ error: err });
  }
});

router.get('/listar/tweet/rotular', async (req, res) => {
  try {

    const tweets = await Tweet.find({rotulado: false});

    let tweet = {idTweet: -1, text: 'Não há mais tweets para rotular! Obrigado!'}

    if(tweets.length > 0)
      tweet = tweets[Math.floor(Math.random() * tweets.length)]

    return res.send({ tweet });
    
  } catch (err) {
    return res.status(400).send({ error: err });
  }
});

router.post('/rotular/tweet', async (req, res) => {
  try {

    const tweet = await Tweet.findOneAndUpdate({idTweet: req.body.idTweet}, {rotulado: true, categoriaRotulo: req.body.categoriaRotulo}, {new: true});
    console.log(tweet);

    return res.send({ msg: "Rotulagem realizada com sucesso!" });
    
  } catch (err) {
    return res.status(400).send({ error: err });
  }
});

router.post('/adicionar/dump', async (req, res) => {
  try {

    // const file = require('../../data/Tweets/dadosTwitter.json')
    // console.log(file);

    // const a = await Tweet.deleteMany();
    // console.log(a.deletedCount);

    // console.log(req.body);
    const tweets = await Tweet.insertMany(req.body);

    console.log(tweets.length);

    return res.send({ "msg": "Inserção realizada com sucesso!" });
    
  } catch (err) {
    return res.status(400).send({ error: err });
  }
});

module.exports = app => app.use('/tweets', router);