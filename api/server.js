// BUILD YOUR SERVER HERE

const express = require('express');
const User = require('./users/model')

const server = express();

server.use(express.json());

server.post('/api/users', async (req, res) => {
      
      if(req.body.name || req.body.bio) {
            const newUser = await User.insert({
                  name: req.body.name,
                  bio: req.body.bio
            })
      res.json(newUser)
      }else if (!req.body.name || req.body.bio) {
            return res.status(200).json({message: "you need name and bio for the user"})
      }else {
            return res.status(500).json({message: 'oops there was an error!'})
      }

})

server.get('/api/users', async (req, res) => {
      const user = await User.find()
      if(user) {
            res.json(user)
      }else{
            res.status(500).json({message: "couldn't find user data"})
      }
})

server.get('/api/users/:id', async (req, res) => {
      const user = await User.findById(req.params.id)
      if(user) {
            res.json(user)
      }else if (!user){
            res.status(404).json({message: '404 u know what to doooo'})
      }else{
            res.status(500).json({message: "couldn't find user data"})
      }
})

server.delete('/api/users/:id', async (req, res) => {
      const user = await User.findById(req.params.id)
      if(user){
            User.remove(user.id)
            res.status(204).end()
      }else{
            res.status(404).json({message: "User doesn't exist!"})
      }
})

server.put('/api/users/:id', async (req, res) => {
      const user = await User.findById(req.params.id)
      if(user){
            const updatedUser = User.updateUser(user.id, {
                  name: req.body.name|| user.name,
                  bio: req.body.bio || user.bio
            })
            res.json(updatedUser)
            res.status(200).end()
      }else if(!user.id){
            res.status(404).json({message: "The user doesn't exist!"})
      }else if((!user.name || !user.bio)){
            res.status(400).json({message: "User name and Bio needed!"})
      }else{
            res.status(500).json({message: "Can't modify user data!"})
      }
})


//This will run on all unknown endpoints lol


module.exports = server; // EXPORT YOUR SERVER instead of {}
