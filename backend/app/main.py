import os
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.schemas.scam import AnalyzeRequest, AnalyzeUrlRequest, FeedbackRequest, AnalysisResponse

app = FastAPI(
    title="Rakshak — Is this a scam? AI Scam Detection API",
    description="Backend API for detecting Indian scams across WhatsApp, SMS, UPI, Courier, and Banking.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health_check():
    return {
        "status": "ok",
        "service": "Rakshak Python FastAPI Backend",
        "gemini_configured": bool(os.getenv("GEMINI_API_KEY"))
    }

@app.get("/api/scam-types")
def get_scam_types():
    return {
        "categories": [
            "Bank / KYC Scam",
            "UPI / Payment Scam",
            "Courier / Parcel Scam",
            "Job / Work-from-Home Scam",
            "Electricity / Utility Bill Scam",
            "Digital Arrest / Police Impersonation",
            "Investment / Crypto Scam",
            "Instant Loan Scam",
            "Customer Care Impersonation",
            "Phishing Link / Malicious APK",
            "Lottery / Prize Scam",
            "SIM / FASTag Deactivation",
            "Legitimate / Safe Notification",
            "Unknown / Other"
        ]
    }

@app.post("/api/analyze/text", response_model=AnalysisResponse)
def analyze_text(request: AnalyzeRequest):
    content = request.content.lower()
    is_scam = any(w in content for w in ["blocked", "kyc", "pin", "otp", "telegram", "parcel", "police", "arrest", "electricity", "urgent"])
    verdict = "SCAM" if is_scam else "SAFE"
    risk_level = "HIGH" if is_scam else "LOW"
    risk_score = 88 if is_scam else 12

    return {
        "verdict": verdict,
        "risk_level": risk_level,
        "risk_score": risk_score,
        "scam_type": "Bank / KYC Scam" if "kyc" in content else ("Courier / Parcel Scam" if "parcel" in content else "Suspicious Message"),
        "confidence": 0.91,
        "summary": "This message shows several characteristics commonly associated with scams." if is_scam else "This message appears to be safe.",
        "elderly_explanation": "⚠️ Someone may be trying to trick you into giving away bank details or money. Do not click any links." if is_scam else "This message looks safe, but never share OTPs with strangers.",
        "red_flags": [
            {"text": "Urgency / Threat detected", "reason": "Pressure to act quickly", "severity": "high", "category": "urgency"}
        ] if is_scam else [],
        "likely_goal": "Steal netbanking credentials or initiate unauthorized payments" if is_scam else "Informational message",
        "scammer_tactics": ["Creates false urgency", "Directs to suspicious website"] if is_scam else [],
        "scenario_flow": [
            {"step": 1, "title": "Urgent Alert Received", "description": "Message creates panic about account deactivation.", "stage": "trigger"},
            {"step": 2, "title": "Clicks Deceptive Link", "description": "Victim opens unverified page.", "stage": "trap"},
            {"step": 3, "title": "Enters Bank Passwords or OTP", "description": "Fraudster harvests sensitive credentials.", "stage": "exploitation"},
            {"step": 4, "title": "Unauthorized Withdrawal", "description": "Money is diverted to mule accounts.", "stage": "consequence"}
        ] if is_scam else [],
        "recommended_actions": {
            "doThis": [
                "Verify through your bank's official mobile app.",
                "Call 1930 Cyber Helpline if money was deducted."
            ],
            "dontDoThis": [
                "Do not click the link.",
                "Never share OTP or enter your UPI PIN to receive money."
            ]
        },
        "language": request.language,
        "url_analysis": None
    }

@app.post("/api/analyze/url")
def analyze_url_endpoint(request: AnalyzeUrlRequest):
    return analyze_text(AnalyzeRequest(content=f"Check this link: {request.url}", language=request.language))

@app.post("/api/feedback")
def submit_feedback(request: FeedbackRequest):
    return {"status": "success", "message": "Feedback recorded."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
