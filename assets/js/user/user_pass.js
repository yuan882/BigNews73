$(function () {
    // 1. 启用密码验证规则
    layui.form.verify({
      // repass是用来校验两次输入的密码是否一致的问题
      repass: function (value, item) {
        // console.log(value); // value就是确认密码 已经获取到了
        // console.log(item);
        // 3.1 获取第一次输入的密码
        var passValue = $('.myForm .pass').val()
        // console.log(pass);
        // 3.2 进行比较 
        if (value !== passValue) {
          // 3.3 清空两个密码框
          $('.myForm .pass,.myForm .repass').val('')
          // 3.4 提示信息
          return '两次输入的密码不一致'
        }
      },
      //我们既支持上述函数式的方式，也支持下述数组的形式
      //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
       pass: [
        /^[\d]{6,12}$/
        , '密码必须6到12位，且不能出现空格'
      ]
    })
  
  
    // 2. 实现密码的更新
    // 2.1 给form注册submit事件 
    $('.myForm').on('submit',function(e){
      // 2.2 阻止默认提交行为
      e.preventDefault()
      // 2.3 发送ajax请求  带上数据
      $.ajax({
          type: 'post',
          url: '/my/updatepwd',
          data: $(this).serialize(),
          success: function(res){
            layer.msg(res.message);
            // 2.5 清空表单
            if(res.status == 0){
                $('.myForm')[0].reset();
            }
          }
      })
    })
    
    
    
  })