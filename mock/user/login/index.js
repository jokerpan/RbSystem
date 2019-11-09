const router = require('express').Router();
const Mock = require('mockjs');

const common = {
    "code" : 200,
    "msg" : "success"
};


router.use('/api/user/login', (req, res) => {
    res.json(Mock.mock(common))
});


module.exports = router;
