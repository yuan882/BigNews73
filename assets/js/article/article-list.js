$(function () {
    // 获取文章分类数据
    $.ajax({
        type: 'get',
        url: '/my/article/cates',
        success: function (res) {
            if(res.status == 0){
                var htmlStr = template('categoryList', res);
                $('#category').html(htmlStr);

                layui.form.render();
            }
        }
    })
})