$(function () {
    var form = layui.form;
    getUserData();
    function getUserData() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            // header在utlis.js中统一配置
            success: function (res) {
                console.log(res);
                if(res.status === 0) {
                    // 将服务端数据更新到页面中
                    form.val('myForm', {
                        id: res.data.id,
                        username: res.data.username,
                        nickname: res.data.nickname,
                        email: res.data.email
                    })
                }
            }
        })
    }

    // 2. 开启表单验证
    form.verify({
        nickname: function (value, item) { //value：表单的值、item：表单的DOM对象
        if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
            return '昵称不能有特殊字符'
        }
        if (/(^\_)|(\__)|(\_+$)/.test(value)) {
            return '昵称首尾不能出现下划线\'_\''
        }
        if (/^\d+\d+\d$/.test(value)) {
            return '昵称不能全为数字'
        }
        }
    })

    // 3. 提交表单
    $('.myForm').on('submit', function (e) {
        e.preventDefault();
        // ajax请求
        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                console.log('user_info', res);
                layer.msg(res.message)
                if (res.status == 0) {
                  parent.window.getUserInfo();
                }
              }
        })
    })

    // 重置 
    $('.btn-reset').on('click',function(e){
        console.log(123);
        // 4.2 阻止form标签的默认提交行为
        e.preventDefault()
    
        // 4.3 调用方法进行重置
        getUserData()
      })
})