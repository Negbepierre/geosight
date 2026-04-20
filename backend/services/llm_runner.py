import anthropic
import os
import time
from datetime import datetime

client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

SYSTEM_PROMPT = """You are a helpful assistant. When asked about companies, 
agencies, or services, provide honest recommendations based on your knowledge. 
Be specific and mention actual company names where relevant."""


def query_claude(query):

    try:
        start = time.time()

        response = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=400,
            system=SYSTEM_PROMPT,
            messages=[{"role": "user", "content": query}]
        )

        elapsed = round(time.time() - start, 2)

        return {
            "model": "claude",
            "query": query,
            "response": response.content[0].text,
            "timestamp": datetime.utcnow().isoformat(),
            "latency_seconds": elapsed,
            "success": True
        }

    except Exception as e:
        return {
            "model": "claude",
            "query": query,
            "response": None,
            "error": str(e),
            "success": False
        }


def run_queries_on_claude(queries):
    results = []
    for query in queries:
        result = query_claude(query)
        results.append(result)
        time.sleep(0.5)
    return results