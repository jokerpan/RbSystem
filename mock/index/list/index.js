const router = require('express').Router();
const Mock = require('mockjs');

const common = {
    "code" : 200,
    "msg" : "success"
};

router.use('/server/getServerList', (req, res) => {
    res.json(Mock.mock({
        "result": 
            {
                "result|5" :[{
                    "ip": "@ip()",
                    "userName": "@word()",
                    "password": "@word()",
                    "description": "@word()"
                }],
                
            }
        ,
        ...common
    }))
});

router.use('/middleware/setMWInspect', (req, res) => {
    setTimeout(() => {
        res.json(Mock.mock(common))
    }, 1000 * 60 * 2);
});

router.use('/script/getScriptList', (req, res) => {
    res.json(Mock.mock({
        "result":
            {
                "result|5" :[{
                    "fileName": "@word()",
                    "command": "@word()",
                    "parameters": "@word()",
                    "description": "@word()",
                    "operator": "@word()"
                }],

            }
        ,
        ...common
    }))
});

module.exports =  router;