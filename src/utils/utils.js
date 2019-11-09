//转化字符串，如果为空则用0填充
export function fixString (str) {
  str = "" + str;
  return str.length <= 1 ? "0" + str : str;
}

const maps = {
  'yyyy': date => date.getFullYear(),
  'MM': date => fixString(date.getMonth() + 1),
  'dd': date => fixString(date.getDate()),
  'HH': date => fixString(date.getHours()),
  'mm': date => fixString(date.getMinutes()),
  'ss': date => fixString(date.getSeconds())
};

//日期格式化
export function handleFormat(value, format = "yyyy-MM-dd HH:mm:ss") {
  const trunk = new RegExp(Object.keys(maps).join('|'), 'g');
  value = new Date(value);

  return format.replace(trunk, (capture) => {
    return maps[capture] ? maps[capture](value) : "";
  })
}

//判断类型
export function typeOf(obj) {
  const toString = Object.prototype.toString;
  const map = {
    '[object Boolean]'  : 'boolean',
    '[object Number]'   : 'number',
    '[object String]'   : 'string',
    '[object Function]' : 'function',
    '[object Array]'    : 'array',
    '[object Date]'     : 'date',
    '[object RegExp]'   : 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]'     : 'null',
    '[object Object]'   : 'object'
  };
  return map[toString.call(obj)];
}

//深度复制
export function deepCopy(data) {
  const type = typeOf(data);
  let o;

  if (type === 'array') {
    o = [];
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(o));
    }
  } else if (type === 'object') {
    o = {};
    for (let i in data) {
      o[i] = deepCopy(data[i])
    }
  } else {
    o = data;
  }
  return o;
}

//消抖
export function debounce(fn) {
  let waiting;
  return function() {
    if (waiting) return;
    waiting = true;
    const context = this,
      args = arguments;
    const later = function() {
      waiting = false;
      fn.apply(context, args);
    };
    this.$nextTick(later);
  };
}

//节流
function throttle (fn, delay) {
  let  timer    = null,
    remaining   = 0,
    previous = new Date();

  return function () {
    let now = new Date(),
      remaining = now - previous,
      args = arguments,
      context = this;

    if (remaining >= delay) {
      if (timer) {
        clearTimeout(timer);
      }

      fn.apply(context, args);
      previous = now;
    } else {
      if (!timer) {
        timer = setTimeout(function () {
          fn.apply(context, args);
          previous = new Date();
        }, delay - remaining);
      }
    }
  };
}
