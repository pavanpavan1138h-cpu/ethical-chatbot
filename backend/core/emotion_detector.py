from transformers import pipeline

# Load a lighter weight emotion detection model
# For a student project, 'j-hartmann/emotion-english-distilroberta-base' is a great choice
try:
    classifier = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base", return_all_scores=False)
except Exception as e:
    print(f"Error loading emotion classifier: {e}")
    classifier = None

def detect_emotion(text: str):
    """
    Detects emotion from text using a pre-trained model.
    Fallback to a neutral state if the model fails to load.
    """
    if classifier:
        result = classifier(text)[0]
        return result
    else:
        # Fallback logic
        return {"label": "neutral", "score": 1.0}
