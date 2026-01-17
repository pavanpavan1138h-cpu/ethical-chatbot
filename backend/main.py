from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from core.emotion_detector import detect_emotion
from core.safety_filter import SafetyFilter
from core.conversation_manager import ConversationManager

app = FastAPI(title="Ethical Student Chatbot API")

# Initialize modules
safety_filter = SafetyFilter()
conv_manager = ConversationManager()

class UserMessage(BaseModel):
    session_id: str
    text: str

class BotResponse(BaseModel):
    response: str
    emotion: str
    safety_status: str

@app.get("/")
async def root():
    return {"message": "Welcome to the Ethical Student Chatbot API"}

@app.post("/chat", response_model=BotResponse)
async def chat(message: UserMessage):
    # 1. Safety Filter (Input)
    is_safe_input, reason = safety_filter.check_input(message.text)
    if not is_safe_input:
        return BotResponse(
            response=safety_filter.get_crisis_resources(),
            emotion="N/A",
            safety_status=f"Triggered: {reason}"
        )

    # 2. Emotion Detection
    emotion_result = detect_emotion(message.text)
    
    # 3. Decision Logic / Response Generation
    response_text = conv_manager.generate_response(message.text, emotion_result, message.session_id)
    
    # 4. Safety Filter (Output)
    is_safe_output, _ = safety_filter.check_output(response_text)
    if not is_safe_output:
        response_text = "I'm here to support you, but I'm having trouble finding the right words right now. Let's try talking about something else, or I can provide some resources if you're feeling overwhelmed."

    return BotResponse(
        response=response_text,
        emotion=emotion_result['label'],
        safety_status="Safe"
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
