$(function () {
    // 注册登录框的注册按钮实现相互转换
    $a = $('.layui-form-item a');

    $a.on('click', function () {
        console.log('test');
        $('.login').toggleClass('hidden');
        $('.register').toggleClass('hidden');    
    })
})