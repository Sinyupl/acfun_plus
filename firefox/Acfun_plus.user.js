// ==UserScript==
// @name        Acfun_plus
// @namespace   1
// @include     http://www.acfun.tv/*
// @include     http://acfun.tudou.com/v/*
// @include 		http://hengyang.acfun.tv/*
// @version     1
// @grant       none
// @author      星雨漂流
// ==/UserScript==
window.getlist = function (page) {
  $.get('/member/publishContent.aspx?isGroup=0&groupId=-1&pageSize=10', {
    'pageNo': page
  }, function (data) {
    $.each(data.contents, function (index, value) {
      var str = '<div class=\'box\'><div class=\'left\'>';
      str += '<div class=\'head\'><img src=' + value.titleImg + ' />';
      str += '</div></div>';
      str += '<div class=\'right\'><div class=\'pushTitle\'><a target="_blank" href=\'http://www.acfun.tv' + value.url + '\'>';
      str += value.title + '</a></div></div><div class="username"><a target="_blank" href="http://www.acfun.tv/u/' + value.userId + '.aspx#area=post-history">by&nbsp' + value.username + '</a></div></div>';
      $('#pushList').append(str);
      $('.box').css({
        'width': '100%',
        'clear': 'both',
        'margin-top': '20px',
        'height': '60px',
        'position': 'relative',
      });
      $('.box>.left').css({
        'width': '30%',
        'text-align': 'center',
        'float': 'left',
        'vertical-align': 'middle'
      });
      $('.box>.left>.head').css('width', '80%');
      $('.box>.left>.head>img').css('width', '100%');
      $('.box>.right').css({
        'float': 'left',
        'width': '70%',
        'text-align': 'left'
      });
      $('.box>.right>.pushTitle>a').css({
        'line-height': '15px',
        'font-size': '12px'
      });
      $('.box>.right>.pushTitle').css({
        'line-height': '15px',
        'font-size': '12px'
      });
      $('#pushList .username').css({
        'width': '98%',
        'padding-right': '2%',
        'text-align': 'right',
        'color': '#ddd',
        'font-size': '10px',
        'clear': 'both',
        'position': 'absolute',
        'bottom': '0',
      });
      $('#pushList .username>a').css({
        'color': '#b5b5b5',
        'font-size': '12px'
      })
    })
  });
}
window.add_word = function (data) {
  $(data).before('<input type="text" name="" id="" value="" style="width:90px;"/><button class="del" onclick="$(this).prev().remove();$(this).remove();">X</button>');
  $('.del').css({
    'width': '22px',
    'border-radius': '50%',
    'color': '#666'
  });
  $('.key_word button').css({
    'color': '#67bdcd',
    'border': '1px solid #67bdcd',
    'border-radius': '5px',
    'margin-left': '5px'
  });
}
window.add_groud = function (data) {
  $(data).before('<li class="key_word"><input type="text" name="" id="" value="" style="width:90px;" /><button class="del" onclick="$(this).prev().remove();$(this).remove();">X</button><button class="add_word" onclick="add_word(this);">增加该组关键词</button><button onclick="delGroud(this);">删除该组</button></li>');
  $('.key_word').css({
    'list-style-type': 'decimal'
  });
  $('.del').css({
    'width': '22px',
    'border-radius': '50%',
    'color': '#666'
  });
  $('.key_word button').css({
    'color': '#67bdcd',
    'border': '1px solid #67bdcd',
    'border-radius': '5px',
    'margin-left': '5px'
  });
}
window.delGroud = function (data) {
  $(data).parent().remove();
}
window.closeOver = function () {
  $('#over').hide();
}
window.showOver = function () {
  $('#over').show();
    var record = new Array();
  record = JSON.parse(localStorage.str);
    if (JSON.parse(localStorage.str).length > 0) {
    $('.mas_first').html('');
    for (var i = 0; i < record.length; i++) {
      $('.mas_first').append('<li class="key_word"></li>');
      for (var j = 0; j < record[i].length; j++) {
        $('.key_word').eq(i).append('<input type="text" name="" id="" style="width:90px" value="' + record[i][j] + '" required/><button class="del" onclick="$(this).prev().remove();$(this).remove();">X</button>');
      }
      $('.key_word').eq(i).append('<button class="add_word" onclick="add_word(this);">增加该组关键词</button><button onclick="delGroud(this);">删除该组</button>');
    }
    $('.mas_first').append('<button id="add_first" onclick="add_groud(this);">增加分组</button>');
    $('.key_word button').css({
      'color': '#67bdcd',
      'border': '1px solid #67bdcd',
      'border-radius': '5px',
      'margin-left': '5px'
    });
  }
   $('.mas_second').html('');
    if (localStorage.black.length > 0) {
    if (JSON.parse(localStorage.black).length > 0) {
      var username = JSON.parse(localStorage.black);
      for (var i = 0; i < username.length; i++) {
        $('.mas_second').append('<span>' + username[i] + '</span><button class="del" onclick="$(this).prev().remove();$(this).remove();">X</button>');
      }
      $('.mas_second').css({
        'clear': 'both',
      });
      
      $('.mas_second span').css({
        'color': '#67bdcd',
        'border': '1px dashed #67bdcd',
        'padding-left': '5px',
        'padding-right': '5px',
        'margin-left':'8px',
      });
      $('.mas_second button').css({
        'color': '#67bdcd',
        'border': '1px solid #67bdcd',
        'border-radius': '5px',
        'margin-left': '5px'
      });
    }
  }
  $('#add_first').css({
    'color': '#ffa5c7',
    'border': '1px solid #ffa5c7',
    'border-radius': '5px',
    'margin-top': '8px',
    'margin-bottom': '20px',
  });
  
}
window.checkword = function (arr, className) {
  if (arr.length > 0) {
    for (var i = 0; i < arr.length; i++) {
      var lg = arr[i].length;
      var checkPush = new Array();
      checkPush.splice(0, checkPush.length);
      for (var j = 0; j < arr[i].length; j++) {
        var index = className.innerText.indexOf(arr[i][j]);
        if (index != - 1) {
          checkPush.push(index);
        }
      }
      if (lg == checkPush.length) {
        if (className.parentNode.getAttribute('class') == 'area-comment-right') {
          className.parentNode.parentNode.style.display = 'none';
          $(className).parent().next().hide();
        } 
        else {
          $(className).prev().hide();
          $(className).next().hide();
          $(className).next().next().hide();
          className.style.display = 'none';
          className.parentNode.style.border = 'none';
          className.parentNode.style.backgroundColor = 'transparent';
        }
        className.setAttribute('disappeared', 'true');
      }
    }
  }
}
//举报函数

window.getjubk = function (data) {
  var d = new Array();
  d[0] = $(data).parent().parent().find('.name').html();
  d[1] = location.href;
  d[2] = 2;
  d[3] = $(data).parent().find('.xrze').val();
  d[4] = $(data).parent().parent().find('.index-comment').html();
  d[5] = $.parseSafe($(data).parent().parent().find('.content-comment').html());
  d[6] = 'acyw';
  d[7] = getNum($(data).parent().parent().attr('id'));
  console.log(d);
  $.post('/report.aspx', {
    defendantUsername: d[0],
    url: d[1],
    type: d[2],
    crime: d[3],
    description: d[4] + '楼,评论内容违规。',
    proof: d[5],
    captcha: d[6],
    objectId: d[7]
  }).done(function (t) {
    //return t.success ? console.log("success") : console.log("fail")
    if (t.success) {
      $(data).parent().parent().find('.jubk_su').fadeIn();
      setTimeout(function () {
        $(data).parent().parent().find('.jubk_su').fadeOut();
      }, 3000);
    } 
    else {
      $(data).parent().parent().find('.jubk_fa').fadeIn();
      setTimeout(function () {
        $(data).parent().parent().find('.jubk_fa').fadeOut();
      }, 3000);
    }
  })
}
window.run = function () {
  var str = '<div class=\'jubk\'><select class=\'xrze\'><option value=\'1\'>色情</option><option value=\'2\'>血腥</option><option value=\'3\'>暴力</option>';
  str += '<option value=\'4\'>猎奇</option><option value=\'5\'>政治</option>';
  str += '<option value=\'6\'>辱骂</option><option selected=\'selected\' value=\'7\'>广告</option><option value=\'8\'>挖坟</option><option value=\'9\'>其他</option></select>';
  str += '<button class=\'jubk_this\' onclick=\'getjubk(this)\'>提交</button></div>';
  str += '<div class=\'jubk_su\'>举报成功</div><div class=\'jubk_fa\'>举报失败</div>'
  $('.item-comment').append(str);
  $('.xrze').css({
    'width': '60px',
    'min-width': '60px',
    'border-radius': '5px'
  })
  $('.jubk').css({
    'position': 'absolute',
    'right': 0,
    'bottom': '25px',
    'opacity': 0.1
  })
  $('.jubk_su').css({
    'position': 'absolute',
    'background-color': '#3a9bd9',
    'right': 0,
    'bottom': '55px',
    'color': '#fff',
    'padding': '2px',
    'display': 'none'
  })
  $('.jubk_fa').css({
    'position': 'absolute',
    'background-color': '#ff3a35',
    'right': 0,
    'bottom': '55px',
    'color': '#fff',
    'padding': '2px',
    'display': 'none'
  })
  $('.jubk').hover(function () {
    $(this).css('opacity', 1);
  })
  $('.jubk').mouseleave(function () {
    $(this).css('opacity', 0.1);
  })
}
window.getNum = function (text) {
  var value = text.replace(/[^0-9]/gi, '');
  return value;
}
//增加黑名单

window.add_black = function (data) {
  var userArr = new Array();
  var tempname = $(data).prev().html();
  if (localStorage.black.length > 0) {
    userArr = JSON.parse(localStorage.black);
  }
  userArr.push(tempname);
  localStorage.black = JSON.stringify(userArr);
}
window.clearUser = function (arr, className) {
  var flag = 0;
  for (var i = 0; i < arr.length; i++) {
    if ($(className).html() == arr[i]) {
      flag = 1;
      break;
    }
  }
  if (flag) {
    if ($(className).prev().attr('class') == 'index-comment') {
      if ($(className).parent().parent().attr('class') != 'area-comment-right') {
        $(className).parent().hide();
        $(className).parent().next().hide();
        $(className).parent().next().next().hide();
        $(className).parent().next().next().next().hide();
        $(className).parent().parent().css({
          'border': 'none',
          'background-color': 'transparent'
        });
      } 
      else {
        $(className).parent().parent().parent().hide();
        $(className).parent().parent().next().hide();
      }
    }
  }
}
//================================================================

$(document).ready(function () {
  $('#win-info-guide>.mainer>.b').after('<div id=\'pushList\'></div>');
  $('#win-info-guide').css({
    'width': '300px'
  });
  var arr = new Array();
  getlist(1);
  $('#pushList').css({
    'width': '100%',
    'height': '350px',
    'overflow-y': 'auto',
    'box-shadow': '0px 0px 3px #555 inset',
    'padding-left': '8px',
    'border-radius': '2px'
  });
  $('#win-info-guide').hover(function () {
    $('#pushList').scrollTop(0);
  })
  var page = 2;
  $('#pushList').scroll(function () {
    var pushH = $('#pushList').height();
    var pushB = document.getElementById('pushList').scrollHeight - pushH;
    var scroll = $(this).scrollTop();
    if (scroll == pushB) {
      getlist(page);
      page++;
    }
  })
  //根据关键字屏蔽评论
  $('body').append('<div id="over" hidden><div id="masking"><div id="returnHome" onclick="closeOver();">返回</div><h3 style="font-size:18px;margin-bottom:10px; width:130px;float:left">评论关键字屏蔽</h3><input type="checkbox" id="key_hide" style="width:25px" /><ol class="mas_first"><li class="key_word"><button class="add_word" onclick="add_word(this);">增加该组关键词</button></li><button id="add_first" onclick="add_groud(this);">增加分组</button></ol><h3 style="font-size:18px;margin-bottom:10px; width:130px;float:left">用户评论黑名单</h3><input type="checkbox" id="user_hide" style="width:25px;float:left;" /><div class="mas_second"></div><button id="save">保存</button></div></div>');
  $('body').append('<div id="settings" style="position:absolute;right:20px;top:5px;cursor:pointer;color:#666;border:1px solid #888;border-radius:5px;padding:3px;" onclick="showOver();">设置</div>');
  $('#over').css({
    'position': 'fixed',
    'width': '100%',
    'height': '100%',
    'background-color': 'rgba(0,0,0,0.3)',
    'top': '0',
    'left': '0',
    'z-index': '999'
  });
  $('#masking').css({
    'width': '800px',
    'margin': '0 auto',
    'margin-top': '100px',
    'background-color': '#fff',
    'border-radius': '8px',
    'padding': '20px',
    'position': 'relative'
  });
  $('.key_word input').css({
    'width': '90px',
    'border-radius': '8px'
  });
  $('.key_word button').css({
    'color': '#67bdcd',
    'border': '1px solid #67bdcd',
    'border-radius': '5px'
  });
  $('.key_word').css({
    'list-style-type': 'decimal'
  })
  $('.del').css({
    'width': '25px',
    'border-radius': '50%',
    'color': '#666'
  });
  $('#returnHome').css({
    'position': 'absolute',
    'right': '10px',
    'top': '5px',
    'cursor': 'pointer'
  });
 
  $('#save').css({
    'color': '#ff596a',
    'border': '1px solid #ff596a',
    'border-radius': '5px',
    'margin-top': '20px',
    'margin-left': '200px',
  })
  if (localStorage.key_hide == 'checked') {
    $('#key_hide').attr('checked', true);
  }
  if (localStorage.user_hide == 'checked') {
    $('#user_hide').attr('checked', true);
  }
  var record = new Array();
  if(localStorage.str){
    record = JSON.parse(localStorage.str);
      if (JSON.parse(localStorage.str).length > 0) {
    $('.mas_first').html('');
    for (var i = 0; i < record.length; i++) {
      $('.mas_first').append('<li class="key_word"></li>');
      for (var j = 0; j < record[i].length; j++) {
        $('.key_word').eq(i).append('<input type="text" name="" id="" style="width:90px" value="' + record[i][j] + '" required/><button class="del" onclick="$(this).prev().remove();$(this).remove();">X</button>');
      }
      $('.key_word').eq(i).append('<button class="add_word" onclick="add_word(this);">增加该组关键词</button><button onclick="delGroud(this);">删除该组</button>');
    }
    $('.mas_first').append('<button id="add_first" onclick="add_groud(this);">增加分组</button>');
    $('.key_word button').css({
      'color': '#67bdcd',
      'border': '1px solid #67bdcd',
      'border-radius': '5px',
      'margin-left': '5px'
    });
  }
  }
  

  $('.key_word').css({
    'list-style-type': 'decimal'
  });
   $('#add_first').css({
    'color': '#ffa5c7',
    'border': '1px solid #ffa5c7',
    'border-radius': '5px',
    'margin-top': '8px',
    'margin-bottom': '20px',
  });
  if (localStorage.black) {
    if (JSON.parse(localStorage.black).length > 0) {
      var username = JSON.parse(localStorage.black);
      for (var i = 0; i < username.length; i++) {
        $('.mas_second').append('<span>' + username[i] + '</span><button class="del" onclick="$(this).prev().remove();$(this).remove();">X</button>');
      }
      $('.mas_second').css({
        'clear': 'both',
      });
      
      $('.mas_second span').css({
        'color': '#67bdcd',
        'border': '1px dashed #67bdcd',
        'padding-left': '5px',
        'padding-right': '5px',
        'margin-left':'8px',
      });
      $('.mas_second button').css({
        'color': '#67bdcd',
        'border': '1px solid #67bdcd',
        'border-radius': '5px',
        'margin-left': '5px'
      });
    }
  }
  var str = new Array();
  var blackArr = new Array();
  $('#save').click(function () {
    var in_lg = $('.mas_first input').length;
    //     if ($('.key_word').eq(0).find('input').length == 0) {
    //       alert('第一组不能为空！');
    //     }
    for (var k = 0; k < in_lg; k++) {
      if ($('.mas_first input').eq(k).val() == '' && $('.mas_first input').length > 0) {
        alert('不能留空');
        return false;
      }
    }
    var li_lg = $('.key_word').length;
    for (var i = 0; i < li_lg; i++) {
      var temp = new Array();
      for (var j = 0; j < $('.key_word').eq(i).find('input').length; j++) {
        var val = $('.key_word').eq(i).find('input').eq(j).val();
        if ($('.key_word').eq(i).find('input').eq(j).length != 0) {
          temp[j] = val;
        }
      }
      str[i] = temp;
    }
    localStorage.str = JSON.stringify(str);
    var span_lg = $('.mas_second span').length;
    for (var i = 0; i < span_lg; i++) {
      var val = $('.mas_second span').eq(i).html();
      if ($('.mas_second span').eq(i).html().length != 0) {
        blackArr[i] = val;
      }
      localStorage.black = JSON.stringify(blackArr);
    }
    if (!span_lg) {
      localStorage.black = '';
    }
    if ($('#key_hide').is(':checked')) {
      localStorage.key_hide = 'checked';
    } 
    else {
      localStorage.key_hide = false;
    }
    if ($('#user_hide').is(':checked')) {
      localStorage.user_hide = 'checked';
    } 
    else {
      localStorage.user_hide = false;
    }
    alert('保存成功!');
  })
  var con = document.getElementsByClassName('content-comment');
  var name = document.getElementsByClassName('name');
  $(window).scroll(function () {
    var obj = $('.jubk').html();
    if (!obj) {
      run();
    }
    if (localStorage.key_hide == 'checked') {
      for (var i = 0; i < con.length; i++) {
        if (!con[i].getAttribute('checkword')) {
          checkword(JSON.parse(localStorage.str), con[i]);
          con[i].setAttribute('checkword', 'checked');
        }
      }
    }
    if (localStorage.user_hide == 'checked') {
      for (var i = 0; i < name.length; i++) {
        if(localStorage.black.length>0){
          clearUser(JSON.parse(localStorage.black), name[i]);
        }
        
      }
    }
    var add_button = $('.author-comment .add_username').html();
    if (!add_button) {
      $('.author-comment .name').after('<button class="add_username" onclick="add_black(this)">+</button');
      $('.add_username').css({
        'border-radius': '5px',
        'opacity': '0.1',
        'width': '25px'
      })
    }
  })
});
