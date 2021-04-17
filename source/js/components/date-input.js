(function() {
  $('.date-input:not(.date-input-range)').datepicker({dateFormat: 'dd.mm.yy'});

  $('.date-input-range').datepicker({
    range: 'period',
    inline: true,
    showButtonPanel: true,
    showOtherMonths: true,
    selectOtherMonths: true,
    closeText : "Готово",
    dateFormat: 'dd.mm.yy',

    beforeShow: function(input, inst) {
      inst.dpDiv.css('transform', 'translateX(-24px)');
      inst.dpDiv.addClass('calendar-range');
    },

    onSelect: function(dateText, inst, extensionRange) {
      inst.input.val(extensionRange.startDateText + ' - ' + extensionRange.endDateText);
    },
  });
})();
