const mongoose = require("mongoose");

const chargesEmployeurs =  mongoose.Schema(
    {
        maladieMaterniteInvaliditeDeces: 
        {
            type: Number,
            min:0,
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
        accidentDuTravail:
        {
            type: Number,
            min:1,
            max:20,
        },
        allocationsFamiliales:
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
        assuranceChomage:
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
        contributionSolidariteAutonomie:
        {
            type: Number,
            min:1,
            max:20,
        },
        formationProfessionnelle:
        {
            type: Number,
            min:1,
            max:20,
        },
        fondsNationalAideAuLogement:
        {
            type: Number,
            min:1,
            max:20,
        },
        contributionAuFinancementDesOrganisationsSyndicales:
        {
            type: Number,
            min:1,
            max:20,
        },
        joursOuvres:
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
    },
);

const tauxChargesEmployeurs = mongoose.model('tauxChargesEmployeurs', chargesEmployeurs)

module.exports = {tauxChargesEmployeurs};