let mongoose = require('mongoose'),
    Card = mongoose.model('Card');
let path = require('path');

module.exports = function(app) {

  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
  });

  app.get('/api/cards', function (req, res) {
    console.log('hey');
    Card.find(function (err, cards) {
      if (err) res.send(err);

      res.json(cards);
    });
  });

  app.post('/api/cards', function (req, res) {
    Card.create({
      name: req.body.name,
      text: req.body.text,
      rarity: req.body.rarity,
      cost: req.body.cost,
      attack: req.body.attack,
      health: req.body.health,
      tribe: req.body.tribe,
    }, function (err, card) {
      if (err) res.send(err);

      Card.find(function (err, cards) {
        if (err) res.send(err);

        res.send(cards);
      });
    });
  });

  app.put('/api/cards/:card_id', function (req, res) {
    Card.findById(req.params.card_id, function (err, card) {
      if (err) res.send(err);

      card.name = req.body.name;
      card.text = req.body.text;
      card.rarity = req.body.rarity;
      card.cost = req.body.cost;
      card.attack = req.body.attack;
      card.health = req.body.health;
      card.tribe = req.body.tribe;
      card.save(function (err, updatedCard) {
        if (err) res.send(err);

        Card.find(function (err, cards) {
            if (err) res.send(err);

            res.send(cards);
        });
      });
    });
  });

  app.delete('/api/cards/:card_id', function (req, res) {
    Card.remove({
      _id: req.params.card_id
    }, function (err, card) {
      if (err) res.send(err);

      Card.find(function (err, cards) {
        if (err) res.send(err);

        res.send(cards);
      });
    });
  });
};
