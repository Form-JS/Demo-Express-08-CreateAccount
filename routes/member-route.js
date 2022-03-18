const memberController = require('../controllers/member-controller');

const memberRouter = require('express').Router();


memberRouter.get('/member/register', memberController.registerGET);
memberRouter.post('/member/register', memberController.registerPOST);


module.exports = memberRouter;