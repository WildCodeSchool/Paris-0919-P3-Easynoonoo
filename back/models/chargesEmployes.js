const mongoose = require("mongoose");

const chargesEmployes = new mongoose.Schema(
    {
        maladieMaterniteInvaliditeDecesEmployes: 
        {
            type: Number,
            min:1,
            max:20,
        },
        assuranceVieillesseDeplafonneeEmployes:
        {
            type: Number,
            min:1,
            max:20,
        },
        vieillessePlafonneeEmployes:
        {
            type: Number,
            min:1,
            max:20,
        },
        cotisationSupplementaireAlsaceMoselleEmployes:
        {
            type: Number,
            min:1,
            max:20,
        },
        IrcemRetraiteComplementaireTrAEmployes:
        {
            type: Number,
            min:1,
            max:20,
        },
        IrcemRetraiteComplementaireTrBEmployes:
        {
            type: Number,
            min:1,
            max:20,
        },
        CegTrAEmployes:
        {
            type: Number,
            min:1,
            max:20,
        },
        CegTrBEmployes:
        {
            type: Number,
            min:1,
            max:20,
        },
        CetTrBEmployes:
        {
            type: Number,
            min:1,
            max:20,
        },
        assuranceChomageEmployes:
        {
            type: Number,
            min:1,
            max:20,
        },
        IrcemPrevoyanceEmployes:
        {
            type: Number,
            min:1,
            max:20,
        },
        CsgDeductibleEmployes:
        {
            type: Number,
            min:1,
            max:20,
        },
        CsgNonDeductibleEmployes:
        {
            type: Number,
            min:1,
            max:20,
        },
        CrdsNonDeductibleEmployes:
        {
            type: Number,
            min:1,
            max:20,
        },
        exonerationDesCotisationsEmployes:
        {
            type: Number,
            min:1,
            max:20,
        },
        tauxHeuresSuppEmployes : 
        {
            type: Number,
            min:1,
            max:20,
        },
        tauxAssietteCSG_RDSEmployes : 
        {
            type: Number,
            min:1,
            max:20,
        },
        PMSS : 
        {
            type: Number,
            min:1,
            max:20,
        },
        dateDebutAnneeEmployes:
        {
            type: Number,
        },
        dateFinAnneeEmployes:
        {
            type: Number,
        },
    },
);

const tauxChargesEmployes = mongoose.model('tauxChargesEmployes', chargesEmployes)

module.exports = {tauxChargesEmployes};