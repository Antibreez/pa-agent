(function () {
  const $btn = $(".subscription-all__sell-service-btn");
  const $dropdown = $(".subscription-all__sell-service-dropdown");

  $btn.on("click", function () {
    $(this).toggleClass("opened");
    $dropdown.toggleClass("opened");
  });

  $(document).on("click", function (e) {
    const $target = $(e.target);

    if ($target.parents(".subscription-all__sell-service-btn").length > 0) {
      return;
    }

    if ($target.hasClass("subscription-all__sell-service-btn")) {
      return;
    }

    if (
      $target.parents(".subscription-all__sell-service-dropdown").length > 0
    ) {
      return;
    }

    if ($target.hasClass("subscription-all__sell-service-dropdown")) {
      return;
    }

    $btn.removeClass("opened");
    $dropdown.removeClass("opened");
  });
})();
