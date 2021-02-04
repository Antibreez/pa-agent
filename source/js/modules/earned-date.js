(function() {
  const menu = $('.mutual-calcs__earned-date-menu');
  const btn = $('.mutual-calcs__earned-date-btn');

    $.extend($.datepicker, {

        // Reference the orignal function so we can override it and call it later
        _inlineDatepicker2: $.datepicker._inlineDatepicker,

        // Override the _inlineDatepicker method
        _inlineDatepicker: function (target, inst) {

            // Call the original
            this._inlineDatepicker2(target, inst);

            var beforeShow = $.datepicker._get(inst, 'beforeShow');

            if (beforeShow) {
                beforeShow.apply(target, [target, inst]);
            }
        }
    });


  $('.mutual-calcs__earned-date-btn').on('click', function() {
    $('.mutual-calcs__earned-date-menu').toggle();
  });

  $('.date-input-period').datepicker({
    range: 'period',
    inline: true,
    showButtonPanel: true,
    showOtherMonths: true,
    selectOtherMonths: true,
    closeText : "Готово",

    beforeShow: function(input, inst) {
      inst.dpDiv.addClass('disabled-close');
    },

    onSelect: function(dateText, inst, extensionRange) {
      $('.mutual-calcs__earned-date-btn').text(extensionRange.startDateText + ' - ' + extensionRange.endDateText);

    }
  });

  $(document).mouseup(function (e){
		const menu = $('.mutual-calcs__earned-date-menu');
		const btn = $('.mutual-calcs__earned-date-btn');
    if (!menu.is(e.target)
      && menu.has(e.target).length === 0
      && !btn.is(e.target)
      && btn.has(e.target).length === 0
    ) {
			menu.hide();
		}
  });

  $('.mutual-calcs__earned-date-menu-btn').on('click', function() {
    if ($(this).hasClass('all-time')) {
      $('.mutual-calcs__earned-date-btn').text(
        $(this).text()
        + ' (с '
        + $('.earned-date__start-period').text()
        + ')'
      )
    } else {
      $('.mutual-calcs__earned-date-btn').text(
        $(this).text()
      )
    }

    menu.hide();

  });

  $('.mutual-calcs__earned-date-btn').text(
    $('.mutual-calcs__earned-date-menu-btn.all-time').text()
    + ' (с '
    + $('.earned-date__start-period').text()
    + ')'
  )
})();
