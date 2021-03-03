var formatFunction = {
  formatHtml: function(content) {
    // 正则表达式匹配内容 获取文本信息
    var imgContent = content.replace(/<img .*?>/g, "[图片]");
    var resultContent = imgContent.replace(/<\/?.+?\/?>/g, "");
    var result =
      resultContent.length > 200
        ? resultContent.slice(0, 199) + "..."
        : resultContent;
    return result;
  },
  formatText: function(content) {
    var resultContent = content.replace(/<\/?.+?\/?>/g, "");
    var data = [];
    var resultData = {};
    content.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, function(match, capture) {
      data.push(capture);
    });
    if (data[0]) {
      resultData = {
        img: data[0],
        text:
          resultContent.length > 100
            ? resultContent.substring(0, 99) + "..."
            : resultContent
      };
    } else {
      resultData = {
        img: null,
        text:
          resultContent.length > 65
            ? resultContent.substring(0, 65) + "..."
            : resultContent
      };
    }
    return resultData;
  },
  formatAnswer: function(content) {
    var resultContent = content.replace(/<\/?.+?\/?>/g, "");
    var data = [];
    content.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, function(match, capture) {
      data.push(capture);
    });
    var resultData = {
      img: data[0] ? data[0] : null,
      text: resultContent
    };
    return resultData;
  },
  formatDate: function(time) {
    var date = new Date(time);
    var month = date.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    var day = date.getDate();
    day = day < 10 ? "0" + day : day;
    return month + "-" + day;
  }
};
export default formatFunction;
