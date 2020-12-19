$(function () {
  let laypage = layui.laypage;
  // 获取文章列表的参数
  let query = {
    pagenum: 1, // 页码值 默认请求第一页数据
    pagesize: 2, // 每页显示多少条数据, 默认加载2条数据
    cate_id: "", // 默认加载所有分类
    state: "", // 文章的状态，可选值有：已发布、草稿 默认加载所有状态
  };
  //获取文章列表
  getArtList();
  function getArtList() {
    $.ajax({
      url: "/my/article/list",
      data: query,
      success: function (res) {
        //console.log(res);
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        //layer.msg(res.message);
        let listHtml = template("listTpl", res);
        $("#tb").html(listHtml);
        renderPage(res.total);
      },
    });
  }
  //页码
  function renderPage(total) {
    var laypage = layui.laypage;

    //执行一个laypage实例
    laypage.render({
      elem: "pageBox", //注意，这里的 test1 是 ID，不用加 # 号
      count: total, //数据总数，从服务端得到
      limit: query.pagesize,
      limits: [2, 3, 5, 10],
      curr: query.pagenum,
      layout: ["count", "limit", "prev", "page", "next", "skip"],
      jump: function (obj, first) {
        //obj包含了当前分页的所有参数，比如：
        query.pagenum = obj.curr; //得到当前页，以便向服务端请求对应页的数据。
        query.pagesize = obj.limit; //得到每页显示的条数

        //首次不执行
        if (!first) {
          //do something
          getArtList();
        }
      },
    });
  }
  //过滤时间
  template.defaults.imports.filterTime = function (msg) {
    let d = new Date(msg);
    let y = d.getFullYear();
    let m = d.getMonth();
    let dd = d.getDate();
    let h = d.getHours();
    let mm = d.getMinutes();
    let s = d.getSeconds();
    //补零
    function addZero(n) {
      return n > 10 ? n : "0" + n;
    }
    return `${y}-${addZero(m)}-${addZero(dd)} ${addZero(h)}:${addZero(
      mm
    )}:${addZero(s)}`;
  };
  //删除
  $("body").on("click", ".delete", function () {
    //console.log($(".delete").length);
    if ($(".delete").length === 1) {
      if (query.pagenum === 1) {
        query.pagenum === 1;
      } else {
        query.pagenum = query.pagenum - 1;
      }
    }
    let id = $(this).attr("data-id");
    //console.log(id);
    layer.confirm(" 确认删除?", { icon: 3, title: "提示" }, function (index) {
      //do something
      $.ajax({
        url: "/my/article/delete/" + id,
        success: function (res) {
          //console.log(res);
          if (res.status !== 0) {
            return layer.msg(res.message);
          }
          layer.msg(res.message);
          getArtList();
        },
      });
      layer.close(index);
    });
  });
  //编辑
  $("body").on("click", ".edit", function () {
    location.href="/article/art-publish.html"
  })
});
