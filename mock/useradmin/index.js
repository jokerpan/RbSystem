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


module.exports = router;
