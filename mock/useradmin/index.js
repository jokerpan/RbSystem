const router = require('express').Router();
const Mock = require('mockjs');

const common = {
    "success" : "success"
};



router.use('/RbSystem/homepage.do', (req, res) => {
    res.json(Mock.mock({
    	"Data":{
    		"rb_state": '@integer(1, 6)',
    		"rb_id": '@word'
    	},
    	...common}))
});

router.use('/RbSystem/upload.do', (req, res) => {
    res.json(Mock.mock({
    	"Data":{
    		"path": 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
    	},
    	...common}))
});

router.use('/RbSystem/user/postRbForm.do', (req, res) => {
    res.json(Mock.mock({
    	"Data":{
    		"rb_state": '@integer(1, 6)',
    		"rb_id": '@word'
    	},
    	...common}))
});

router.use('/RbSystem/user/getRbForm.do', (req, res) => {
    res.json(Mock.mock({
    	"Data":{
    		"rb_state": '@integer(1, 7)',
    		"rb_id": '@word',
    		"hospital": "@cword",
    		"referral": {
    			"id": "@word",
    			"date": "@date",
    			"pic": 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
    		},
    		"ghf|3": [{
    			"id": "@word",
    			"department": "@cword",
    			"date": "@date",
    			"cost":"@integer(0,500000)",
    			"self_paid": "@integer(0,50000)",
    			"note": "@word",
    			"pic":'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
    		}],
    		"yymx|3": [{
    			"id": "@word",
    			"date": "@date",
    			"cost":"@integer(0,500000)",
    			"special_paid": "@integer(0,500000)",
    			"part_paid": "@integer(0,500000)",
    			"self_paid": "@integer(0,50000)",
    			"note": "@word",
    			"detailed_pic":'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
    			"pspt_pic":'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
    		}],
    		"wssm": {
    			"id": "@word",
    			"note": "@word",
    			"stamp_pic": 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
    			"special_pic": 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
    		}
    	},
    	...common}))
});


// router.use('/RbSystem/homepage.do', (req, res) => {
//     res.json(Mock.mock(
//     	{
//     		"rb_state": '@integer(1, 7)'
//     	,
//     	...common}))
// });

router.use('/RbSystem/user/changTel.do', (req, res) => {
    res.json(Mock.mock(common))
});



router.use('/RbSystem/user/changPsd.do', (req, res) => {
    res.json(Mock.mock(common))
});





module.exports = router;
