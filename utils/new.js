export default function post(url, data) {
  var promise = new Promise((resolve, reject) => {
    console.log(data)
    console.log(data)
    var that = this;
   // data.v = '1.0';
   // data.os = 'ios';
    var postData = data;
    console.log(data)
    console.log(url)
    swan.request({
      url: url,
      method: 'GET',
      data:data,
    dataType: 'json',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log(res)
        resolve(res);
        
      },
      error: function (e) {
        console.log('网络出错')
        //reject('网络出错');
      }
    })
  });
  return promise;
}