import re

class SafetyFilter:
    def __init__(self):
        # Keywords that might indicate a crisis or need for professional help
        self.crisis_keywords = [
            r"\b(suicide|kill myself|end it all|harm myself|die)\b",
            r"\b(hurt (myself|someone else))\b",
            r"\b(overdose|pills)\b"
        ]
        
        # Keywords for medical advice prevention
        self.medical_keywords = [
            r"\b(prescribe|medication|diagnosis|disease|cure|doctor says)\b"
        ]

    def check_input(self, text: str):
        """
        Scans input for crisis keywords.
        """
        text = text.lower()
        for pattern in self.crisis_keywords:
            if re.search(pattern, text):
                return False, "Crisis Topic Detection"
        return True, "Safe"

    def check_output(self, text: str):
        """
        Scans output to ensure no clinical advice is being generated halluncinated.
        """
        text = text.lower()
        for pattern in self.medical_keywords:
            if re.search(pattern, text):
                return False, "Medical/Clinical Advice Prevention"
        return True, "Safe"

    def get_crisis_resources(self):
        """
        Returns hard-coded crisis resources.
        """
        return (
            "I'm very concerned about what you're sharing. Please know that you're not alone and help is available. "
            "If you're in immediate danger, please contact emergency services or a crisis hotline:\n"
            "- National Suicide Prevention Lifeline: 988 (US)\n"
            "- International Crisis Resources: https://www.befrienders.org/\n"
            "I am an AI and cannot provide crisis intervention or medical advice."
        )
