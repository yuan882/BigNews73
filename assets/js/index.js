$(function () {
    // 获取登录名等用户信息
    // 使用ajax, 需要包含token在内
    getUserInfo();
    function getUserInfo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            success: function (res) {
              console.log('success中的输出',res)
              if (res.status == 0) {
                // 1.2 将昵称或用户名与头像渲染到对应位置
                // 左侧欢迎语
                $('.userInfo .welcome').html(`欢迎&nbsp;&nbsp;${res.data.nickname ? res.data.nickname : res.data.username}`)
                // 左侧欢迎语的头像位置
                // !res.data.user_pic
                if (!res.data.user_pic) {
                  // 没有头像 
                  if (!res.data.nickname) {
                    $('.userInfo .text-avatar,.layui-header .text-avatar').text(res.data.username.slice(0, 1).toUpperCase())
                  } else {
                    $('.userInfo .text-avatar,.layui-header .text-avatar').text(res.data.nickname.slice(0, 1).toUpperCase())
                  }
                } else {
                  // 显示对应的头像
                  $('.userInfo .text-avatar,.layui-header .text-avatar').hide().next().show().attr('src', res.data.user_pic)
                }
              }
            },
        })
    }

    window.getUserInfo = getUserInfo;

    $('.logout').on('click', function () {
        // 确认框
        layer.confirm('确定要退出吗', {icon: 3, title:'提示'}, function(index){
            layer.close(index);
            // 删除token
            window.localStorage.removeItem('token');
            // 跳回login界面
            location.href = './login.html';
            // layer.close(index);
          });
    })
})