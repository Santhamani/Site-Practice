
var socket = io();
var chatUserName = document.querySelector('#chat-username');
var chatMessage = document.querySelector('#chat-message');

socket.on('connect',function(){
    var chatForm = document.forms.chatForm;

    if(chatForm){
   
    chatForm.addEventListener('submit', function(e){
        e.preventDefault();
        socket.emit('postMessage',{
            username: chatUserName.value,
            message: chatMessage.value,
        });
        /*showMessage({
            username: chatUserName.value,
            message: chatMessage.value,
        });*/
       
        chatMessage.value ='';
        chatMessage.focus();
    });//chatform event
     socket.on('updateMessages', function(data){
            showMessage(data);
        });//updateMessages
    }//chatform
});//

    function showMessage(data){
        var chatDisplay = document.querySelector('.chat-display');
        var newMessage = document.createElement('p');

        newMessage.className = 'bg-info chat-text';
/*
        if( chatUserName.value = data.username ){
           newMessage.className = 'bg-success chat-text';
        }
        else{
            newMessage.className = 'bg-info chat-text';
        }
*/

        newMessage.innerHTML ='<strong>' +data.username + '</strong>:' + data.message ;
        chatDisplay.insertBefore(newMessage, chatDisplay.firstChild);
    }