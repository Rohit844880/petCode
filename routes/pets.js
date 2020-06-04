const express = require('express');
const Joi = require('@hapi/joi');

const Pet = require('../models/pets');
const { validateBody } = require('../middlewares/route');

const router = express.Router();

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
      console.log('Rohit',req.body);
      const Pets = new Pet(req.body);
      console.log(Pets);
      await Pets.save();
      res.status(201).json(Pets);
    } catch (e) {
      next(e);
    }
  }
);

router.get('/petget', async (req,res,next) => {
  await Pet.find({}, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

router.post('/:deleteId/delete',async (req,res,next) => {
  if(!req.params.deleteId.trim()){
    return res.status(400).json({
      message:'error'
    })
  }
  else{
    await Pet.deleteOne({_id:req.params.deleteId},function(err){
      if(err){
        console.log(err);
      }
      else{
        res.send('Deleted');
      }
    });
  }
  
})

module.exports = router;