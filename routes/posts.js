//importo express
const express = require('express');

//creo istanza oggetto rotte
const router = express.Router();

//importo postcontroller
const postsController = require('../controllers/postsController');

//rotte di crud

// index
router.get('/', postsController.index);

// show
router.get('/:id', postsController.show);

// store
router.post('/', postsController.store);

// update
router.put('/:id', postsController.update);

// modify
router.patch('/:id', postsController.modify);

// destroy
router.delete('/:id', postsController.destroy);

//esporto istanza rootte
module.exports = router;