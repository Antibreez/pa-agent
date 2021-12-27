(function () {
  const $openBtn = $(".hierarchy__open-btn");
  const $link = $(".hierarchy__link");
  const $line = $(".hierarchy__line");

  $openBtn.on("click", function () {
    $(this).toggleClass("opened");
    $(this).parent().next().toggleClass("opened");
  });

  $link.on("click", function () {
    if ($(this).parent().hasClass("marked")) {
      return;
    }

    $line.removeClass("marked");
    $(this).parent().addClass("marked");
  });
})();
