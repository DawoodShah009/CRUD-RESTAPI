$(document).ready(function() {
    $.ajax({
        data: {
            'title': $('#title').val(),
            'desc': $('#desc').val(),
        },
        type: 'GET',
        url: '/todo/api',

        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        success: function(todoList) {
            console.log(todoList);
            todoList.forEach(item => {
                var id = item['id']
                var title = item['title']
                var desc = item['desc']

                c1 = "<td>" + id + "</td>"
                c2 = "<td>" + title + "</td>"
                c3 = "<td>" + desc + "</td>"
                b1 = "<td><a  type = 'button' id = 'btn1' class='btn btn-success' onClick=delete(id)> Delete </a></td>"

                b2 = "<td><a type = 'button' id = 'btn2' class='btn btn-success'  href='/todo/api/" + id + "'> Info </a></td>"
                b3 = "<td><a type = 'button' id = 'btn3' class='btn btn-success' onClick=delete(id)> Update </a></td>"


                row = "<tr>" + c1 + c2 + c3 + b1 + b2 + b3 + "</tr>"
                $('#table1').append(row)
            });
        },
    });
    delete(id) {
        $.ajax({
            type: 'DELETE',
            url: 'todo/api/' + id,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        });
    };
    update(id) {
        $.ajax({
            type: 'PUT',
            url: 'todo/api/' + id,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        });
    };

    $('form').on('submit', function(event) {
        $.ajax({
            data: {
                'title': $('#title').val(),
                'desc': $('#desc').val(),
            },
            type: 'POST',
            url: '/todo/api',

            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            success: function(todoItems) {
                $('#title').val('');
                $('#desc').val('');
                console.log('Posted', todoItems);
                var id = todoItems['id']
                var title = todoItems['title']
                var desc = todoItems['desc']

                c1 = "<td>" + id + "</td>"
                c2 = "<td>" + title + "</td>"
                c3 = "<td>" + desc + "</td>"
                b1 = "<td><a type = 'button' id = 'btn1' class='btn btn-success'   onClick=delete(id)> Delete </a></td>"
                b2 = "<td><a type = 'button' id = 'btn2' class='btn btn-success'  href='/todo/api/" + id + "'> Info </a></td>"
                b3 = "<td><a type = 'button' id = 'btn3' class='btn btn-success' onClick=delete(id)> Update </a></td>"

                row = "<tr>" + c1 + c2 + c3 + b1 + b2 + b3 + "</tr>"
                $('#table1').append(row)
            },
        });
        event.preventDefault();
    });
});


// $(document).on("click", "#btn1", function() {
//     // $('#btn1 a').click(function() {
//     alert("In click");
//     var id = $(this).val();
//     console.log(id);
//     $.ajax({
//         type: 'GET',
//         url: 'todo/api/del/168',
//         headers: {
//             'Access-Control-Allow-Origin': '*',
//         },
//         // success: function(){},
//     });
// });