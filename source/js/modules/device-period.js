(function () {
  function getYearLabel(num) {
    const text = "" + num;
    const lastNumber = +text[text.length - 1];
    const preLastNumber = +text[text.length - 2];

    if (preLastNumber === 1) {
      return `${num} лет`;
    }

    if (lastNumber === 1) {
      return `${num} год`;
    }

    if (lastNumber > 1 && lastNumber < 5) {
      return `${num} года`;
    }

    if (lastNumber > 4 || lastNumber === 0) {
      return `${num} лет`;
    }
  }

  const $years = $(".device-period__range-value-year");
  const $price = $(".device-period__range-value-price");
  const priceCurrency = $price.text();
  const priceBasic = +$price.attr("data-price");

  function getPrice(num) {
    const value = priceBasic * num;
    return `${value} ${priceCurrency}`;
  }

  $(".js-range-single-slider").ionRangeSlider({
    type: "single",
    grid: false,
    hide_min_max: true,
    extra_classes: "single-slider",
    onStart: function (data) {
      $years.text(getYearLabel(data.from));
      $price.text(getPrice(data.from));
    },
    onChange: function (data) {
      $years.text(getYearLabel(data.from));
      $price.text(getPrice(data.from));
    },
  });

  $(".irs--flat").on("click", function (e) {
    console.log(e.target);
  });
})();
