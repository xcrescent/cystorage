var express = require('express');
var router = express.Router();

/* GET users listing. */
// Example route: Get all users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
