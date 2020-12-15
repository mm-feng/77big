$(function () {
  let form = layui.form;
  getUserInfo();
  function getUserInfo() {
    $.ajax({
      url: "/my/userinfo",
      success: function (res) {
        //console.log(res);
        form.val("form", res.data);
      },
    });
  }
  $(".layui-form").submit(function (e) {
    e.preventDefault();
    $.ajax({
      url: "/my/userinfo",
      type: "POST",
      data: $(this).serialize(),
      success: function (res) {
        //console.log(res);
        if (res.status !== 0) {
          return layer.msg("修改用户信息失败");
        }
        layer.msg("修改用户信息成功");
        window.parent.getInfo();
      },
    });
  });
  $("#reset").click(function (e) {
    e.preventDefault();
    //重新发送ajax请求获取新的用户数据
    getUserInfo();
    //导航区域信息
  });
});
