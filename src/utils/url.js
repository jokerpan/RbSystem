export const getQueryParameter = q_name => {
  let reg = new RegExp("(^|&)" + q_name + "=([^&]*)(&|$)", "i");
  let result = window.location.search.substr(1).match(reg);
  if (result != null) {
    return result[2];
  } else {
    return null;
  }
};

export const getUrlParams = url => {
  let params = {};
  url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) {
    params[key] = value;
  });
  return params;
};

export const setQueryConfig = queryConfig => {
  let _str = "";
  for(let o in queryConfig){
    if(queryConfig[o] != -1){
      _str += o + "=" + queryConfig[o] + "&";
    }
  }
  _str = _str.substring(0, _str.length-1);
  return _str;
};
