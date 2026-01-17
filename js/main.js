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

        showTyping();

        try {
            // Call the backend API
            const response = await fetch('http://localhost:8000/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ session_id: sessionId, text: text })
            });

            if (!response.ok) throw new Error('Backend not responding');

            const data = await response.json();
            hideTyping();
            addMessage(data.response, 'bot');
        } catch (error) {
            console.warn('Backend connection failed. Switching to Local Demo Mode.');
            // Local Mock AI Fallback for testing without a backend
            const mockResponse = getMockResponse(text);
            setTimeout(() => {
                hideTyping();
                addMessage(mockResponse + " (Demo Mode)", 'bot');
            }, 1000); // Realistic 1s delay for typing
        }
    });

    function showTyping() {
        if (document.querySelector('.typing')) return;
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing';
        typingDiv.innerHTML = '<span></span><span></span><span></span>';
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function hideTyping() {
        const typingDiv = document.querySelector('.typing');
        if (typingDiv) typingDiv.remove();
    }

    // Local Mock AI Memory for Demo Mode
    let demoHistory = [];

    // Simple keyword-based mock AI for Demo Mode
    function getMockResponse(text) {
        const lowerText = text.toLowerCase();

        // Safety Triggers
        if (lowerText.includes('die') || lowerText.includes('kill') || lowerText.includes('harm')) {
            return "I'm very concerned about what you're sharing. Please know that you're not alone and help is available. If you're in immediate danger, please reach out to professional services or call 988 immediately. ❤️ As an AI, I cannot provide crisis intervention, but I am here to encourage you to connect with the right support.";
        }

        // Context-aware Memory (Pattern Detection)
        const negativeWords = ['sad', 'bad', 'lonely', 'stress', 'fear', 'fail', 'angry', 'upset'];
        const isNegative = negativeWords.some(word => lowerText.includes(word));
        if (isNegative) demoHistory.push('negative');
        else demoHistory.push('positive');

        if (demoHistory.length >= 3 && demoHistory.slice(-3).every(val => val === 'negative')) {
            return "I've noticed you've been sharing some very heavy and difficult feelings lately. 💙 I want you to know that it's okay to feel overwhelmed, but please remember that there are campus resources and professionals who can support you more deeply than I can. I'm here to listen, but how about we take a deep breath together first?";
        }

        // Expanded Emotional Matching (Longer Responses)
        if (lowerText.includes('happy') || lowerText.includes('great') || lowerText.includes('ace') || lowerText.includes('win')) {
            return "I'm so glad to hear that! 😊 It sounds like you've had a wonderful experience, and you deserve to celebrate this moment. Academic journeys can be tough, so acknowledging these high points is key to staying motivated. What's the best part about this achievement for you?";
        }

        if (lowerText.includes('sad') || lowerText.includes('bad') || lowerText.includes('lonely') || lowerText.includes('miss')) {
            return "I'm truly sorry you're feeling down right now. 💙 It's completely valid to have these low days, and I want you to know I'm here to listen to whatever you'd like to share. Sometimes just putting these feelings into words can help lighten the burden. What do you think is contributing most to this feeling today?";
        }

        if (lowerText.includes('stress') || lowerText.includes('exam') || lowerText.includes('deadline') || lowerText.includes('anxious')) {
            return "Academic stress can feel incredibly overwhelming, especially when deadlines start to pile up. 🌬️ Please remember that your value is not defined by your grades alone. Have you had a chance to step away for a even 5 minutes today? Sometimes a short break can help clear your mind and make things feel more manageable.";
        }

        if (lowerText.includes('angry') || lowerText.includes('frustrate') || lowerText.includes('unfair') || lowerText.includes('hate')) {
            return "It sounds like you're dealing with a lot of frustration, and I can hear how much it's affecting you. 😤 It's okay to vent—sometimes that's exactly what's needed to clear some mental space. I'm listening, so feel free to share more about what happened or what you feel is unfair.";
        }

        return "I hear you, and I'm listening. 👋 How has your day been unfolding overall? I'm always here as a safe space for you to share your thoughts, whether they're about your studies or just something that's on your mind. Is there anything specific you'd like to dive into today?";
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
