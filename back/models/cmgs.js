const mongoose = require("mongoose");

const cmg = new mongoose.Schema(
  {
    cmgPalier1:
    {
      type: Number,
    },
    cmgPalier2:
    {
      type: Number,
    },
    cmgPalier3:
    {
      type: Number,
    },
    cmgPalier4:
    {
      type: Number,
    },
    cmgPalier5:
    {
      type: Number,
    },
    cmgPalier6:
    {
      type: Number,
    },
    tauxParentsIsole:
    {
      type: Number,
    },
    dateDebutAnnee:
    {
        type: Number,
    },
    dateFinAnnee:
    {
        type: Number,
    },
  }
)

const cmgs = mongoose.model('cmg', cmg)

module.exports = { cmgs };