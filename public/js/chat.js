var ul = $('#room > ul');
var form = $('#room form');
// var input = $('#room input');

var description = $('#description');

var table = $('#request-list');
var tbody = $('#request-list tbody');

// newRequest.kod = table.rows.length;

$(".dropdown-menu li a").click(function(){
  var selText = $(this).text();
  $(this).parents('.btn-group').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
});

var socket = io.connect('', {
  reconnect: false
});

socket
    .on('message', function(newRequest) {
      console.log(newRequest.username);
      printMessage(newRequest);
    })
    .on('leave', function(username) {
      printStatus(username + " вышел из системы");
    })
    .on('join', function(username) {
      printStatus(username + " вошёл в систему");
    })
    .on('connect', function() {
      printStatus("соединение установлено");
      form.on('submit', sendRequest);
      description.prop('disabled', false);
    })
    .on('disconnect', function() {
      printStatus("соединение потеряно");
      form.off('submit', sendRequest);
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

function formingRequest() {
  var newRequest = new Object();
  newRequest.kod = document.getElementsByTagName('tbody').item(0).getElementsByTagName('tr').length || 0;
  newRequest.date = new Date();
  // newRequest.username = username;
  newRequest.request = description.val();
  newRequest.urgency = $("#urgency").text();

  return newRequest;
}

function formingMessage(newRequest){
  return '<tr><td>'+ newRequest.kod +'</td><td>'+ newRequest.date +'</td><td>'+ newRequest.username +'</td><td>'+ newRequest.request +'</td><td>'+ newRequest.urgency +'</td><td>'+ newRequest.status +'</td><td>'+ newRequest.complite +'</td></tr>'
}

function sendRequest() {
  var newRequest = formingRequest();
  socket.emit('message', newRequest, function(newRequest) {
  printMessage(newRequest);
});

  description.val('');
  return false;
}

function printStatus(status) {
  $('<li>').append($('<i>').text(status)).appendTo(ul);
}

function printMessage(newRequest) {
  var text =formingMessage(newRequest);
  $('#request-list tbody:last')
    .append(text);
}