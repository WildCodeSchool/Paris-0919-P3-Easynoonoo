const mongoose = require("mongoose");

const aide = new mongoose.Schema(
    {
        abattementParHeure: 
        {
            type: Number,
        },
        tauxDeParticipationCotisationsSociales: 
        {
            type: Number,
        },
        plafondParticipationCotisation03:
        {
            type: Number,
            min: 1,
            max: 20,
        },
        plafondParticipationCotisation36:
        {
            type: Number,
            min: 1,
            max: 20,
        },
        plafondExonerationsHeuresSupp:
        {
            type: Number,
            min: 1,
            max: 20,
        },
        plafondCreditImpot:
        {
            type: Number,
            min: 1,
            max: 20,
        },
        majorationParEnfantACharges:
        {
            type: Number,
            min: 1,
            max: 20,
        },
        maxCreditImpot:
        {
            type: Number,
            min: 1,
            max: 20,
        },
        tauxCreditImpot:
        {
            type: Number,
            min: 1,
            max: 20,
        },
        majorationPremiereAnneeEmploiADomicile:
        {
            type: Number,
            min: 1,
            max: 20,
        },

        dateDebutAnnee:
        {
            type: Number,
        },
        dateFinAnnee:
        {
            type: Number,
        },
    },
);

const aides = mongoose.model('aide', aide)

module.exports = { aides };