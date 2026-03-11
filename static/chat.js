function sendMessage() {
    console.log('sendMessage called');  // Debug log
    const messageInput = document.getElementById('message');
    const message = messageInput.value.trim();
    console.log('Message:', message);  // Debug log
    if (!message) return;
    
    messageInput.value = '';
    addMessage('You: ' + message);
    console.log('Before fetch');  // Debug log
    
    fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message })
    })
    .then(response => {
        console.log('Fetch response status:', response.status);  // Debug log
        return response.json();
    })
    .then(data => {
        console.log('Response data:', data);  // Debug log
        if (data.error) {
            addMessage('Error: ' + data.error);
        } else {
            addMessage('Bot: ' + data.response);
        }
    })
    .catch(error => {
        console.log('Fetch error:', error);  // Debug log
        addMessage('Error: ' + error.message);
    });
}

function addMessage(text) {
    console.log('addMessage called with:', text);  // Debug log
    const chat = document.getElementById('chat');
    console.log('chat element:', chat);  // Debug log
    const p = document.createElement('p');
    p.textContent = text;
    chat.appendChild(p);
    chat.scrollTop = chat.scrollHeight;  // Auto-scroll to bottom
}

// Allow sending message with Enter key
document.getElementById('message').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});