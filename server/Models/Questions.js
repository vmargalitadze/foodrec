const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuestionnaireSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
  photos: [String], 
  foodItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Food' }], // Array of food item references
  name: String, 
  hobby: String,
  city: String,
  age: String,
  about: String,
});

const QuestionnaireModel = mongoose.model('Questionnaire', QuestionnaireSchema);

module.exports = QuestionnaireModel;
