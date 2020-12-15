$(function () {
  let form = layui.form;
  //校验密码
  form.verify({
      pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
      newpwd: function (value) { 
          if (value === $("[name = oldPwd]").val() ) {
              return "新密码与原密码不能一样"
          }
      }, 
  repwd: function (value) { 
          if (value !== $("[name = newPwd]").val() ) {
              return "两次密码不一样"
          }
      }
  });
    //重置密码
    $("form").submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: "/my/updatepwd",
            type: "POST",
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                $("form")[0].reset()
            }
        })
    })
});
