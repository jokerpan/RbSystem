const router = require('express').Router();
const Mock = require('mockjs');

const common = {
   "status" : 200,
   "message" : "success"
};

router.use('/form/getformList', (req, res) => {
    var options=[{ label: '一步', value: '1' },{ label: '二步', value: '2' }]
    res.json(Mock.mock({
        "result":
            {
                "result|5" :[{
                    "id": '@integer()',
                    "date": "@date()",
                    "name": "@name()",
                    "address": "@city(true)",
                }],

            }
        ,
        ...common
    }))
});

router.use('/form/getPeoplesData', (req, res) => {
    var options=[];
    const option ={
        "value":'@city()',
        "label":'@city()'
    };
    for(var i=0;i<5;i++){
        options.push(option)
    }

    res.json(Mock.mock({
        "result":
            {
                "result|5" :[{
                    "label": '@province()',
                    "options": options
                }],
            }
        ,
        ...common
    }))
});


router.use('/form/getTreeData', (req, res) => {
    var childrens=[];
    const children ={
         "id": '@integer()',
         "label": '@city()'
    };
    for(var i=0;i<3;i++){
        childrens.push(children)
    }

    res.json(Mock.mock({
        "result":
            {
                "result|8" :[{
                    "id": '@integer()',
                    "label": '@province()',
                    "children":childrens
                }],
            }
        ,
        ...common
    }))
});


router.use('/form/editformList', (req, res) => {
    res.json(Mock.mock(common))
});


router.use('/form/deleteData', (req, res) => {
    res.json(Mock.mock(common))
});


router.use('/middleware/setMWInspect', (req, res) => {
    setTimeout(() => {
        res.json(Mock.mock(common))
    }, 1000 * 60 * 2);
});

module.exports =  router;
