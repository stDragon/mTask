var ul = $('#room > ul');
var form = $('#room form');

var description = $('#description');

var table = $('#request-list');
var tbody = $('#request-list tbody');

// var newRequest = new Object();

// newRequest.description = description;

var socket = io.connect('', {
  reconnect: false
});

socket
    .on('message', function(username, message, data, urgency) {
      printMessage(username + "> " + message);
    })
    .on('leave', function(username) {
      printStatus(username + " вышел из системы");
    })
    .on('join', function(username) {
      printStatus(username + " вошёл в систему");
    })
    .on('connect', function() {
      printStatus("соединение установлено");
      form.on('submit', sendMessage);
      description.prop('disabled', false);
    })
    .on('disconnect', function() {
      printStatus("соединение потеряно");
      form.off('submit', sendMessage);
      description.prop('disabled', true);
      this.$emit('error');
    })
    .on('logout', function() {
      location.href = "/";
    })
    .on('error', function(reason) {
      if (reason == "handshake unauthorized") {
        printStatus("вы вышли из сайта");
      } else {
        setTimeout(function() {
          socket.socket.connect();
        }, 500);
      }
    });

function sendMessage() {
  var text = description.val();
  socket.emit('message', text, function() {
    printMessage(text);
  });

  description.val('');
  return false;
}


function sendRequest() {
  var newRequest = new Object();

  // newRequest.kod = table.rows.length;
  newRequest.kod = document.getElementsByTagName('table').item(0).getElementsByTagName('tr').length || 1;
  newRequest.username = user;

  newRequest.text = input.val();
  newRequest.date = new Date(year);
  newRequest.urgency = 'chtlyt';



  socket.emit('message', newRequest, function() {
    printMessage(newRequest);
  });

  input.val('');
  return false;
}

function printStatus(status) {
  $('<li>').append($('<i>').text(status)).appendTo(ul);
}

function printMessage(newRequest) {
  $('#request-list tbody:last')
    .append('<tr><td>'+ newRequest.kid +'</td><td>'+ newRequest.data +'</td><td>'+ newRequest.username +'</td><td>'+ newRequest.text +'</td><td>'+ newRequest.urgency +'</td><td>'+ newRequest.status +'</td><td>'+ newRequest.complite +'</td></tr>');
}
// function printMessage(text) {
//   $('#request-list tbody:last')
//     .append(text);
// }

// function addTableRow(jQtable){
//   jQtable.each(function(){
//     var tds = '<tr>';
//     jQuery.each($('tr:last td', this), function() {tds += '<td>'+$(this).html()+'</td>';});
//     tds += '</tr>';
//     if($('tbody', this).length > 0){$('tbody', this).append(tds);
//     }else {$(this).append(tds);}
//   });
// }

// <div class="table-responsive">
//     <table class="table table-striped">
//       <tbody>
//         <tr class="alert alert-success">
//           <td>#0001</td>
//           <td>20.02.2014</td>
//           <td>Иванов И.И.</td>
//           <td>Неисправна сеть</td>
//           <td>стандартно</td>
//           <td>обработка</td>
//           <td></td>
//         </tr>
//         <tr class="alert alert-success">
//           <td>#0011</td>
//           <td>20.02.2014</td>
//           <td>Иванов И.И.</td>
//           <td>Неисправна сеть</td>
//           <td>стандартно</td>
//           <td>обработка</td>
//           <td></td>
//         </tr>


