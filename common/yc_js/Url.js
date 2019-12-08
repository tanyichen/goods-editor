// console.log(urlEncode(arr||obj).slice(1))//调用
function objToUrl(param) {
    var paramStr = '';
		if(param instanceof Array){
			 for (let i=0; i< param.length;i++) {
				 for (var p in param[i]) {
				 	paramStr += p+'='+param[i][p]+'&';
				 }	
			 }
		}else if(param instanceof Object){
			for (var p in param) {
				paramStr += p+'='+param[p]+'&';
			}	
		}
		paramStr = paramStr.substring(0, paramStr.lastIndexOf('?'));
    return paramStr ;

}
var urlEncode = function(param, key, encode) {
    if (param==null) return '';
    var paramStr = '';
    var t = typeof (param);
    if (t == 'string' || t == 'number' || t == 'boolean') {
        paramStr += '&' + key + '='  + ((encode==null||encode) ? encodeURIComponent(param) : param); 
    } else {
        for (var i in param) {
            var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
            paramStr += urlEncode(param[i], k, encode)
        }
    }
    return paramStr;

}
function urlToObj(str){
　　var obj = {};
　　var arr1 = str.split("?");
　　var arr2 = arr1[1].split("&");
　　for(var i=0 ; i < arr2.length; i++){
　　　　var res = arr2[i].split("=");
　　　　obj[res[0]] = res[1];
　　}
　　return obj;
}
  export default {
    // CusBASE64: __BASE64,
	objToUrl:objToUrl,//
    urlEncode:urlEncode,
	urlToObj:urlToObj
	// encoder:base64decode
  }