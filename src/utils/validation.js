//验证手机号码
export const validatePhone = (rule, value, callback) => {
    if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(value))) {
        callback(new Error('请输入正确的11位手机号码'));
    } else {
        callback();
    }
};
//验证密码不能包含特殊字符
export const validatePassWord = (rule, value, callback) => {
    if (/[@#\$%\^&\*]+/g.test(value)) {
        callback(new Error('密码不能包含特殊字符，仅可输入英文字母及数字'));
    } else {
        callback();
    }
};

//验证工号只能输入英文字母和数字
export const validateId = (rule, value, callback) => {
    if (!(/^[0-9a-zA-Z]+$/g.test(value))) {
        callback(new Error('员工工号仅可输入英文字母及数字'));
    } else {
        callback();
    }
};
