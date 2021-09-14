(function() {
  const $tbody = $('.agent-report__equipment  table  tbody');
  const $line = $tbody.children().eq(1);

  console.log($line.clone()[0]);

  $('.agent-report__add-line').on('click', function() {
    $tbody.append($line.clone());
  })
})();
