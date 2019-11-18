const router = require('express').Router();
const Mock = require('mockjs');

const common = {
    "success" : "success"
};

router.use('/RbSystem/login.do', (req, res) => {
    res.json(Mock.mock({
		"Data": {
			//"level|1": [1,2,3,4,5],//1:报销人员；2：审核人员；3：审核负责人；4：收单员；5：系统管理员
			"level" : 1,

			"User": {
				"name": "@word()",
				"id": "@word()",
				"gender|1": [1,2],
				"idCard": "@id()",
				"register_time": "@datetime()",
				"telephone": "@integer()",
				"type|1": ["学生","在职职工","离休","退休"]
			},
			"Department":{
				"id": "@integer",
				"name": "@cword(2,4)"
			}
		},
		...common
    	
    }))
});


module.exports = router;
