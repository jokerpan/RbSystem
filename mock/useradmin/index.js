const router = require('express').Router();
const Mock = require('mockjs');

const common = {
    "success" : "success"
};


router.use('/api/homepage.do', (req, res) => {
    res.json(Mock.mock(
    	{
    		"rb_state": '@integer(1, 7)'
    	,
    	...common}))
});


router.use('/api/user/changTel.do', (req, res) => {
    res.json(Mock.mock(common))
});



router.use('/api/user/changPsd.do', (req, res) => {
    res.json(Mock.mock(common))
});





module.exports = router;
