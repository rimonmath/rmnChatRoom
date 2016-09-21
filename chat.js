var socket = io();

function rmn(id){
  return document.getElementById(id);
}

function submitfunction() {
    var from = rmn("user").value;

    var message = rmn("m").value;
    if (message != '') {
        socket.emit('chatMessage', from, message);
    }

    rmn("m").value = '';
    rmn("m").focus();
    return false;
}

function notifyTyping() {
    var user = rmn('user').value;
    var mmm = rmn('m').value;
    socket.emit('notifyUser', user, mmm);
}



socket.on('chatMessage', function(from, msg) {
    var from = from;
    var me = rmn('user').value;
    var cls = (from == me) ? 'me' : 'other';

    if(from == me){
      from = "Me";
    } else if(from != 'System'){
      from = from.substring(0, from.length - 7);
    }

    rmn('messages').innerHTML = rmn('messages').innerHTML + '<li class="'+ cls +'"><b>' + from + '</b>: ' + msg + '</li>';
    rmn('chatroom').scrollTop = rmn('chatroom').scrollHeight;
});


socket.on('notifyUser', function(user, mmm) {
    var me = rmn('user').value;
    if (user != me) {
        rmn('notifyUser').innerHTML = user.substring(0, user.length - 7) + ': ' + mmm;
    }
    setTimeout(function() {
        rmn('notifyUser').innerHTML = '';
    }, 9999);;
});



document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
    var name = makeid();
    rmn('user').value = name;
    socket.emit('chatMessage', 'System', '<strong>' + name.substring(0, name.length - 7) + '</strong> has joined the discussion');
});

function makeid() {
    var name = prompt("Enter Your Name", "");
    var text = "";

    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return name + "(" + text + ")";
}