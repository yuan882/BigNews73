$(function () {
    // 启用富文本编辑器
    initEditor();

    // 图片部分
    var $img = $('#image');
    const options = {
        // 纵横比
        aspectRadio: 1/1,
        // 指定预览区域
        preview: '.img-preview',
    }
    // 创建裁切区域
    $img.cropper(options);
})