const mongoose = require("mongoose");

const tranche =  mongoose.Schema(
    {
        trancheA: 
        {
            type: Number,
        },
        trancheB: 
        {
            type: Number,
        },
        trancheC: 
        {
            type: Number,
        },
        trancheD:
        {
            type: Number,
        },
        
    });

const tranchePMSS = mongoose.model('tranchePMSS', tranche)

module.exports = {tranchePMSS};