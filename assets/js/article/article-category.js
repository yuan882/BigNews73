// yuan
$(function() {
    // 发送请求 获取分类数据
    $.ajax({
        type: 'get',
        url: '/my/article/cates',
        success: function (res) {
            console.log('获取文章分类列表 ',res);
            // 渲染到界面中
            if(res.status == 0){
                var htmlStr = template('categoryList', res);
                $('tbody').html(htmlStr);
            }
        }
    })

    // 给添加按钮注册事件
    $('.btn-add-cat').on('click', function () {
        layer.open({
            type: 1,
            title: '添加文章分类',
            content: $('#add-cat-temp').html(),
            area: '520px'
        })
    })

    // 3.实现验证功能
    var form = layui.form
    form.verify({
        username: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符'
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\''
            }
            if(/^\d+\d+\d$/.test(value)){
                return '用户名不能全为数字';
            }
        }
    })
})