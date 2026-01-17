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

            if (!response.ok) throw new Error('Backend not responding');

            const data = await response.json();
            addMessage(data.response, 'bot');
        } catch (error) {
            console.warn('Backend connection failed. Switching to Local Demo Mode.');
            // Local Mock AI Fallback for testing without a backend
            const mockResponse = getMockResponse(text);
            setTimeout(() => {
                addMessage(mockResponse + " (Demo Mode)", 'bot');
            }, 500);
        }
    });

    // Simple keyword-based mock AI for Demo Mode
    function getMockResponse(text) {
        const lowerText = text.toLowerCase();
        if (lowerText.includes('happy') || lowerText.includes('great')) return "I'm so glad to hear that! Keep that positive energy going.";
        if (lowerText.includes('sad') || lowerText.includes('bad')) return "I'm sorry you're feeling down. I'm here to listen.";
        if (lowerText.includes('stress') || lowerText.includes('exam')) return "Academic stress can be tough. Remember to take a break and breathe.";
        if (lowerText.includes('angry') || lowerText.includes('frustrate')) return "It's okay to feel frustrated. Take your time to vent.";
        return "I hear you. Tell me more about how you're feeling?";
    }

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
