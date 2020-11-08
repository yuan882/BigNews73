$(function () {
    //1. 启用富文本编辑器-----------------------------------
    initEditor();

    //2. 图片部分-----------------------------------
    var $img = $('#image');
    const options = {
        // 纵横比
        aspectRadio: 1/1,
        // 指定预览区域
        preview: '.img-preview',
    }
    //. 创建裁切区域
    $img.cropper(options);


    //3. 渲染文章分类数据-----------------------------------
    // 发送ajax请求获取分类数据
    $.ajax({
        type: 'get',
        url: '/my/article/cates',
        success: function (res) {
            // 使用模板渲染数据
            if(res.status == 0) {
                var htmlStr = template('categoryList', res);
                $('#category').html(htmlStr);

                // 更新全部
                layui.form.render();
            }
        }
    })

    // 4. 选择封面按钮弹出选择框------------------------------
    $('.btn-upload').on('click', function (e) {
        e.preventDefault();
        // 弹出选择图片的窗口
        $('#avatar').click();
    })

    // 5. 实现图片本地预览功能--------------------------------
    $('#avatar').on('change', function () {
        var file = this.files[0];
        var imgUrl = URL.createObjectURL(file);
        $('#image')
        .cropper('destroy')
        .attr('src', imgUrl)
        .cropper(options)
                
    })

    // 6. 添加文章 -----------------------------------
    // 已发布 草稿
    // 给两个按钮同时注册事件
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
                url: '/my/article/add',
                data: formData,
                contentType: false,
                processData: false,
                success: function (res) {
                    layer.msg(res.message);
                    // 成功则跳转到列表页
                    location.href = './article-list.html';
                }
            })
        })
    })
})