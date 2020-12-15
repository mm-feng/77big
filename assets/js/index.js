getInfo();
function getInfo() {
  $.ajax({
    url: "/my/userinfo",
    // headers: {
    //   Authorization: localStorage.getItem("token"),
    // },
    success: function (res) {
      //console.log(res)
      if (res.status !== 0) {
        return layer.msg("获取用户信息失败");
      }
      let name = res.data.nickname || res.data.username;
      $(".welcome").text(name);
      if (res.data.user_pic) {
        $(".layui-nav-img").attr("src", res.data.user_pic).show();
        $(".via").hide();
      } else {
        let first = name[0].toUpperCase();
        $(".via").show().text(first);
        $(".layui-nav-img").hide();
      }
    },
    complete: function (res) {
      //console.log(res);
      if (
        res.responseJSON.status === 1 &&
        res.responseJSON.message === "身份认证失败！"
      ) {
        location.href = "../../home/login.html";
        locationStorage.removeItem("token");
      }
    },
  });
}

$(".exit").click(function () {
  layer.confirm(
    "确定退出登录吗?",
    { icon: 3, title: "提示" },
    function (index) {
      //do something
      //清除本地存储的token
      //调到login页面
      localStorage.removeItem("token");
      // location.href = "../../home/login.html";//该方法会有历史保存记录,使用后退还能返回到主页
      location.replace("../../home/login.html"); //该方法不会
      layer.close(index); //index就是这个弹出框
    }
  );
});
