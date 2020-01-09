const mongoose = require("mongoose");

const cmg = new mongoose.Schema(
  {
    palier1:
    {
      type: Number,
    },
    palier2:
    {
      type: Number,
    },
    palier3:
    {
      type: Number,
    },
    palier4:
    {
      type: Number,
    },
    palier5:
    {
      type: Number,
    },
    palier6:
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