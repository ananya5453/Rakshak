from typing import List, Optional
from pydantic import BaseModel, Field

class RedFlag(BaseModel):
    text: str
    reason: str
    severity: str = "high"
    category: str = "urgency"

class SimulationStep(BaseModel):
    step: int
    title: str
    description: str
    stage: str

class UrlAnalysis(BaseModel):
    url: str
    domain: str
    is_https: bool
    has_suspicious_tld: bool
    is_shortened: bool
    is_ip_address: bool
    brand_mismatch: bool
    notes: List[str] = []

class AnalyzeRequest(BaseModel):
    content: str
    language: str = "English"

class AnalyzeUrlRequest(BaseModel):
    url: str
    language: str = "English"

class FeedbackRequest(BaseModel):
    analysis_id: str
    helpful: bool
    comments: Optional[str] = None

class AnalysisResponse(BaseModel):
    verdict: str
    risk_level: str
    risk_score: int
    scam_type: str
    confidence: float
    summary: str
    elderly_explanation: str
    red_flags: List[RedFlag]
    likely_goal: str
    scammer_tactics: List[str]
    scenario_flow: List[SimulationStep]
    recommended_actions: dict
    language: str
    url_analysis: Optional[UrlAnalysis] = None
