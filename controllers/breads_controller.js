const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')
const mongoose = require ('mongoose')
const Baker = require('../models/baker.js')

// NEW
breads.get('/new', (req, res) => {
  Baker.find()
  .then(foundBakers => {
    res.render('new', {
      bakers: foundBakers
    }) 
  })  
})

// INDEX
breads.get('/', (req, res) => {
  Baker.find()
  .then(foundBakers => {
    Bread.find()
    .then(foundBreads => {
      res.render('index', {
        breads: foundBreads,
        bakers: foundBakers,
        title: 'Index Page'
      })
    })
  })  
})

// EDIT
breads.get('/:id/edit', (req, res) => {
  Baker.find()
    .then(foundBakers => {
        Bread.findById(req.params.id)
          .then(foundBread => {
            res.render('edit', {
                bread: foundBread, 
                bakers: foundBakers 
            })
          })
    })
})



// EDIT before populate
// breads.get('/:id/edit', (req, res) => {
//   Bread.findById(req.params.id)
//   .then(foundBread => {
//     res.render('edit', {
//       bread: foundBread
//     })
//   })
  // .catch( err => {
  //   res.send('<h1>404: This is not a page you should be on')
  // })
// })


// SHOW Route
   breads.get('/:id', (req, res) => {
      Bread.findById(req.params.id)
      .populate('baker')
          .then(foundBread => {
            const bakedBy = foundBread.getBakedBy()
            console.log(bakedBy)
              res.render('show', {
                  bread: foundBread
              })
          })
          .catch( err => {
          res.send('<h1>404: This is not a page you should be on')
        })
  })
  
  
  
  
  //Create
  breads.post('/', express.urlencoded({ extended: true }),(req, res)=>{
    // console.log(req.body)
    if (!req.body.image) {
      req.body.image = undefined
    }
    if(req.body.hasGluten === 'on'){
      req.body.hasGluten = 'true'
    } else {
      req.body.hasGluten = 'false'
    }
    Bread.create(req.body)
    .then(() => {
      res.redirect('/breads');
    })
    .catch((error) => {
      console.error('Error creating bread:', error);
      res.status(400).send('Validation failed. this bread could not be created.');
    });
});

  //Delete:
  breads.delete('/:id', (req, res) => {
    Bread.findByIdAndDelete(req.params.id)
    .then(deleteBread => {
      res.status(303).redirect('/breads')
    })
  })
  
  // UPDATE
  breads.put('/:id', 
  express.urlencoded({ extended: true }),
   (req, res) => {
    if(req.body.hasGluten === 'on'){
      req.body.hasGluten = true
    } else {
      req.body.hasGluten = false
    }
    Bread.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(updatedBread => {
      console.log(updatedBread)
      res.redirect(`/breads/${req.params.id}`)
    })
  })
  

module.exports = breads
