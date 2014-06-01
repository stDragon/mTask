var ul = $('#room ul');
var input = $('#description');
var form = $('#room form');

var tbody = $('#request');

var socket = io.connect('', {
  reconnect: false
});

socket
    // .on('message', function(username, message) {
    //   printMessage(username + "> " + message);
    // })
    .on('message', function(username, message) {
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
      input.prop('disabled', false);
    })
    .on('disconnect', function() {
      printStatus("соединение потеряно");
      form.off('submit', sendMessage);
      input.prop('disabled', true);
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
  var text = input.val();
  socket.emit('message', text, function() {
    printMessage("вы> " + text);
  });

  input.val('');
  return false;
}

function printStatus(status) {
  $('<li>').append($('<i>').text(status)).appendTo(ul);
}

// function printMessage(text) {
//   $('<li>').text(text).appendTo(ul);
// }

function sendRequest() {
  var text = input.val();
  socket.emit('message', text, function() {
    printMessage(text);
  });

  input.val('');
  return false;
}

function printMessage(text) {
  $('<td>').text(text).appendTo(tbody);
}

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


