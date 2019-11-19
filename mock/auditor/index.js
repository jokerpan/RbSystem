const router = require('express').Router();
const Mock = require('mockjs');

const common = {
    "success" : "success"
};


router.use('/RbSystem/homepage.do', (req, res) => {
    res.json(Mock.mock(
    	{
    		"rb_state": '@integer(1, 7)'
    	,
    	...common}))
});


router.use('/auditor/getView', (req, res) => {
    res.json(Mock.mock({
        "data|5": [{
            "time": "@datetime",
            "applyer": "@cword()",
            "rbtype": "@cword()",
            "totalmoney": "@integer",
            "curstatus": "@cword()"
        }],
        "pageCount": '@integer(10, 30)',
        "recordnum":"14",
        ...common
    }))
});


router.use('/RbSystem/user/changTel.do', (req, res) => {
    res.json(Mock.mock(common))
});



router.use('/RbSystem/user/changPsd.do', (req, res) => {
    res.json(Mock.mock(common))
});





module.exports = router;
