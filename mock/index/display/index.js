const router = require('express').Router();
const Mock = require('mockjs');

const common = {
    "code" : 200,
    "msg" : "success"
};

//获取模板布局list
router.use('/display/getTemplate', (req, res) => {
	var list=[];
	const children = {
		"mark":'table',
		"data":[{
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-04',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1517 弄'
            }],
	}

    const tpl = {
        "cardId": '@integer()',
        "cardName": '@city()',
		"size":'large',
        "children":children,
    };
	
	for(var i=0;i<6;i++){
		list.push(tpl);
	}
	
    res.json(Mock.mock({
        "result": {
            "list": list,
			"tplId":0
        },
        ...common
    }))
});
// 获取下拉框选择子卡面类型数据 getSelectCardData
router.use('/display/getSelectCardData', (req, res) => {
	
	const list=[{
          cardName: '设备监控'
        }, {
          cardName: '平台监控'
        }, {
          cardName: '流量监控'
        }, {
          cardName: '数据监控'
        }, {
          cardName: '管网监控'
        }];
	
    res.json(Mock.mock({
        "result": {
            "selectedCardList": list,
        },
        ...common
    }))
});



//选择模板成功跳转
router.use('/display/changeTpl', (req, res) => {
    res.json(Mock.mock(common))
});

router.use('/middleware/setMWInspect', (req, res) => {
    setTimeout(() => {
        res.json(Mock.mock(common))
    }, 1000 * 60 * 2);
});


module.exports =  router;