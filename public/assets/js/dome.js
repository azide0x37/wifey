/* ============================================================
 * DataTables
 * ============================================================ */
(function($) {

    // Only for fillin modals so that the backdrop action is still there
    $('#modalFillIn').on('show.bs.modal', function(e) {
        $('body').addClass('fill-in-modal');
    })
    $('#modalFillIn').on('hidden.bs.modal', function(e) {
        $('body').removeClass('fill-in-modal');
    })

    'use strict';

    var responsiveHelper = undefined;
    var breakpointDefinition = {
        tablet: 1024,
        phone: 480
    };

    // Initialize datatable with ability to add rows dynamically
    var initBudgetDataTable = function() {
        var table = $('#BudgetDataTable');

        var settings = {
            "sDom": "<'table-responsive't><'row'<p i>>",
            "destroy": true,
            "scrollCollapse": true,
            "oLanguage": {
                "sLengthMenu": "_MENU_ ",
                "sInfo": "Showing <b>_START_ to _END_</b> of _TOTAL_ entries"
            },
            "iDisplayLength": 25
        };

        table.dataTable(settings);

        // search box for table
        $('#search-table').keyup(function() {
            table.fnFilter($(this).val());
        });

            //Add data from fill in modal to DataTable
        $('#add-app').click(function() {
            table.dataTable().fnAddData([
                $("#appTime").val(),
                $("#appDate").val(),
                $("#appDescription").val(),
                $("#appAmount").val(),
                $("#appBalance").val()
                ]);
            
            $('body').removeClass('fill-in-modal');
            });

    }


    //END 
    initBudgetDataTable();

})(window.jQuery);