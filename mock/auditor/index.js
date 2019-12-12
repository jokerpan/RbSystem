const router = require('express').Router();
const Mock = require('mockjs');

const common = {
    "success" : "success"
};



// const common = {
//     "code" : 200,
//     "msg" : "success"
// };


router.use('/RbSystem/homepage.do', (req, res) => {
    res.json(Mock.mock({
        "Data":{
            "rbList|5": [{
                "o_time": "@datetime",
                "rb_state": "@integer(2,3)",
                "rb_id": "@integer(2,5)",
                "undo": {
                    "id":"@cword()",
                    "note1":"@cword()",
                    "note2":"@cword()",
                    "note3":"@cword()"
                },
                "hospital":"@cword()"
            }],
            "totalPage": '@integer(10, 30)',
            "totalNum":"12"
        },
        ...common
    }
    ))
});



router.use('/RbSystem/admin/getRbList1.do', (req, res) => {
    res.json(Mock.mock({
        "Data":{
            "RbList|5": [{
                "s_time": "@datetime",
                "rb_state": "@integer(2,3)",
                "rb_id": "@integer(2,5)",
                "user_type": "@cword()",
                "Admin": {
                    "id":"@cword()"
                },
                "hospital":"@cword()"
            }],
            "totalPage": '@integer(10, 30)',
            "totalNum":"12"
        },
        ...common
    }
    ))
});


router.use('/RbSystem/admin/getRbList2.do', (req, res) => {
    res.json(Mock.mock({
        "Data":{
            "RbList|5": [{
                "s_time": "@datetime",
                "rb_state": "@integer(2,3)",
                "rb_id": "@integer(2,5)",
                "user_type": "@cword()",
                "admin_id": "@cword()",
                "hospital":"@cword()"
            }],
            "totalPage": '@integer(10, 30)',
            "totalNum":"12"
        },
        ...common
    }
    ))
});


router.use('/RbSystem/admin/startRbCheck.do', (req, res) => {
    res.json(Mock.mock({
        "Data":{
            "rb_state": 1,
            "rb_id": '@word',
            "hospital": "@cword",
            "referral": {
                "id": "@word",
                "date": "@date(T)",
                "pic": ''
            },
            "ghf|3": [{
                "id": "@word",
                "department": "@cword",
                "date": "@date(T)",
                "cost":"@integer(0,500000)",
                "self_paid": "@integer(0,50000)",
                "note": "@word",
                "pic":'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
            }],
            "yymx|3": [{
                "id": "@word",
                "date": "@date(T)",
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


router.use('/RbSystem/admin/postRbCheck.do', (req, res) => {
    res.json(Mock.mock(common))
});


router.use('/RbSystem/admin/getEList.do', (req, res) => {
    res.json(Mock.mock({
        "Data":{
        "EList|4":[{
            "id":"@word",
            "password":"@word",
            "level":"@integer"
        }]
    },

    ...common
    }


        ))
});

router.use('/RbSystem/admin/updateAdmin.do', (req, res) => {
    res.json(Mock.mock(common))
});

router.use('/RbSystem/admin/addAdmin.do', (req, res) => {
    res.json(Mock.mock(common))
});

module.exports = router;
