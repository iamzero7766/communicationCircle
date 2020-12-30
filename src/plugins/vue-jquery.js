import Jquery from "jquery";
import Vue from 'vue';
(function($) {
  //1.得到$.ajax的对象
  var _ajax = $.ajax;
  $.ajax = function(options) {
    //4.扩展原生的$.ajax方法，返回最新的参数
    var _options = $.extend(options, {
      url: options.url,
      headers: {
        // 'User-Token': localStorage.getItem('uuid')
      },
      dataType:'json',
    });
    //5.将最新的参数传回ajax对象
    _ajax(_options);
  };
})(Jquery);
let jqueryPlugin = {};
jqueryPlugin.install = function(vue) {
  vue.prototype.$jq = Jquery;
}

Vue.use(jqueryPlugin);
