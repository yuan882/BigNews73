/* 
将相同的根路径放在一个单独的文件中 
*/

$.ajaxPrefilter( function(option) {
    // console.log(option);
    option.url = 'http://ajax.frontend.itheima.net' + option.url;
    // 统一设置token
    // 1. 只要发送Ajax请求就会通过这个拦截器中的options拿到所有的参数
    // 2. 登陆和注册是不需要携带token的
    // 3. 因此我们可以根据url中是否存在'/my'来判断是否要携带token
    if(option.url.includes('/my')){
        option.headers = {
        "Authorization":window.localStorage.getItem('token')
        }
    }
})