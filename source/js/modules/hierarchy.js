(function () {
  const $line = $(".hierarchy__line");

  $line.on("click", function () {
    $(this).find(".hierarchy__open-btn").toggleClass("opened");
    $(this).next().toggleClass("opened");

    if (!$(this).hasClass("marked")) {
      $line.removeClass("marked");
      $(this).addClass("marked");
    }
  });
})();
