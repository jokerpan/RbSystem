const router = require('express').Router();
const Mock = require('mockjs');

const common = {
    "success" : "success"
};


router.use('/auditor/homepage.do', (req, res) => {
    res.json(Mock.mock(
    	{
    		"rb_state": '@integer(1, 3)'
    	,
    	...common}))
});


router.use('/auditor/getView', (req, res) => {
    res.json(Mock.mock({
        "data|6": [{
            "submitTime": "@datetime",
            "applyer": "@cword()",
            "rbType": "@cword()",
            "totalMoney": "@integer",
            "curStatus": "@cword()"
        }],
        "pageCount": '@integer(10, 30)',
        "recordnum":"12",
        ...common
    }))
});




router.use('/RbSystem/user/changPsd.do', (req, res) => {
    res.json(Mock.mock(common))
});





module.exports = router;
