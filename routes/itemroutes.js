const express = require('express');
const router = express.Router();
const item = require('./../models/item');


router.get('/', async (req, res) => {

  try {

    const data = await item.find();
    console.log('data find');
    res.status(200).json(data);


  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'server me kharabi' });
  }
})


router.post('/', async (req, res) => {

  try {
    const data = req.body;
    const newitem = new item(data);
    const datasaved = await newitem.save();

    console.log('data saved')
    res.status(200).json(datasaved);

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'internal server error' });

  }
})

router.get('/:type', async (req, res) => {
  try {
    const type = req.params.type;
    if (type == 'chicken' || type == 'veg' || type == 'masala') {
      const response = await item.find({ ingridient: type });
      console.log('response fetch');



    } else {
      res.status(500).json({ error: 'invalid ingridienttype' })
    }

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'internal server error' });



  }

})

//update data

router.put('/:id', async (req, res) => {
  try {
    const itemid = req.params.id;
    const updateitemdata = req.data;
    const response = await item.findByIdAndUpdate(itemid, updateitemdata, {
      new: true,
      runValidators: true,

    })
    if (!response) {
      return res.status(404).json({ error: 'item not found' })
    }
    console.log('data updated');
    res.status(200).json(response);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'internal error' });
  }

})

//delete data
router.delete('/:id', async (req, res) => {
  try {
    const itemid = req.params.id;
    const response = await item.findByIdAndDelete(itemid)
    if (!response) {
      return res.status(404).json({ error: 'item not found' })

    }
    console.log('data deleted ');
    res.status(200).json({ message: 'data deleted succesfully' });

  } catch (err) {

    console.log(err);
    res.status(500).json({ error: 'internal server error' });


  }

})
module.exports = router;

