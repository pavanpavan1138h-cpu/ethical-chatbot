document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');
    const moodBtns = document.querySelectorAll('.mood-btn');

    // Generate a simple session ID
    const sessionId = Math.random().toString(36).substring(7);

    // Handle Chat Submission
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const text = userInput.value.trim();
        if (!text) return;

        addMessage(text, 'user');
        userInput.value = '';

        try {
            // Call the backend API
            const response = await fetch('http://localhost:8000/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ session_id: sessionId, text: text })
            });

            const data = await response.json();
            addMessage(data.response, 'bot');
        } catch (error) {
            console.error('Error:', error);
            addMessage("I'm having trouble connecting to my brain right now. Please make sure the backend is running.", 'bot');
        }
    });

    // Handle Mood Check-ins
    moodBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const mood = btn.dataset.mood;
            // Optionally send this to the backend as a special message
            const moodMap = {
                joy: "I'm feeling great! 😊",
                neutral: "I'm feeling okay. 😐",
                sadness: "I'm feeling a bit down. 😔",
                anger: "I'm feeling frustrated. 😠",
                fear: "I'm feeling a bit anxious. 😰"
            };

            userInput.value = moodMap[mood];
            chatForm.dispatchEvent(new Event('submit'));
        });
    });

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        messageDiv.innerHTML = `<p>${text}</p>`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});
