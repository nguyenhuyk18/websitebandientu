// Call the dataTables jQuery plugin
$(document).ready(function () {
  $('#dataTable').DataTable({
    ordering: false,
    language: {
      url: "/js/lang/vi.json"
    }
  });
});
