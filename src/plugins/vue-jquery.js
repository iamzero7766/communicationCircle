import Jquery from "jquery";
import Vue from "vue";
(function($) {
  //1.得到$.ajax的对象
  var _ajax = $.ajax;
  $.ajax = function(options) {
    //2.每次调用发送ajax请求的时候定义默认的error处理方法
    var fn = {
      error: function(XMLHttpRequest) {
        try {
          var res = JSON.parse(XMLHttpRequest.responseText);
          if (res.status === 0) {
            console.log(res.detail);
          }
        } catch (e) {
          console.log(e);
        }
      },
      beforeSend: function () {
        // $('#loadingModal').show()
        //console.time(options.url)
      },
      complete: function () {
        // $('#loadingModal').hide()
      },

    };
    ///处理时间戳问题结束
    //3.如果在调用的时候写了error的处理方法，就不用默认的
    if(options.error) {
      fn.error = options.error;
    }
    if(options.success) {
      fn.success = options.success;
    }
    if(options.url) {
      fn.url = options.url
    }

    //4.扩展原生的$.ajax方法，返回最新的参数
    var _options = $.extend(options, {
      url: fn.url,
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        try {
          var res = JSON.parse(XMLHttpRequest.responseText);
          if(res.status === 0) {
            console.log("error");
          }
        } catch(e) {
          console.log(e);
        }
        fn.error(XMLHttpRequest, textStatus, errorThrown);
      },
      beforeSend: function() {
        fn.beforeSend();
      },
      complete: function(XHR, TS) {
        fn.complete(XHR, TS);
      },
      headers: {
        // 'User-Token': localStorage.getItem('uuid')
      },
      dataType:'json',
      success: function(res) {
        try {
          //			if(res.status == 0 && res.detail == 'user illegal, try login again') {
          if(res.status === 0 && res.detail.indexOf('User-Token') > -1) {
            console.log("error");
            return
          }
        } catch(e) {
          //TODO handle the exception
          console.log(e);
        }
        fn.success(res);
      },
    });
    //5.将最新的参数传回ajax对象
    _ajax(_options);
  };
})(Jquery);
let jqueryPlugin = {};
jqueryPlugin.install = function(vue) {
  vue.prototype.$jq = Jquery;
};
Vue.use(jqueryPlugin);
