const router = require('express').Router();
const Mock = require('mockjs');

const common = {
    "code" : 200,
    "msg" : "success"
};

router.use('/alarm/getTemplate', (req, res) => {
    const tpl = {
        "modelId": '@integer()',
        "info": '@cparagraph(2)',
        "time": 1515403883000
    };
    res.json(Mock.mock({
        "result": {
            "template1": tpl,
            "template2": tpl,
            "template3": tpl,
            "template4": tpl
        },
        ...common
    }))
});

router.use('/alarm/editTemplate', (req, res) => {
    res.json(Mock.mock(common))
});


router.use('/alarm/deleteTemplate', (req, res) => {
    res.json(Mock.mock(common))
});

const rules = {
    "nbr": '@integer()',
    "state|1": [true, false],
    "normal": [2, 10, 12],
    "warning": [1, -1, 10],
    "critical": [1, 12, 20]
};

router.use('/alarm/getRules', (req, res) => {
    res.json(Mock.mock({
        "result": {
            "监控项名字1": rules,
            "监控项名字2": rules,
            "监控项名字3": rules
        },
        "pageCount": '@integer(10, 30)',
        ...common
    }))
});

router.use('/alarm/getAllRules', (req, res) => {
    res.json(Mock.mock({
        "result": {
            "监控项名字1": rules,
            "监控项名字2": rules,
            "监控项名字3": rules,
            "监控项名字4": rules,
            "监控项名字5": rules,
            "监控项名字6": rules
        },
        ...common
    }))
});

router.use('/alarm/switchActive', (req, res) => {
    res.json(Mock.mock(common))
});

router.use('/alarm/modifyRules', (req, res) => {
    res.json(Mock.mock(common))
});

router.use('/alarm/deleteRules', (req, res) => {
    res.json(Mock.mock(common))
});

router.use('/alarm/getView', (req, res) => {
    const view = {
        "nbr": '@integer()',
        "type|1": ["normal", "warning", "critical"],
        "source": "@word()",
        "pos|1": [0, 1]
    };
    res.json(Mock.mock({
        "result": {
            "事物一": view,
            "事物二": view,
            "事物三": view
        },
        "pageCount": '@integer(10, 30)',
        ...common
    }))
});

router.use('/alarm/processView', (req, res) => {
    res.json(Mock.mock(common))
});

module.exports = router;