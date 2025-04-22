const mongoose = require('mongoose');
const crypto = require('crypto');

const activitySchema = new mongoose.Schema({
  time: String,
  description: String,
  location: String,
});

const itinerarySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: { type: String, required: true },
    destination: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    activities: [activitySchema],
    shareableId: { type: String, unique: true }
  },
  { timestamps: true }
);

itinerarySchema.methods.generateShareableId = function () {
  return crypto.randomBytes(10).toString('hex');
};

itinerarySchema.index({ userId: 1 });
itinerarySchema.index({ destination: 1 });

const Itinerary = mongoose.model('Itinerary', itinerarySchema);

module.exports = Itinerary;
