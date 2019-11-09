const router = require('express').Router();
const Mock = require('mockjs');

const common = {
    "status" : 200,
    "message" : "success"
};

//获取地图数据
router.use('/map/getPipeline', (req, res) => {
    res.json(Mock.mock({
        "result":[{
	"P": 39.8584895423552,
	"Q": 116.44463191464541,
	"lng": 116.444632,
	"lat": 39.85849
}, {
	"P": 39.860070792545464,
	"Q": 116.45115504696963,
	"lng": 116.451155,
	"lat": 39.860071
}, {
	"P": 39.86679069936402,
	"Q": 116.45939479306338,
	"lng": 116.459395,
	"lat": 39.866791
}, {
	"P": 39.86771298814982,
	"Q": 116.46093974545596,
	"lng": 116.46094,
	"lat": 39.867713
}, {
	"P": 39.87192900755952,
	"Q": 116.46093974545596,
	"lng": 116.46094,
	"lat": 39.871929
}, {
	"P": 39.89392715397996,
	"Q": 116.46179805234073,
	"lng": 116.461798,
	"lat": 39.893927
}, {
	"P": 39.89340033476938,
	"Q": 116.47759089902041,
	"lng": 116.477591,
	"lat": 39.8934
}, {
	"P": 39.88457551105464,
	"Q": 116.4772475762665,
	"lng": 116.477248,
	"lat": 39.884576
}, {
	"P": 39.88431206601927,
	"Q": 116.48737559750674,
	"lng": 116.487376,
	"lat": 39.884312
}, {
	"P": 39.876935194058596,
	"Q": 116.5017951531708,
	"lng": 116.501795,
	"lat": 39.876935
}, {
	"P": 39.87245599176667,
	"Q": 116.50025020077823,
	"lng": 116.50025,
	"lat": 39.872456
}, {
	"P": 39.860993171663615,
	"Q": 116.50025020077823,
	"lng": 116.50025,
	"lat": 39.860993
}, {
	"P": 39.860861403977246,
	"Q": 116.51724467709658,
	"lng": 116.517245,
	"lat": 39.860861
}, {
	"P": 39.87034803064588,
	"Q": 116.51741633847354,
	"lng": 116.517416,
	"lat": 39.870348
}, {
	"P": 39.89287351150955,
	"Q": 116.51758799985049,
	"lng": 116.517588,
	"lat": 39.892874
}, {
	"P": 39.893268629334045,
	"Q": 116.54745707944033,
	"lng": 116.547457,
	"lat": 39.893269
}, {
	"P": 39.86929402579338,
	"Q": 116.5483153863251,
	"lng": 116.548315,
	"lat": 39.869294
}, {
	"P": 39.86810825097672,
	"Q": 116.57852778866885,
	"lng": 116.578528,
	"lat": 39.868108
}, {
	"P": 39.893268629334045,
	"Q": 116.57921443417666,
	"lng": 116.579214,
	"lat": 39.893269
}, {
	"P": 39.89458567229888,
	"Q": 116.59861216977237,
	"lng": 116.598612,
	"lat": 39.894586
}],
        ...common
    }))
});


//=============================部门管理页面start=============================

//获取员工部门tree
router.use('/api/SysDepartController/getSysDepartAll', (req, res) => {
    var results=[{"departId":"1","departName":"总公司","parentDepartId":"0","departLevel":1,"departType":1,"departState":0,"num":2,"childList":[{"departId":"2","departName":"分公司","parentDepartId":"1","departLevel":2,"departType":2,"departState":1,"num":5,"departGroup":2,"childList":[{"departId":"3","departName":"班组","parentDepartId":"2","departLevel":3,"departType":3,"departState":1,"num":7,"departGroup":2,"childList":[{"departId":"7","departName":"子班组","parentDepartId":"3","departLevel":4,"departType":3,"departState":1,"num":1,"departGroup":2}]},{"departId":"4","departName":"客服中心","parentDepartId":"2","departLevel":3,"departType":4,"departState":1,"num":2,"departGroup":2,"childList":[{"departId":"24","departName":"客服","parentDepartId":"4","departLevel":4,"departType":3,"departState":1,"num":0,"departGroup":2}]}]},{"departId":"5","departName":"供热处","parentDepartId":"1","departLevel":2,"departType":2,"departState":1,"num":5,"departGroup":5},{"departId":"6","departName":"管理处","parentDepartId":"1","departLevel":2,"departType":2,"departState":1,"num":0,"departGroup":6,"childList":[{"departId":"8","departName":"管理管理","parentDepartId":"6","departLevel":3,"departType":3,"departState":1,"num":1,"departGroup":6,"childList":[{"departId":"9","departName":"管理管理管理","parentDepartId":"8","departLevel":4,"departType":3,"departState":1,"num":0,"departGroup":6}]}]}]}];
    res.json(Mock.mock({
        "content":results,
        ...common
    }))
});

//获取添加人员 穿梭框数据
router.use('/api/SysEmpController/getSysEmpListIsChoice', (req, res) => {
    res.json(Mock.mock({
          "content" :{
            "startIndex": 0,
            "currentPage": 3,
            "pageSize": 5,
            "pageTotal": 1,
            "recordTotal": 0,
            "list": [
              {
                "empId": 2,
                "empNo": "1",
                "empName": "总公司员工",
                "empSex": "M",
                "empLevel": 1,
                "empPhone": "",
                "empNote": "",
                "empState": 1,
                "impBatch": 0
              },
              {
                "empId": 4,
                "empNo": "3",
                "empName": "班组员工",
                "empSex": "W",
                "empLevel": 3,
                "empPhone": "",
                "empNote": "",
                "empState": 1,
                "impBatch": 0
              }
            ]
        },
        ...common
    }))
});

//获取当前部门下人员
router.use('/api/SysDepartController/showEmployeesView', (req, res) => {
    res.json(Mock.mock({
          "content|10" :[{
              "employeesId": '@id()',
              "employeesName": "@cname()",
              "employeesSex":"男",
              "department":"@city",
              "employeesRole": "@cfirst()",
              "employeesPhone": "@ip()",
              "employeesPassword":'@id()',
              "remarks":"@word",
              "isFrozen":true,
              "empNum":'@integer(10, 40)',
          }],
         // "pageSize":10,
         "currentPage":1,
         "totalItems":50,
        ...common
    }))
});

//删除部门提示
router.use('/api/SysDepartController/isDeleteSysDepart', (req, res) => {
    res.json(Mock.mock({
    "status" : 500,
    "message" : "此部门已存在下级部门，不可删除"
}))
});

//确认删除部门
router.use('/api/SysDepartController/deleteSysDepart', (req, res) => {
    res.json(Mock.mock({
    "status" : 500,
    "message" : "success"
}))
});

//=============================部门管理页面end=============================



//=============================员工管理页面start=============================
//获取当前部门下人员
router.use('/api/SysDepartController/getEmpTableDataUrl', (req, res) => {
    res.json(Mock.mock({
          "content|10" :[{
              "employeesId": '@id()',
              "employeesName": "@cname()",
              "employeesSex":"男",
              "department":"@city",
              "employeesRole": "@cfirst()",
              "employeesPhone": "@ip()",
              "employeesPassword":'@id()',
              "remarks":"@word",
              "isFrozen":true,
              "empNum":'@integer(10, 40)',
          }],
         // "pageSize":10,
         "currentPage":1,
         "totalItems":50,
        ...common
    }))
});

router.use('/api/SysEmpController/getSysEmpById', (req, res) => {
    res.json(Mock.mock({
     "content": {
	"sysEmpVo": {
		"empId": 1,
		"empNo": "admin",
		"empName": "管理员",
		"empPassword": "e10adc3949ba59abbe56e057f20f883e",
		"empSex": "M",
		"empLevel": 1,
		"empPhone": "",
		"empNote": "",
		"empState": 2,
		"isDelete": 1,
		"impBatch": 0
	},
	"roleListChose": [{
		"roleId": 1,
		"roleName": "系统管理员",
		"state": "true"
	}],
	"departListChose": [{
		"departId": "1"
	}, {
		"departId": "3"
	}],
	"roleList": [{
		"roleId": 1,
		"roleName": "系统管理员",
		"state": "true"
	}, {
		"roleId": 2,
		"roleName": "运行处",
		"state": "false"
	}, {
		"roleId": 3,
		"roleName": "财务处",
		"state": "false"
	}, {
		"roleId": 15,
		"roleName": "qq",
		"state": "false"
	}],
	"departList": [{
		"departId": "1",
		"departName": "总公司",
		"parentDepartId": "0",
		"departLevel": 1,
		"departType": 1,
		"departState": 0,
		"childList": [{
			"departId": "2",
			"departName": "分公司",
			"parentDepartId": "1",
			"departLevel": 2,
			"departType": 2,
			"departState": 1,
			"departGroup": 2,
			"childList": [{
				"departId": "3",
				"departName": "班组",
				"parentDepartId": "2",
				"departLevel": 3,
				"departType": 3,
				"departState": 1,
				"departGroup": 2,
				"childList": [{
					"departId": "7",
					"departName": "班组班组1234111",
					"parentDepartId": "3",
					"departLevel": 4,
					"departType": 3,
					"departState": 1,
					"departGroup": 2,
					"state": "false"
				}, {
					"departId": "24",
					"departName": "客服",
					"parentDepartId": "3",
					"departLevel": 4,
					"departType": 3,
					"departState": 1,
					"departGroup": 2,
					"state": "false"
				}],
				"state": "true"
			}, {
				"departId": "4",
				"departName": "客服中心",
				"parentDepartId": "2",
				"departLevel": 3,
				"departType": 4,
				"departState": 1,
				"departGroup": 2,
				"state": "false"
			}],
			"state": "false"
		}, {
			"departId": "5",
			"departName": "供热处",
			"parentDepartId": "1",
			"departLevel": 2,
			"departType": 2,
			"departState": 1,
			"departGroup": 5,
			"state": "false"
		}, {
			"departId": "6",
			"departName": "管理处",
			"parentDepartId": "1",
			"departLevel": 2,
			"departType": 2,
			"departState": 1,
			"departGroup": 6,
			"childList": [{
				"departId": "8",
				"departName": "管理管理",
				"parentDepartId": "6",
				"departLevel": 3,
				"departType": 3,
				"departState": 1,
				"departGroup": 6,
				"childList": [{
					"departId": "9",
					"departName": "管理管理管理",
					"parentDepartId": "8",
					"departLevel": 4,
					"departType": 3,
					"departState": 1,
					"departGroup": 6,
					"childList": [{
						"departId": "10",
						"departName": "管理管理管理管理",
						"parentDepartId": "9",
						"departLevel": 5,
						"departType": 3,
						"departState": 1,
						"departGroup": 6,
						"state": "false"
					}],
					"state": "false"
				}],
				"state": "false"
			}],
			"state": "false"
		}],
		"state": "true"
	}]
},
        ...common
    }))
});





router.use('/api/SysEmpController/getSysEmpList', (req, res) => {
    res.json(Mock.mock({
          "content" : {
    "startIndex": 0,
    "currentPage": 1,
    "pageSize": 10,
    "pageTotal": 6,
    "recordTotal": 1,
    "list": [
      {
        "empId": 1,
        "empPhone": "",
        "empSex": "男",
        "empName": "管理员",
        "roleName": "系统管理员",
        "empNo": "admin",
        "empState": 2,
        "departName": "总公司,班组"
      },
      {
        "empId": 2,
        "empPhone": "",
        "empSex": "男",
        "empName": "总公司员工",
        "roleName": "-",
        "empNo": "1",
        "empState": 1,
        "departName": "分公司,管理管理"
      },
      {
        "empId": 3,
        "empPhone": "",
        "empSex": "男",
        "empName": "分公司员工",
        "roleName": "保安室,运行处",
        "empNo": "2",
        "empState": 1,
        "departName": "班组"
      },
      {
        "empId": 4,
        "empPhone": "",
        "empSex": "女",
        "empName": "班组员工",
        "roleName": "财务处",
        "empNo": "3",
        "empState": 0,
        "departName": "分公司"
      },
      {
        "empId": 5,
        "empPhone": "",
        "empSex": "男",
        "empName": "没部门员工",
        "roleName": "-",
        "empNo": "5",
        "empState": 1,
        "departName": "-"
      },
      {
        "empId": 6,
        "empPhone": "",
        "empSex": "男",
        "empName": "没有部门有角色员工",
        "roleName": "财务处",
        "empNo": "6",
        "empState": 1,
        "departName": "-"
      }
    ]
  },
        ...common
    }))
});


//页面查询
router.use('/api/SysDepartController/selectFormUrl', (req, res) => {
    res.json(Mock.mock(common))
});

//是否冻结
router.use('/api/SysDepartController/isFrozenUrl', (req, res) => {
    res.json(Mock.mock(common))
});



      // ====导入页面=====
//不可导入人员信息
router.use('/api/SysDepartController/notImportEmpUrl', (req, res) => {
    res.json(Mock.mock({
          "content|10" :[{
                    "id": '@integer()',
                    "date": "@date()",
                    "name": "@name()",
                    "address": "@city(true)",
                }],
         // "pageSize":10,
         "currentPage":1,
         "totalItems":50,
        ...common
    }))
});

     // ====新增员工页面=====
//所属部门信息

//系统角色


//=============================员工管理页面end===============================

//=============================角色管理页面start===============================
router.use('/form/getformList', (req, res) => {
    var options=[{ label: '一步', value: '1' },{ label: '二步', value: '2' }]
    res.json(Mock.mock({
            "content|5" :[{
                "id": '@integer()',
                "date": "@date()",
                "name": "@name()",
                "address": "@city(true)",
            }],
        ...common
    }))
});

//设置权限
router.use('/platformManagement/getfuncRightDataUrl', (req, res) => {
    res.json(Mock.mock({
            "content" :[ { partitionName:'1区',selected:false,partitionId:1,
                        country:[
                        {   id: "1",fieldName: "奥地利",selected: true},
                        {   id: "2",fieldName: "芬兰",selected: false},
                        {   id: "3",fieldName: "意大利",selected: false},
                        {   id: "4",fieldName: "葡萄牙",selected: false},
                        {   id: "9",fieldName: "西班牙",selected: false},
                        {   id: "10",fieldName: "瑞典",selected: false},]
                    },
                    { partitionName:'2区',selected:false,partitionId:2,isIndeterminate:false,
                        country:[
                        {   id: "5",fieldName: "丹麦",selected: false},
                        {   id: "6",fieldName: "法国",selected: false},]
                    },
                    { partitionName:'3区',selected:false,partitionId:3,isIndeterminate:false,
                        country:[
                        {   id: "7",fieldName: "德国",selected: false},
                        {   id: "8",fieldName: "瑞士",selected: false}]
                    }],
        ...common
    }))
});

//角色管理----获取表格数据带分页
router.use('/api/SysRoleController/getSysRoleList', (req, res) => {
    res.json(Mock.mock({
          "content" :{
              "startIndex": 0,
              "currentPage": 1,
              "pageSize": 5,
              "pageTotal": 3,
              "recordTotal": 0,
              "list": [
                {
                  "roleId": 1,
                  "roleName": "系统管理员",
                  "roleDate": "Aug 8, 2019 10:25:53 AM",
                  "roleNote": "系统管理员",
                  "roleState": 2,
                  "num": 1
                },
                {
                  "roleId": 2,
                  "roleName": "运行处",
                  "roleDate": "Aug 8, 2019 10:26:15 AM",
                  "roleNote": "运行处",
                  "roleState": 1,
                  "num": 1
                },
                {
                  "roleId": 3,
                  "roleName": "财务处",
                  "roleDate": "Aug 8, 2019 10:26:40 AM",
                  "roleNote": "财务管理",
                  "roleState": 0,
                  "num": 1
                }
              ]
          },
      ...common
    }))
});


//查看角色内人员
router.use('/api/SysEmpController/getSysRoleListIsChoice', (req, res) => {
    res.json(Mock.mock({
          "content" :{
              "startIndex": 0,
              "currentPage": 1,
              "pageSize": 5,
              "pageTotal": 50,
              "recordTotal": 0,
              "list": [
                {
                  "empId": 2,
                  "empNo": "1",
                  "empName": "总公司员工",
                  "empSex": "M",
                  "empLevel": 1,
                  "empPhone": "",
                  "empNote": "",
                  "empState": 1,
                  "impBatch": 0
                },
                {
                  "empId": 4,
                  "empNo": "3",
                  "empName": "班组员工",
                  "empSex": "W",
                  "empLevel": 3,
                  "empPhone": "",
                  "empNote": "",
                  "empState": 1,
                  "impBatch": 0
                }
              ]
         },
        ...common
    }))
});

router.use('/api/SysRoleController/deleteSysRole', (req, res) => {
    res.json(Mock.mock(common))
});

//数据权限管理
router.use('/api/SysRoleController/getSysRoleFunctionList', (req, res) => {
    res.json(Mock.mock({
          "content" : [
                {
                  "functionId": 1,
                  "functionName": "平台管理",
                  "functionIcon": "icon-icon-test1",
                  "childsList": [
                    {
                      "functionId": 16,
                      "functionName": "数据权限管理",
                      "functionIcon": "",
                      "functionType": 1,
                      "functionUrl": "/platformManagement/dataRightsManagement",
                      "type": 0,
                      "parentFunctionId": 1
                    },
                    {
                      "functionId": 17,
                      "functionName": "设置记录",
                      "functionIcon": "",
                      "functionType": 1,
                      "functionUrl": "/platformManagement/setupLog",
                      "type": 0,
                      "parentFunctionId": 1
                    },
                    {
                      "functionId": 12,
                      "functionName": "部门管理",
                      "functionIcon": "",
                      "functionType": 1,
                      "functionUrl": "/platformManagement/departmentManagement",
                      "type": 0,
                      "parentFunctionId": 1
                    },
                    {
                      "functionId": 14,
                      "functionName": "角色管理",
                      "functionIcon": "",
                      "functionType": 1,
                      "functionUrl": "/platformManagement/roleManagement",
                      "type": 0,
                      "parentFunctionId": 1
                    },
                    {
                      "functionId": 15,
                      "functionName": "角色分配",
                      "functionIcon": "",
                      "functionType": 1,
                      "functionUrl": "/platformManagement/roleAssign",
                      "type": 0,
                      "parentFunctionId": 1
                    }
                  ],
                  "type": 0
                },
                {
                  "functionId": 2,
                  "functionName": "热费管理",
                  "functionIcon": "",
                  "childsList": [
                    {
                      "functionId": 13,
                      "functionName": "员工管理",
                      "functionIcon": "",
                      "functionType": 1,
                      "functionUrl": "/platformManagement/employeesManagement",
                      "type": 0,
                      "parentFunctionId": 2
                    }
                  ],
                  "type": 0
                },
                {
                  "functionId": 3,
                  "functionName": "热网信息配置",
                  "functionIcon": "",
                  "childsList": [],
                  "type": 0
                },
                {
                  "functionId": 4,
                  "functionName": "数据接口",
                  "functionIcon": "",
                  "childsList": [],
                  "type": 0
                },
                {
                  "functionId": 5,
                  "functionName": "数据及诊断",
                  "functionIcon": "",
                  "childsList": [],
                  "type": 0
                },
                {
                  "functionId": 6,
                  "functionName": "经济运行",
                  "functionIcon": "",
                  "childsList": [],
                  "type": 0
                },
                {
                  "functionId": 7,
                  "functionName": "系统分析",
                  "functionIcon": "",
                  "childsList": [],
                  "type": 0
                },
                {
                  "functionId": 8,
                  "functionName": "系统安全",
                  "functionIcon": "",
                  "childsList": [],
                  "type": 0
                },
                {
                  "functionId": 9,
                  "functionName": "热用户管理",
                  "functionIcon": "",
                  "childsList": [],
                  "type": 0
                },
                {
                  "functionId": 10,
                  "functionName": "客服管理",
                  "functionIcon": "",
                  "childsList": [],
                  "type":0
                },
                {
                  "functionId": 11,
                  "functionName": "巡检与维修",
                  "functionIcon": "",
                  "childsList": [],
                  "type": 0
                }
              ],
        ...common
    }))
});

router.use('/api/SysEmpController/getSysEmpListRoleChose', (req, res) => {
    res.json(Mock.mock({
          "content" :{
              "allEmp": [
                {
                  "empId": 1,
                  "empName": "管理员",
                  "state": "true"
                },
                {
                  "empId": 3,
                  "empName": "分公司员工",
                  "state": "true"
                },
                {
                  "empId": 2,
                  "empName": "总公司员工",
                  "state": "false"
                },
                {
                  "empId": 4,
                  "empName": "班组员工",
                  "state": "false"
                },
                {
                  "empId": 5,
                  "empName": "没部门员工",
                  "state": "false"
                },
                {
                  "empId": 6,
                  "empName": "没有部门有角色员工",
                  "state": "false"
                }
              ],
              "empState": [
                {
                  "empId": 1,
                  "empName": "管理员",
                  "state": "true"
                },
                {
                  "empId": 3,
                  "empName": "分公司员工",
                  "state": "true"
                }
              ]
            },
          ...common
    }))
});



//=============================角色管理页面end===============================


//=============================数据权限管理页面start===============================
//角色管理----获取表格数据带分页
router.use('/api/SysDataAuthorityController/getSysDataAuthorityList', (req, res) => {
    res.json(Mock.mock({
          "content" :[
            {
              "functionId": 12,
              "functionName": "部门管理",
              "authorityStaff1": 1,
              "authorityStaff2": 2,
              "authorityStaff3": 3
            },
            {
              "functionId": 13,
              "functionName": "员工管理",
              "authorityStaff1": 1,
              "authorityStaff2": 2,
              "authorityStaff3": 3
            },
            {
              "functionId": 14,
              "functionName": "角色管理",
              "authorityStaff1": 1,
              "authorityStaff2": 2,
              "authorityStaff3": 3
            },
            {
              "functionId": 15,
              "functionName": "角色分配",
              "authorityStaff1": 1,
              "authorityStaff2": 2,
              "authorityStaff3": 3
            },
            {
              "functionId": 16,
              "functionName": "数据权限管理",
              "authorityStaff1": 1,
              "authorityStaff2": 2,
              "authorityStaff3": 3
            },
            {
              "functionId": 17,
              "functionName": "设置记录",
              "authorityStaff1": 1,
              "authorityStaff2": 2,
              "authorityStaff3": 3
            },
          ],
        ...common
    }))
});

//=============================数据权限管理页面end===============================

//=============================设置记录start===============================
router.use('/api/SysSetRecordController/getSetRecordList', (req, res) => {
    res.json(Mock.mock({
       "content": {
          "startIndex": 0,
          "currentPage": 3,
          "pageSize": 5,
          "pageTotal": 50,
          "recordTotal": 0,
          "list": [
            {
              "recordId": 1,
              "empId": 1,
              "recordDate": "Aug 9, 2019 2:28:48 PM",
              "recordType": "人员管理",
              "recordContent": "加人",
              "recordIp": "127.1.1.1",
              "empName": "@cname()",
              "empNo": "admin"
            },
            {
              "recordId": 2,
              "empId": 1,
              "recordDate": "Aug 15, 2019 2:28:48 PM",
              "recordType": "人员管理",
              "recordContent": "加人",
              "recordIp": "127.1.1.1",
              "empName": "管理员A",
              "empNo": "adminA"
            }
          ]
      },
      ...common
    }))
});

router.use('/api/SysRoleController/getSysRoleSelect', (req, res) => {
    res.json(Mock.mock({
       "content": [
          {
            "roleId": 1,
            "roleName": "系统管理员"
          },
          {
            "roleId": 2,
            "roleName": "运行处"
          },
          {
            "roleId": 3,
            "roleName": "财务处"
          }
        ],
      ...common
    }))
});




router.use('/api/SysEmpController/getSysEmpListDepChose', (req, res) => {
    res.json(Mock.mock({
       "content":  {
    "allEmp": [
      {
        "empId": 1,
        "empName": "管理员",
        "state": "true"
      },
      {
        "empId": 3,
        "empName": "分公司员工",
        "state": "true"
      },
      {
        "empId": 2,
        "empName": "总公司员工",
        "state": "false"
      },
      {
        "empId": 4,
        "empName": "班组员工",
        "state": "false"
      },
      {
        "empId": 5,
        "empName": "没部门员工",
        "state": "false"
      },
      {
        "empId": 6,
        "empName": "没有部门有角色员工",
        "state": "false"
      }
    ],
    "empState": [
      {
        "empId": 1,
        "empName": "管理员",
        "state": "true"
      },
      {
        "empId": 3,
        "empName": "分公司员工",
        "state": "true"
      }
    ]
  },
      ...common
    }))
});


//=============================设置记录end===============================



//获取角色权限
router.use('/platformManagement/roles', (req, res) => {
    var rolesObj={
      "r1":{"name":"热费管理",roles:["热费计算","缴费退费","账务统计","核查监督"]},
      "r2":{"name":"客服管理",roles:["呼叫管理","业务受理","派单及催办","业务反馈"]},
      "r3":{"name":"热用户管理",roles:["热用户稽查","室温检测控制"]},
    };

    res.json(Mock.mock({
        "content": {
            "rolesObj": rolesObj,
        },
        ...common
    }))
});

//员工管理-----获取表格数据带分页
router.use('/platformManagement/getformList', (req, res) => {
    res.json(Mock.mock({
          "content|10" :[{
              "employeesId": '@id()',
              "employeesName": "@cname()",
              "employeesSex":"男",
              "department":"@city",
              "employeesRole": "@cfirst()",
              "employeesPhone": "@ip()",
              "employeesPassword":'@id()',
              "remarks":"@word",
              "isFrozen":true,
              "empNum":'@integer(10, 40)',
          }],
         // "pageSize":10,
         "currentPage":1,
         "totalItems":50,
        ...common
    }))
});

//角色管理----获取表格数据带分页
router.use('/platformManagement/getRoleformList', (req, res) => {
    res.json(Mock.mock({
          "content|10" :[{
              "employeesName": "@cname()",
              "description":"@word()",
              "date":"@date()",
              "num": "5",
              "sueState": false,
          }],
         "currentPage":1,
         "totalItems":50,
        ...common
    }))
});







// 成功跳转
router.use('/platformManagement/success', (req, res) => {
    res.json(Mock.mock(common))
});

router.use('/middleware/setMWInspect', (req, res) => {
    setTimeout(() => {
        res.json(Mock.mock(common))
    }, 1000 * 60 * 2);
});


module.exports =  router;
