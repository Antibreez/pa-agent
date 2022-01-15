(function () {
  const $btn = $(".reports__download-btn");
  const $dropdown = $(".reports__download-dropdown");

  $btn.on("click", function () {
    const isOpened = $(this).next().hasClass("shown");

    $dropdown.removeClass("shown");

    !isOpened && $(this).next().addClass("shown");
  });

  $(document).on("click", function (e) {
    const $target = $(e.target);

    if (
      $target.hasClass("reports__download-btn") ||
      $target.parents(".reports__download-btn").length > 0 ||
      $target.hasClass("reports__download-dropdown") ||
      $target.parents(".reports__download-dropdown").length > 0
    ) {
      return;
    } else {
      $dropdown.removeClass("shown");
    }
  });
})();
