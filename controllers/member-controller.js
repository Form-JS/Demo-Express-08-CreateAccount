const bcryt = require('bcrypt');
const memberModel = require('../models/member-model');

const memberController = {

    registerGET: (req, res) => {
        // Check si l'utilisateur est deja connecté
        if (req.session.connected) {
            return res.redirect('/');
        }

        res.renderWithData('member/register');
    },

    registerPOST: (req, res) => {
        // TODO Ajouter un schema de validation
        const { email, pseudo, pwd } = req.body;

        const passwordHash = bcryt.hashSync(pwd + process.env.PWD_PEPPER, 10);

        memberModel.insert({
            email, pseudo, passwordHash
        })
            .then((id) => {
                console.log(`Account ${id} create !!!`);
                res.redirect('/');
            });
    },

    loginGET: (req, res) => {
        // Check si l'utilisateur est deja connecté
        if (req.session.connected) {
            return res.redirect('/');
        }

        res.renderWithData('member/login');
    },

    loginPOST: (req, res) => {
        // TODO Ajouter un schema de validation
        const { email, pwd } = req.body;

        let memberDB = null;
        memberModel.getByEmail(email)
            .then(member => {
                // Si le member est valide
                if (member !== null) {
                    memberDB = member;
                    return bcryt.compare(pwd + process.env.PWD_PEPPER, member.passwordHash);
                }

                return Promise.resolve(false);
            })
            .then(isOk => {
                // Le login est valide
                if (isOk) {
                    // Créer la session
                    req.session.connected = true;
                    req.session.member = {
                        memberId: memberDB.memberId,
                        pseudo: memberDB.pseudo
                    };

                    // Redirection
                    res.redirect('/');
                }
                // Le login est invalide
                else {
                    // TODO Ajouter l'email dans la page login renvoyer
                    res.renderWithData('member/login');
                }
            });
    },

    logout: (req, res) => {
        // Destruction de la session :x
        req.session.destroy();

        // Redirection
        res.redirect('/');
    }
};

module.exports = memberController;