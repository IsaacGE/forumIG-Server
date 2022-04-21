const Router = require('express')
const router = Router()
const authCtrl = require('../controllers/auth.ctrl')
const { verifySignup } = require('../middlewares/index')

router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.post("/signup", [verifySignup.checkDuplicateEmail, verifySignup.checkRolesExisted],
    authCtrl.register
);

router.post("/signin", authCtrl.login);


module.exports = router