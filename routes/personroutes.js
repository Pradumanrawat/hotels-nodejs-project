const express = require('express');
const router = express.Router();
const person = require('./../models/person')

//person get method to send data by users.
router.get('/', async (req, res) => {
  try {
    const data = await person.find()
    console.log('data fetched');
    res.status(200).json(data);
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ error: 'internal server error' });

  }
})


//person post method to save data in database.
router.post('/', async (req, res) => {

  try {
    const data = req.body//assuming the request body contain the person data
    const newperson = new person(data);
    const saveddata = await newperson.save()

    console.log('data saved')
    res.status(200).json(saveddata);


  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'internal server error' });

  }
})

//get data to get person work type.
router.get('/:worktype', async (req, res) => {
  try {
    const worktype = req.params.worktype;
    if (worktype == 'chef' || worktype == 'manager' || worktype == 'waiter') {
      const response = await person.find({ work: worktype });
      console.log('response fetch');

    }
    else {
      res.status(500).json({ error: 'invalid worktype' })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'internal server error' });

  }

})


//update data 
router.put('/:id', async (req, res) => {
  try {
    const personid = req.params.id;//extract the id from url parameter.
    const updatedpersondata = req.data;//updated for the person.
    const response = await person.findByIdAndUpdate(personid, updatedpersondata, {
      new: true,//return the updated data
      runValidators: true,//run moongoose validation

    })

    if (!response) {
      return res.status(404).json({ error: 'person not found' });

    }
    console.log('data updated')
    res.status(200).json(response)

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'internal error' });

  }
})


//delete data
router.delete('/:id', async (req, res) => {
  try {
    const personid = req.params.id;

    const response = await person.findByIdAndDelete(personid);
    if (!response) {
      return res.status(404).json({ error: 'person not found' });

    }
    console.log('data deleted');
    res.status(200).json({ message: 'person deleted successfully' })


  } catch (err) {

    console.log(err);
    res.status(500).json({ error: 'internal server error' });

  }

})
//export rouer files
module.exports = router;

