$(function () {
    // 获取登录名等用户信息
    // 使用ajax, 需要包含token在内
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        // token在utils.js中统一设置
        success:function(res){
            console.log(res);
            if(res.status === 0) {
                // 替换欢迎语
                $('.userInfo .welcome').html(`欢迎&nbsp;&nbsp;${res.data.username}`);
                // 如果用户上传了头像，则显示头像
                if(!res.data.user_pic){
                    $('.layui-side .side-avatar').text(res.data.username.slice(0,1).toUpperCase());
                    $('.layui-nav .nav-avatar').text(res.data.username.slice(0,1).toUpperCase());
                }
                else {
                    $('.layui-side .side-avatar').addClass('hidden');
                    $('.layui-nav .nav-avatar').addClass('hidden');
                    $('.layui-nav-img').removeClass('hidden');
                }
            }
        }
    })
})