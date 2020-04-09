var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    brief: String,
    ingredients: [{ type: String, required: true }],
    steps: [{ type: String, required: true }],
    details: {
        type: { type: String },
        main: String,
        occasion: String,
        method: String,
        diet: String
    },
    notes: String
})

var Recipe = mongoose.model('recipes', recipeSchema);

router.post('/recipe/add', (req, res, next) => {

    let newRecipe = new Recipe(req.body)
    newRecipe.save().then(saved => res.json(saved)).catch(err => console.error(err));
});

module.exports = router;