$(document).ready(function() {

    $('form').on('submit', function(event) {
        $.ajax({
            data: {
                'title': $('#title').val(),
                'desc': $('#desc').val(),
            },
            type: 'PUT',
            url: '/todo/api' + row.id,

            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        });
        event.preventDefault();
    });
});