const User = require("../models/user");

module.exports = function (router) {
  // Endpoint untuk registrasi user
  router.post("/users", async function (req, res) {
    const { username, email, password } = req.body;
    const User = require("../models/user");

    module.exports = function (router) {
      // Endpoint untuk registrasi user
      router.post("/users", async function (req, res) {
        const { username, email, password } = req.body;
    
        if (!username || !email || !password) {
          return res.status(400).send("Please fill all required fields.");
        }
    
        const newUser = new User({ username, email, password });
    
        try {
          await newUser.save();
          res.status(201).send("User created successfully!");
        } catch (error) {
          if (error.code === 11000) {
            res.status(400).send("Email or Username already exists.");
          } else {
            res.status(500).send("Server error: " + error.message);
          }
        }
      });
    
      return router;
    };
    
    if (!username || !email || !password) {
      return res.status(400).send("Please fill all required fields.");
    }

    const newUser = new User({ username, email, password });

    try {
      await newUser.save();
      res.status(201).send("User created successfully!");
    } catch (error) {
      if (error.code === 11000) {
        res.status(400).send("Email or Username already exists.");
      } else {
        res.status(500).send("Server error: " + error.message);
      }
    }
  });

  return router;
};
