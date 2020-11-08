$(function () {
    //1. 启用富文本编辑器-----------------------------------
    initEditor();

    //2. 图片部分------------------------------------------
    var $img = $('#image');
    const options = {
        // 纵横比
        aspectRadio: 1/1,
        // 指定预览区域
        preview: '.img-preview',
    }
    //. 创建裁切区域
    $img.cropper(options);

    // 3. 编辑页面的分类数据获取------------------------------
    // 立即发送ajax请求
    $.ajax({
        type: 'get',
        url: '/my/article/cates',
        success: function (res) {
            // 将数据渲染到下拉列表中
            if(res.status == 0) {
                var htmlStr = template('categoryList', res);
                $('#category').html(htmlStr);
            }
            layui.form.render();

            // 数据回显
            getArticleDataById();
        }
    })

    //4. 待编辑文章的数据回显
    // 获取待编辑文章的id
    var articleId = location.search.slice(4);
    console.log('当前待编辑的文章ID为' + articleId);

    // 像服务器发出请求
    function getArticleDataById() {
        $.ajax({
            type: 'get',
            url: '/my/article/' + articleId,
            success: function (res) {
                console.log('待编辑文章的数据回显', res);
                // 渲染文章数据
                if(res.status == 0) {
                    layui.form.val('myForm', {
                        Id: res.data.Id,
                        title: res.data.title,
                        cate_id: res.data.cate_id
                    })
                }
                // 富文本编辑器中的数据需要单独渲染
                // tinyMCE.acticeEditor.setContent(res.data.content);
                tinyMCE.activeEditor.setContent(res.data.content);
                // 渲染图片
                $('#image')
                    .cropper('destroy')
                    .attr('src', 'http://ajax.frontend.itheima.net' + res.data.cover_img)
                    .cropper(options)
            }
        })
    }

    // 5. 更新文章
    // 获取最新输入到表单中的数据发送到服务器
    $('.btn').on('click', function (e) {
        e.preventDefault();
        // 准备数据
        var formData = new FormData($('.myForm')[0]);
        // 判断哪个按钮被触发
        if($(this).hasClass('btn-release')) {
            // 当前点击的按钮是’已发布‘按钮
            formData.append('state', '已发布');
        } else {
            // ’存为草稿’按钮
            formData.append('state', '已发布');
        }

        // 准备图片的二进制数据
        $('#image').cropper('getCroppedCanvas', {
            width: 400,
            height: 280
        }).toBlob(function (blob) {
            // 得到二进制数据了
            formData.append('cover_img', blob);
            // 将富文本编辑器的数据重新获取，添加到formData中
            formData.append('content', tinyMCE.activeEditor.getContent())
            // 发送ajax请求
            $.ajax({
                type: 'post',
                url: '/my/article/edit',
                contentType: false,
                processData: false,
                data: formData,
                success: function (res) {
                    if(res.status !== 0) {
                        return layer.msg(res.message);
                    }
                    // 成功则跳转到列表页
                    location.href = './article-list.html';
                }
            })
        })
    })
})