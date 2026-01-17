import random

class ConversationManager:
    def __init__(self):
        # Store session history: {session_id: [list of emotions or messages]}
        self.history = {}
        
        # Detailed, multi-sentence empathetic responses
        self.responses = {
            "joy": [
                "I'm so glad to hear you're feeling good! What made your day so bright? 😊 It's wonderful to see these positive moments during the semester. Taking a moment to celebrate your wins is a great way to build resilience. Is there anything else exciting happening that you'd like to share?",
                "That's fantastic news! ✨ You've clearly put in a lot of hard work, and seeing it pay off must feel incredibly rewarding. Keep that positive energy going—it can really help you stay motivated for your future goals. What's the next thing you're looking forward to?",
                "Hearing that you're happy makes me happy too! 🌟 It's so important to acknowledge when things go well. In the middle of academic pressure, these high points are what keep us going. How does this success change your perspective on your upcoming tasks?"
            ],
            "sadness": [
                "I'm truly sorry you're feeling this way. It's completely okay to not be okay sometimes, especially with everything you're balancing right now. 💙 I'm here to listen without judgment. Would you like to talk more about what's weighing on your mind, or perhaps we could explore some gentle ways to help you feel a bit more grounded?",
                "That sounds really tough, and it's valid to feel low when things aren't going as expected. ☁️ Sometimes just acknowledging the sadness is a big first step toward healing. Sending you a virtual high-five for being strong enough to share that with me. What do you feel would be most helpful for you in this moment?",
                "I can hear how much this is affecting you. 🌙 Please be kind to yourself today. Remember that everyone faces these difficult periods, and you don't have to carry it all alone. If you feel up to it, telling me a bit more about what happened might help lighten the load a little."
            ],
            "anger": [
                "It sounds like you're really frustrated and upset right now. I'm here if you want to vent and get it all out of your system. 😤 It's completely understandable to feel this way when things feel unfair or or when your hard work isn't recognized. Do you feel like you need some space to cool down, or would you like to dive deeper into what triggered this?",
                "Anger can be such a heavy and draining emotion. 🗯️ I'm listening, and I want you to know that your feelings are valid. What's been the biggest challenge today that led to this feeling? Sometimes breaking down the source of the frustration can make it feel a bit more manageable.",
                "I can tell you're very upset, and I'm glad you're sharing that here. 🔥 Sometimes getting it out of your system is the best thing you can do for your mental clarity. What’s the main thing bothering you right now? I'm here to support you through this frustration."
            ],
            "fear": [
                "It sounds like you're feeling quite anxious or worried about what's ahead. Academic stress can be a lot to handle, and it's natural to feel overwhelmed by deadlines or exams. 😟 Remember to take deep breaths—you've navigated challenges before. What’s the most pressing thing on your mind right now? We can try to break it down together.",
                "I'm here with you. 🌬️ The unknown can be scary, especially when there's pressure to perform. Let's take it one step at a time. Have you had a chance to rest or step away from your work today? Sometimes a small break is the best thing for a worried mind. How can we make the next hour feel a bit easier for you?",
                "It's completely normal to feel this way when things pile up. 🌿 You are more than your grades or your productivity. Let's focus on what you can control right now. If we were to look at your biggest worry, what would be one small thing we could tackle together to help you feel a bit more in control?"
            ],
            "neutral": [
                "I'm here for you. How has your day been unfolding so far? 👋 I'm always interested in hearing about your experiences, whether they're big milestones or just the quiet moments in between. Is there anything specific on your mind that you'd like to explore today?",
                "How have you been feeling about your studies and your overall balance lately? 📚 Sometimes it's nice to just check in and see where your head is at. I'm listening, so feel free to share as much or as little as you'd like. What's been occupies your thoughts the most recently?",
                "Just checking in—how's your energy level feeling today? ☕ Sometimes we move so fast we forget to ask ourselves how we're actually doing. I'm here as a safe space for whatever you need to share, even if it's just a neutral reflection on your day."
            ]
        }

    def generate_response(self, text: str, emotion_result: dict, session_id: str):
        """
        Orchestrates the response generation with simple memory.
        """
        emotion = emotion_result['label']
        
        # Initialize history for session if not exists
        if session_id not in self.history:
            self.history[session_id] = []
        
        # Add current emotion to history
        self.history[session_id].append(emotion)
        
        # Check for patterns in memory (e.g., consistent sadness)
        history = self.history[session_id]
        if len(history) >= 3 and all(e in ["sadness", "fear", "anger"] for e in history[-3:]):
            return "I've noticed you've been having a really tough time over the last few moments we've chatted. 💙 It sounds like a lot is weighing on you. Remember that it's okay to seek extra support if things feel too heavy. I'm still here to listen, but I want to make sure you're taking care of yourself. What's one small thing we can talk about that might make you feel even a little bit better?"

        # Default response based on current emotion
        if emotion in self.responses:
            return random.choice(self.responses[emotion])
        else:
            return random.choice(self.responses["neutral"])
