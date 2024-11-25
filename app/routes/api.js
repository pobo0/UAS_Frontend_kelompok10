var User = require('../models/user');

module.exports = function (router) {
  // Endpoint untuk registrasi user
  router.post("/users", async function (req, res) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).send("Please fill all required fields.");
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