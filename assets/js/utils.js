/* 
将相同的根路径放在一个单独的文件中 
*/

$.ajaxPrefilter( function(option) {
    // console.log(option);
    option.url = 'http://ajax.frontend.itheima.net' + option.url;
})