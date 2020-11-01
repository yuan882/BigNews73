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
})