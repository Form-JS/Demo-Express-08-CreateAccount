const bcryt = require('bcrypt');
const { log } = require('console');
const memberModel = require('../models/member-model');

const memberController = {

    registerGET: (req, res) => {

        res.render('member/register');
    },

    registerPOST: (req, res) => {
        // TODO Ajouter un schema de validation
        const { email, pseudo, pwd } = req.body;

        const passwordHash = bcryt.hashSync(pwd, 10);

        memberModel.insert({
            email, pseudo, passwordHash
        })
            .then((id) => {
                console.log(`Account ${id} create !!!`);
                res.redirect('/');
            });
    }

    // TODO Add methode for "Login"
};

module.exports = memberController;