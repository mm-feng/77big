$(function () {
  //去注册
  $(".logLink").click(function () {
    $(".login").hide();
    $(".register").show();
  });
  //去登录
  $(".regLink").click(function () {
    $(".login").show();
    $(".register").hide();
  });

  //校验
  let form = layui.form;
  form.verify({
    //我们既支持函数式的方式，也支持数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repass: function (value, item) {
      //value：表单的值、item：表单的DOM对象
      //console.log(value);
      //console.log(item);
      if (value !== $("#firpwd").val()) {
        return "密码不同";
      }
    },
  });
  //发送请求注册
  $(".regForm").submit(function (e) {
    e.preventDefault();
    let str = $(this).serialize();
    $.ajax({
      url: "/api/reguser",
      type: "POST",
      data: str,
      success: function (res) {
        //console.log(res);
        if (res.status !== 0) {
          return layer.msg(res.message, { icon: 6 });
        }
        layer.msg(res.message, { icon: 6, time: 500 }, function () {
          $(".regLink").click();
        });
      },
    });
  });
  //发送请求登录
  $(".logForm").submit(function (e) {
    e.preventDefault();
    let str = $(this).serialize();
    $.ajax({
      url: "/api/login",
      type: "POST",
      data: str,
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg(res.message, { icon: 6 });
        }
        //成功后将token存储到localStorage
        localStorage.setItem("token", res.token);

        layer.msg(res.message, { icon: 6, time: 2000 }, function () {
          location.href = "../../home/index.html";
        });
      },
    });
  });
});
