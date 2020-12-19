$(function () {
  //获取文章
  getArtical();
  function getArtical() {
    $.ajax({
      url: "/my/article/cates",
      success: function (res) {
        //console.log(res);
        if (res.status !== 0) {
          return layer.msg("获取文章分类列表失败！");
        }
        //利用模板引擎将数据展示出来
        let arthtml = template("artTpl", res);
        $("#tb").html(arthtml);
      },
    });
  }
  //给添加类别注册点击事件,弹出弹出框
  let index; //使用index变量存储弹出层的索引（方便后面close关闭对应的弹出层）
  $("#addbtn").click(function () {
    index = layer.open({
      type: 1,
      title: "添加文章分类",
      area: "500px",
      content: $("#addTpl").html(),
    });
  });
  //添加弹出框是点击生成 需要使用事件委托
  $("body").on("submit", "#addForm", function (e) {
    e.preventDefault();

    let data = $(this).serialize();
    $.ajax({
      url: "/my/article/addcates",
      type: "POST",
      data,
      success: function (res) {
        //console.log(res);
        if (res.status !== 0) {
          return layer.msg("新增文章分类失败!");
        }
        layer.msg("新增文章分类成功!");
        //1.关闭弹框
        layer.close(index);
        getArtical();
      },
    });
  });
  //编辑是动态生成的,使用事件委托
  let editIndex;
  $("body").on("click", "#edit", function () {
    editIndex = layer.open({
      type: 1,
      title: "修改文章分类",
      area: "500px",
      content: $("#editTpl").html(),
    });
    let id = $(this).attr("data-id");
    //console.log(id);
    $.ajax({
      url: "/my/article/cates/" + id,
      success: function (res) {
        //console.log(res);
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        $(".Id").val(res.data.Id);
        $(".name").val(res.data.name);
        $(".alias").val(res.data.alias);
      },
    });
  });
  //提交编辑
  $("body").on("submit", "#editForm", function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    $.ajax({
      url: "/my/article/updatecate",
      type: "POST",
      data,
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        //关闭弹框
        layer.close(editIndex);
        layer.msg(res.message);
        getArtical();
      },
    });
  });
  //删除
  $("body").on("click", "#delete", function () {
    layer.confirm("确认删除?", { icon: 3, title: "提示" }, (index) => {
      //do something
      let id = $(this).attr("data-id");
      //console.log(idx);
      $.ajax({
        url: "/my/article/deletecate/" + id,
        success: function (res) {
          console.log(res);
          if (res.status !== 0) {
            return layer.msg(res.message);
          }
          layer.msg("删除文章成功");
          getArtical();
        },
      });
      layer.close(index);
    });
  });
});
