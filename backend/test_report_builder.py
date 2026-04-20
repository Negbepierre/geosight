from dotenv import load_dotenv
import os
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

from services.report_builder import assemble_report

fake_scored = [
    {
        "model": "claude",
        "query": "best video production companies London",
        "response": "Future is a top video agency in London.",
        "success": True,
        "latency_seconds": 2.1,
        "mention": {"mentioned": True, "position": "first"},
        "sentiment": "positive",
        "score": 100
    },
    {
        "model": "claude",
        "query": "who makes corporate brand films UK",
        "response": "There are many great agencies but none stand out.",
        "success": True,
        "latency_seconds": 1.8,
        "mention": {"mentioned": False, "position": None},
        "sentiment": "neutral",
        "score": 0
    }
]

fake_summary = {
    "company": "Future",
    "overall_score": 50.0,
    "by_model": {
        "claude": {"mention_rate": 50, "avg_score": 50, "total_queries": 2, "mentions": 1},
        "chatgpt": {"mention_rate": 0, "avg_score": 0, "total_queries": 0, "mentions": 0},
        "gemini": {"mention_rate": 0, "avg_score": 0, "total_queries": 0, "mentions": 0}
    },
    "total_queries_run": 2,
    "total_mentions": 1
}

report = assemble_report(
    audit_id="test-001",
    company_name="Future",
    industry="video production",
    location="London",
    queries=["best video production companies London", "who makes corporate brand films UK"],
    scored_results=fake_scored,
    visibility_summary=fake_summary
)

print("AUDIT ID:", report["audit_id"])
print("COMPANY:", report["company_name"])
print("OVERALL SCORE:", report["visibility_summary"]["overall_score"])
print("TOTAL QUERIES:", report["total_queries"])
print("\nACTION PLAN:")
for i, action in enumerate(report["action_plan"]):
    print(f"{i+1}. [{action['priority'].upper()}] {action['title']}")
    print(f"   {action['description']}")
    print(f"   Effort: {action['effort']}")