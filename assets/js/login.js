$(function () {
    // 注册登录框的注册按钮实现相互转换
    var $a = $('.layui-form-item a');
    var form = layui.form;
    $a.on('click', function () {
        $('.login').toggleClass('hidden');
        $('.register').toggleClass('hidden');    
    })
    // layui自带表单验证
    form.verify({
        username: function(value, item){ //value：表单的值、item：表单的DOM对象
          if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
            return '用户名不能有特殊字符';
          }
          if(/(^\_)|(\__)|(\_+$)/.test(value)){
            return '用户名首尾不能出现下划线\'_\'';
          }
          if(/^\d+\d+\d$/.test(value)){
            return '用户名不能全为数字';
          }
        },

        repass: function (value, item) {
            if( $('.pass').val() !== value ) {
                // 清空两个密码框
                $('.register .myForm .pass, .register .myForm .repass').val('');
                return '两次输入的密码不一致';
            }
        }
        
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        ,pass: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ] 
    });      

    // 提交注册事件的数据
    $('.register .myForm').on('submit', function (e) {
        console.log('test');
        e.preventDefault();

        $.ajax({
            type:'post',
            // url: 'http://ajax.frontend.itheima.net/api/reguser',
            url: '/api/reguser',
            data: $(this).serialize(),
            success: function (info) {
                console.log(info);
                // 4.4 成功时要提示 失败时也要提示
                var layer = layui.layer;
                layer.msg(info.message);
                // 4.5 如果注册成功 则跳转登陆界面
                if (info.status == 0) {
                $('.login').show().next().hide();
                }
            }
        })
    })
    
    // 验证登录信息
    $('.login .myForm').on('submit', function (e) {
        e.preventDefault();

        $.ajax({
            type: 'post',
            // url: 'http://ajax.frontend.itheima.net/api/login',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (info) {
                if(info.status == 0) {
                    location.href = './index.html';
                } else if(info.status == 1) {
                    var layer = layui.layer;
                    layer.msg(info.message);
                    $('.login .layui-input').val('');
                }
            }
        })
    })

})