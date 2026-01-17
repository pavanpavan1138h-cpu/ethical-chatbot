import random

class ConversationManager:
    def __init__(self):
        # Simple rule-based empathetic responses for an academic project
        self.responses = {
            "joy": [
                "I'm so glad to hear you're feeling good! What made your day so bright?",
                "That's wonderful! It's great to have those positive moments during the semester.",
                "Keep that positive energy going! Anything special you're celebrating?"
            ],
            "sadness": [
                "I'm sorry you're feeling this way. It's okay to not be okay sometimes.",
                "I'm here to listen. Would you like to talk more about what's making you feel sad?",
                "Take all the time you need. Sometimes just acknowledging the sadness is a big first step."
            ],
            "anger": [
                "It sounds like you're really frustrated right now. I'm here if you want to vent.",
                "Anger can be such a heavy emotion. What's been the biggest challenge today?",
                "It's valid to feel angry when things don't go as planned. I'm listening."
            ],
            "fear": [
                "It sounds like you're feeling a bit anxious or worried. Academic stress can be a lot to handle.",
                "I'm here with you. What's the most pressing thing on your mind right now?",
                "Remember to take deep breaths. We can break things down together if that helps."
            ],
            "neutral": [
                "I'm here. How's your day going so far?",
                "How have you been feeling about your studies lately?",
                "I'm listening. Is there anything specific on your mind?"
            ]
        }

    def generate_response(self, text: str, emotion_result: dict, session_id: str):
        """
        Orchestrates the response generation.
        In a full LLM implementation, this would call an external API.
        For this project, we use a hybrid of rule-based and template-based logic.
        """
        emotion = emotion_result['label']
        # Map specific model labels to our response keys if necessary
        # Model might return 'joy', 'sadness', 'anger', 'fear', 'surprise', 'love'
        
        if emotion in self.responses:
            return random.choice(self.responses[emotion])
        else:
            return random.choice(self.responses["neutral"])
