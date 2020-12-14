$.ajax({
  url: "/my/userinfo",
  headers: {
    Authorization: localStorage.getItem("token"),
  },
  success: function (res) {
    console.log(res);
    let name = res.data.nickname || res.data.username;
    $(".welcome").text("欢迎" + name);
    if (res.data.user_pic) {
      $(".layui-nav-img").attr("src", res.data.user_pic).show();
      $(".via").hide();
    } else {
      let first = name[0].toUpperCase();
      $(".via").show().text(first);
      $(".layui-nav-img").hide();
    }
  },
});
