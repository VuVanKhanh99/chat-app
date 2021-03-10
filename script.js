const socket = io('http://localhost:3000')
const messageForm = document.getElementById('send-container')
const messageContainer = document.getElementById('message-container')
const messageInput = document.getElementById('message-input')

const name = prompt('What is your name ?');
appendMessage('You has joined');
socket.emit('new-user',name);


socket.on('chat-message', data =>{
    appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected',name => {
    appendMessage(`${name}, has joined`)
})

socket.on('user-disconnected',name => {
    console.log('ad vn');
    appendMessage(`${name}, disconnected`);
})

messageForm.addEventListener('submit',e =>{
    e.preventDefault()
    const message = messageInput.value;
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message',message)
    messageInput.value = '';
})

function appendMessage(message){
    const messageElement = document.createElement('div');

//   messageElement.id = 'message-container'
    messageElement.innerText = message;
    messageContainer.append(messageElement);
    
}