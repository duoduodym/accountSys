function getType(obj) {
    //tostring会返回对应不同的标签的构造函数
    var toString = Object.prototype.toString;
    var map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    };
    if (obj instanceof Element) {
        return 'element';
    }
    return map[toString.call(obj)];
  }
  
  export function deepClone(data) {
    var type = getType(data);
    var obj;
    if (type === 'array') {
        obj = [];
    } else if (type === 'object') {
        obj = {};
    } else {
        //不再具有下一层次
        return data;
    }
    if (type === 'array') {
        for (var i = 0, len = data.length; i < len; i++) {
            obj.push(deepClone(data[i]));
        }
    } else if (type === 'object') {
        for (var key in data) {
            obj[key] = deepClone(data[key]);
        }
    }
    return obj;
  }

  export function getCos(){
    const Bucket = 'fzg-1300449266';
    const Region = 'ap-shanghai';
    var cos = new COS({
        getAuthorization: function (options, callback) {
            // 异步获取临时密钥
            // $.get('http://example.com/server/sts.php', {
            //     bucket: options.Bucket,
            //     region: options.Region,
            // }, function (data) {
            //     var credentials = data && data.credentials;
            //     if (!data || !credentials) return console.error('credentials invalid');
            //     callback({
            //         TmpSecretId: credentials.tmpSecretId,
            //         TmpSecretKey: credentials.tmpSecretKey,
            //         XCosSecurityToken: credentials.sessionToken,
            //         // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
            //         StartTime: data.startTime, // 时间戳，单位秒，如：1580000000
            //         ExpiredTime: data.expiredTime, // 时间戳，单位秒，如：1580000900
            //     });
            // });
        }
    });
  }