const mongoose = require("mongoose");

const cmg = new mongoose.Schema(
  {
    cmgCouplePalier1:
    {
      type: Number,
    },
    cmgCouplePalier2:
    {
      type: Number,
    },
    cmgCouplePalier3:
    {
      type: Number,
    },
    cmgCouplePalier4:
    {
      type: Number,
    },
    cmgCouplePalier5:
    {
      type: Number,
    },
    cmgCouplePalier6:
    {
      type: Number,
    },
    cmgParentIsolePalier1:
    {
      type: Number,
    },
    cmgParentIsolePalier2:
    {
      type: Number,
    },
    cmgParentIsolePalier3:
    {
      type: Number,
    },
    cmgParentIsolePalier4:
    {
      type: Number,
    },
    cmgParentIsolePalier5:
    {
      type: Number,
    },
    cmgParentIsolePalier6:
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
    coupleRevenusA:
    {
      type: Number,
    },
    coupleRevenusB:
    {
      type: Number,
    },
    coupleRevenusC:
    {
      type: Number,
    },
    coupleRevenusD:
    {
      type: Number,
    },
    coupleRevenusE:
    {
      type: Number,
    },
    coupleRevenusF:
    {
      type: Number,
    },
    coupleRevenusG:
    {
      type: Number,
    },
    coupleRevenusH:
    {
      type: Number,
    },
    parentIsoleRevenusA:
    {
      type: Number,
    },
    parentIsoleRevenusB:
    {
      type: Number,
    },
    parentIsoleRevenusC:
    {
      type: Number,
    },
    parentIsoleRevenusD:
    {
      type: Number,
    },
    parentIsoleRevenusE:
    {
      type: Number,
    },
    parentIsoleRevenusF:
    {
      type: Number,
    },
    parentIsoleRevenusG:
    {
      type: Number,
    },
    parentIsoleRevenusH:
    {
      type: Number,
    },
    tauxParentsIsole:
    {
      type: Number,
    },
    dateDebutAnneeCmg:
    {
        type: Number,
    },
    dateFinAnneeCmg:
    {
        type: Number,
    },
  }
)

const cmgs = mongoose.model('cmg', cmg)

module.exports = { cmgs };