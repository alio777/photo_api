const express = require('express');
const router = express.Router();
const auth = require('../controllers/middlewares/auth');

/* GET / */
router.get('/', (req, res) => {
	res.send({ status: 'Världens bästa photoAlbum lyckad!' });
});

router.use('/albums', require('./albums'));
router.use('/photos', require('./photos'));
router.use('/login', [auth.basic], authController.login);
router.use('/users', require('./users'));

module.exports = router;
