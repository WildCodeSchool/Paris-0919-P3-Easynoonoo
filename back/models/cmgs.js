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
    ageEnfant1:
    {
      type: Number,
    },
    ageEnfant2:
    {
      type: Number,
    },
    revenusA:
    {
      type: Number,
    },
    revenusB:
    {
      type: Number,
    },
    revenusC:
    {
      type: Number,
    },
    revenusD:
    {
      type: Number,
    },
    revenusE:
    {
      type: Number,
    },
    revenusF:
    {
      type: Number,
    },
    revenusG:
    {
      type: Number,
    },
    revenusH:
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