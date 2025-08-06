const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema(
  {
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    qrUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

tableSchema.index({ restaurant: 1, number: 1 }, { unique: true });

module.exports = mongoose.model('Table', tableSchema);
