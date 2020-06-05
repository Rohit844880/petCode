/** All CRUD Api's */
const express = require('express');
const Joi = require('@hapi/joi');

const Pet = require('../models/pets');
const { validateBody } = require('../middlewares/route');

const router = express.Router();
const schema = Joi.object({
  id: Joi.number().required()
});

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
router.get('/:id',validateBody(schema),
  async (req, res, next) => {
    await Pet.findById({
      _id: req.params.id
    }, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result)
      }
    })

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
router.delete('/:id', validateBody(schema),async (req, res, next) => {
  await Pet.deleteOne({ _id: req.params.id }, function (err) {
    if (err) {
      res.send(err);
    }
    else {
      res.send('Deleted');
    }
  });
});

module.exports = router;