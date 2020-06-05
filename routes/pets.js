/** All CRUD Api's */
const express = require('express');
const Joi = require('@hapi/joi');

const Pet = require('../models/pets');
const { validateBody } = require('../middlewares/route');

const router = express.Router();

/** Post Api to Create a Pet with Validation */
router.post(
  '/',
  validateBody(Joi.object().keys({
    name: Joi.string().required().description('Pets name'),
    age: Joi.number().integer().required().description('Pets age'),
    color: Joi.string().required().description('Pets Color'),
  }),
    {
      stripUnknown: true,
    }),
  async (req, res, next) => {
    try {
      const Pets = new Pet(req.body);
      await Pets.save();
      res.status(201).json(Pets);
    } catch (e) {
      next(e);
    }
  }
);

/** Get Api for Fetching Pets by Pet Name */
router.get('/:petId', async (req, res, next) => {
  if (!req.params.petId.trim()) {
    return res.status(400).json({
      message: 'error'
    })
  }
  else {
    await Pet.findById({
      _id: req.params.petId
    }, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result)
      }
    })
  }
});

/** Get Api fro fetching All Pets */
router.get('/', async (req, res, next) => {
  await Pet.find({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

/** Delete Api to delete Pet by ID */
router.delete('/:deleteId', async (req, res, next) => {
  if (!req.params.deleteId.trim()) {
    return res.status(400).json({
      message: 'error'
    })
  }
  else {
    await Pet.deleteOne({ _id: req.params.deleteId }, function (err) {
      if (err) {
        console.log(err);
      }
      else {
        res.send('Deleted');
      }
    });
  }

});

module.exports = router;