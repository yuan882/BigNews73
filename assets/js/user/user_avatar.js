$(function () {
    // 获取裁剪区域的DOM元素
    var $image = $('#image');

    // 配置选项
    const options = {
        aspectRatio: 1,
        preview: '.img-preview'
    } 

    // 创建裁剪区域
    $image.cropper(options);

    // 弹出选择文件的窗口
    $('.btn-upload').on('click', function () {
        $('#avatar').click()
    })

    // 预览待上传的图片
    $('#avatar').on('change', function () {
        // 获取待上传的图片
        var avatar = this.files[0];

        // 生成一个链接
        var imgUrl = URL.createObjectURL(avatar);
        // 显示在img标签内
        $('#image')
            .cropper('destroy')
            .attr('src', imgUrl)
            .cropper(options)
    })
})