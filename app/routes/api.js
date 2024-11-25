var User = require('../models/user');

module.exports = function(router) {
  // http://localhost:8000/users
  router.post('/users', function(req, res) {
    if (!req.body.username || !req.body.password || !req.body.email) {
      return res.status(400).send('Ensure username, email, and password were provided');
    }

    var user = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    });

    user.save()
      .then(() => {
        res.status(201).send('User created successfully');
      })
      .catch(err => {
        if (err.code === 11000) { // Kode error untuk duplikasi
          res.status(400).send('Username or Email already exists!!');
        } else {
          res.status(400).send('Error creating user: ' + err);
        }
      });
  });

  return router;
}