/** All CRUD Api's */
const express = require('express');
const Joi = require('@hapi/joi');

const Pet = require('../models/pets');
const { validateBody, validateParams } = require('../middlewares/route');

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
router.get('/:id', validateParams({
  id: Joi.number().required().description("id is required")
},
  {
    stripUnknown: true,
  }),
  async (req, res, next) => {
    try {
      const response = await Pet.findById({
        _id: req.params.id
      }, (err, result) => {
        if (err) {
          res.send(err);
        } else {
          res.send(result)
        }
      });
      return response;
    } catch (e) {
      next(e)
    }
  });

/** Get Api for fetching All Pets */
router.get('/', async (req, res, next) => {
  try {
    const response = await Pet.find({}, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
    return response;
    console.log(response);
  } catch (e) {
    next(e)
  }
});

/** Delete Api to delete Pet by ID */
router.delete('/:id', validateParams({
  id: Joi.number().required().description("id is required")
},
  {
    stripUnknown: true,
  }),
  async (req, res, next) => {
    try {
      await Pet.deleteOne({ _id: req.params.id }, function (err) {
        if (err) {
          res.send(err);
        }
        else {
          res.send('Deleted');
        }
      });
    } catch (e) {
      next(e)
    }
  });

module.exports = router;