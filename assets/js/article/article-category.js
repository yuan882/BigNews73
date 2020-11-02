// yuan
$(function() {
    // 发送请求 获取分类数据
    getCate();
    function getCate() {
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
    }

    // 给添加按钮注册事件
    $('.btn-add-cat').on('click', function () {
        window.addIndex = layer.open({
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

    // 弹出层添加操作
    $('body').on('submit', '.addForm', function (e) {
        e.preventDefault();
        console.log('test');
        $.ajax({
            type: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                console.log("添加数据", res);
                // 添加成功后关闭弹窗
                if(res.status == 0) {
                    layer.close(window.addIndex);
                    getCate();
                }
            }
        })
    })

    // 删除
    $('tbody').on('click', '.btn-del', function () {
        // e.preventDefault();
        // 获取id
        var id = $(this).data('id');
        // console.log('弹出层删除操作', $(this).data('id'));
        layer.confirm('确定要删除这条分类数据吗？', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                type: 'get',
                url: '/my/article/deletecate/'+id,
                success: function (res) {
                    console.log('弹出层删除操作', res);
                    if(res.status == 0){
                        layer.close(index);
                        getCate();
                    }
                }
            })
            layer.close(index);
        });
    })

    // 编辑文章分类
    $('tbody').on('click', '.btn-edit', function () {
        console.log('test edit');
        var id = $(this).data('id');
        // 发送ajax请求
        $.ajax({
            type: 'get',
            url: '/my/article/cates/' + id,
            success: function (res) {
                if(res.status == 0) {
                    console.log(res);
                    layui.form.val('myForm', res.data)
                }
            }
        })
        window.editIndex = layer.open({
            type: 1,
            title:'更新文章分类',
            content: $('#editCteTmp').html(),
            area: '520px' 
        })

        
    })

    // 给弹出框的确定按钮注册事件
    $('body').on('submit','.editForm', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if(res.status == 0) {
                    layer.close(window.editIndex);
                    getCate();
                }
            }
        })
    })
})