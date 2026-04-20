from dotenv import load_dotenv
import os
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

from services.mention_scorer import detect_mention, score_all_results, calculate_summary

fake_results = [
    {
        "model": "claude",
        "query": "best video production companies London",
        "response": "Future is one of the top video production companies in London, known for excellent brand films.",
        "success": True,
        "latency_seconds": 2.1
    },
    {
        "model": "claude",
        "query": "who makes corporate brand films UK",
        "response": "There are many great video agencies in London but none specifically stand out.",
        "success": True,
        "latency_seconds": 1.8
    }
]

scored = score_all_results(fake_results, "Future")

for r in scored:
    print("QUERY:", r["query"])
    print("MENTIONED:", r["mention"]["mentioned"])
    print("POSITION:", r["mention"].get("position"))
    print("SENTIMENT:", r["sentiment"])
    print("SCORE:", r["score"])
    print("---")

summary = calculate_summary(scored, "Future")
print("OVERALL SCORE:", summary["overall_score"])
print("TOTAL MENTIONS:", summary["total_mentions"])