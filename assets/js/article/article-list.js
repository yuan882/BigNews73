$(function () {
    // 获取文章分类数据
    $.ajax({
        type: 'get',
        url: '/my/article/cates',
        success: function (res) {
            if(res.status == 0){
                console.log('获取文章分类数据', res);
                var htmlStr = template('categoryList', res);
                $('#category').html(htmlStr);

                layui.form.render();
            }
        }
    })

    // 把文章列表的参数单独提出来
    var params = {
        pagenum: 1,
        pagesize: 5,
        cate_id: $('#category').val(),
        state: $('#state').val(),
    };

    // 文章列表页的数据渲染
    function renderList() {   
        $.ajax({
            type: 'get',
            url: '/my/article/list',
            data: params,
            success: function (res) {
                console.log('获取文章列表页数据233',res);
                if(res.status == 0){
                    var htmlStr = template('articleList', res);
                    $('tbody').html(htmlStr);
                }

                // 起用分页插件
                renderPage(res);
            }
        })
    }

    renderList();
    

    // 实现筛选功能
    $('.myForm').on('submit',function(e){
        e.preventDefault();
        // 重新获取筛选条件
        params.cate_id = $('#category').val();
        params.state = $('#state').val();
        renderList();
    })

    // 实现分类功能
    function renderPage(res) {
        var laypage = layui.laypage;

        // 执行一个laypages实例
        laypage.render({
            elem: 'test1',
            count: res.total,
            limit: params.pagesize,
            curr: params.pagenum,
            limits: [2,3,5,10],
            groups: 3,
            layout:['count','limit', 'prev', 'page','next','skip'],
            jump: function (obj, first) {
                // console.log(obj.curr);
                // console.log(obj.limit);
                // console.log(first);
                params.pagenum = obj.curr;
                params.pagesize = obj.limit;
                if(!first) {
                    renderList();
                }
            }
        })
    }

    // 删除文章
    /*
        给删除按钮注册事件，委托方式
        获取要删除文章的id
        弹出确认框
        发送ajax请求
        重新渲染文章列表
    */
    $('tbody').on('click', '.btn-del', function () {
        var articleId = $(this).data('id');
        // 删除文章事如果遇到删当前页最后一条数据的情况，页面不会自动-1
        var count = $('tbody .btn-del').length;
        layer.confirm('是否要删除该条文章？', { icon: 3, title: '提示'}, function (index) {
            $.ajax({
                type: 'get',
                url: '/my/article/delete/' + articleId,
                success: function (res) {
                    layer.msg(res.message);
                    if(res.status == 0){
                        // 判断是否应该显示上一页的数据
                        if(count == 1) {
                            params.pagenum = params.pagenum == 1 ? 1 : params.pagenum - 1; 
                        }
                        renderList();
                    }
                }
            })
            layer.close(index);
        })
    })
    
})
