const mongoose = require("mongoose");

const chargesEmployes = new mongoose.Schema(
    {
        maladieMaterniteInvaliditeDeces: 
        {
            type: Number,
            min:1,
            max:20,
        },
        assuranceVieillesseDeplafonnee:
        {
            type: Number,
            min:1,
            max:20,
        },
        vieillessePlafonnee:
        {
            type: Number,
            min:1,
            max:20,
        },
        cotisationSupplémentaireAlsaceMoselle:
        {
            type: Number,
            min:1,
            max:20,
        },
        IrcemRetraiteComplementaireTrA:
        {
            type: Number,
            min:1,
            max:20,
        },
        IrcemRetraiteComplementaireTrB:
        {
            type: Number,
            min:1,
            max:20,
        },
        CegTrA:
        {
            type: Number,
            min:1,
            max:20,
        },
        CegTrB:
        {
            type: Number,
            min:1,
            max:20,
        },
        CetTrB:
        {
            type: Number,
            min:1,
            max:20,
        },
        assuranceChômage:
        {
            type: Number,
            min:1,
            max:20,
        },
        IrcemPrevoyance:
        {
            type: Number,
            min:1,
            max:20,
        },
        CsgDeductible:
        {
            type: Number,
            min:1,
            max:20,
        },
        CsgNonDeductible:
        {
            type: Number,
            min:1,
            max:20,
        },
        CrdsNonDeductible:
        {
            type: Number,
            min:1,
            max:20,
        },
        exonérationDesCotisations:
        {
            type: Number,
            min:1,
            max:20,
        },
    },
);

const tauxChargesEmployes = mongoose.model('tauxChargesEmployes', chargesEmployes)

module.exports = {tauxChargesEmployes};