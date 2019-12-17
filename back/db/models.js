const mongoose = require("mongoose");

const tauxCharges =  new mongoose.Schema(
    {
        taux1: 
        {
            type: Number,
        },
        taux2: 
        {
            type: Number,
        },
    },
);

const TauxCharge = mongoose.model('TauxCharge', tauxCharges)

module.exports = {TauxCharge};