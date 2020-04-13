const controller = require('../controllers/users');
const validateToken = require('../utils').validateToken;

module.exports = (router) => {
    router.route('/users')
        .post(controller.add)
        // TODO token verification
        .get(controller.get);

    router.route('/user/:name')
        // TODO token verification
        .get(controller.get);

    router.route('/login')
        .post(controller.login);

    router.route('/token/verification')
        .get(controller.verifyToken)
};
