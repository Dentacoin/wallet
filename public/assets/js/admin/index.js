jQuery(window).on("load", function()   {

});

jQuery(window).on('resize', function(){

});

jQuery(document).ready(function()   {
    addCsrfTokenToAllAjax();
    addHTMLEditor();
    initDataTable();
});

jQuery(window).on("scroll", function () {

});

function initDataTable()    {
    if($("table.table.table-without-reorder").length > 0) {
        $("table.table.table-without-reorder").DataTable();
    }
    if($("table.table.table-with-reorder").length > 0) {
        var table = $("table.table.table-with-reorder").DataTable({
            rowReorder: true
        });
        $("table.table.table-with-reorder").addClass('sortable');
        table.on('row-reorder', function(e, diff, edit) {
            var order_object = {};
            for(let i = 0, len = diff.length; i < len; i+=1) {
                order_object[$(diff[i].node).data("id")] = diff[i].newPosition;
            }

            $.ajax({
                type: "POST",
                url: SITE_URL + "/homepage/update-order",
                data: {
                    "order_object" : order_object
                },
                dataType: 'json',
                success: function (response) {
                    if(response.success)    {
                        basic.showAlert(response.success);
                    }
                }
            });
        });
    }
}

function addHTMLEditor(){
    if($('.ckeditor-init').length > 0)   {
        $('.ckeditor-init').each(function() {
            CKEDITOR.replace($(this).attr('id'));
        });
    }
}

function addCsrfTokenToAllAjax()    {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
}

function openMedia(id, close_btn)    {
    if(id === undefined) {
        id = null;
    }
    if(close_btn === undefined) {
        close_btn = false;
    }
    $.ajax({
        type: "POST",
        url: SITE_URL + "/open-media",
        dataType: 'json',
        success: function (response) {
            if(response.success) {
                basic.showDialog(response.success, 'media-popup');
                initDataTable();

                $('.media-popup .use-media').click(function()   {
                    if(id != null)	{
                        $('.media[data-id="'+id+'"] .image-visualization').html('<img class="small-image" src="'+$(this).closest('tr').find('.small-image').attr('src')+'"/>');
                        $('.media[data-id="'+id+'"] input[name="image"]').val($(this).closest('tr').attr('data-id'));
                    }else {
                        $('.image-visualization').html('<img class="small-image" src="'+$(this).closest('tr').find('.small-image').attr('src')+'"/>');
                        $('input[name="image"]').val($(this).closest('tr').attr('data-id'));
                    }
                    if(close_btn) {
                        $('.image-visualization').append('<span class="inline-block-top remove-image"><i class="fa fa-times" aria-hidden="true"></i></span>');
                        removeImage();
                    }
                    basic.closeDialog();
                });
            }
        }
    });
}

function removeImage()  {
    if($('.remove-image').length > 0)   {
        $('.remove-image').click(function()    {
            $('.image-visualization').html('');
            $('input[name="image"]').val('');
        });
    }
}
removeImage();
