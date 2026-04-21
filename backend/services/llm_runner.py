import anthropic
import openai
import google.generativeai as genai
import os
import time
from datetime import datetime

client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
openai_client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

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
            "latency_seconds": 0,
            "success": False
        }


def query_chatgpt(query):
    try:
        start = time.time()
        response = openai_client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": query}
            ],
            max_tokens=400
        )
        elapsed = round(time.time() - start, 2)
        return {
            "model": "chatgpt",
            "query": query,
            "response": response.choices[0].message.content,
            "timestamp": datetime.utcnow().isoformat(),
            "latency_seconds": elapsed,
            "success": True
        }
    except Exception as e:
        return {
            "model": "chatgpt",
            "query": query,
            "response": None,
            "error": str(e),
            "latency_seconds": 0,
            "success": False
        }


def query_gemini(query):
    try:
        start = time.time()
        model = genai.GenerativeModel("gemini-2.0-flash")
        full_prompt = f"{SYSTEM_PROMPT}\n\n{query}"
        response = model.generate_content(full_prompt)
        elapsed = round(time.time() - start, 2)
        return {
            "model": "gemini",
            "query": query,
            "response": response.text,
            "timestamp": datetime.utcnow().isoformat(),
            "latency_seconds": elapsed,
            "success": True
        }
    except Exception as e:
        return {
            "model": "gemini",
            "query": query,
            "response": None,
            "error": str(e),
            "latency_seconds": 0,
            "success": False
        }


def run_all_models(queries):
    results = []
    for query in queries:
        results.append(query_claude(query))
        results.append(query_chatgpt(query))
        results.append(query_gemini(query))
        time.sleep(0.5)
    return results