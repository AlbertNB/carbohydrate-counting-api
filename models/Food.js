const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({ 
  _id: mongoose.Schema.Types.ObjectId, 
  food: String,
  brand: String,
  caloriesGram: Number,
  carbohydrateGram: Number,
  proteimGram: Number,
  fatsGram: Number,
  portions: [{
      name: String,
      weightGram: Number
  }]
});

module.exports = mongoose.model('foods', FoodSchema);