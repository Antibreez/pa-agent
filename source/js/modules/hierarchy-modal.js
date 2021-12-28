(function () {
  const $trigger = $(".subscription-all__hierarchy-trigger");
  const $modal = $(".hierarchy");
  const $blackout = $modal.find(".hierarchy__blackout");
  const $close = $modal.find(".hierarchy__close");

  $trigger.on("click", function () {
    $modal.addClass("opened");
  });

  $blackout.on("click", function () {
    $modal.removeClass("opened");
  });

  $close.on("click", function () {
    $modal.removeClass("opened");
  });
})();
