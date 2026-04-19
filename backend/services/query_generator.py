import anthropic
import json
import os

client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))


def generate_queries(company_name, industry, location, use_case):

    prompt = f"""You are helping build a GEO audit tool.

Generate exactly 8 realistic queries that a real person would type 
into ChatGPT, Claude, or Gemini when looking for a company in this industry.

Company: {company_name}
Industry: {industry}
Location: {location}
Use case: {use_case}

Rules:
- Write queries as a real person would type them
- Mix short queries and longer conversational ones
- Include recommendation, comparison, and best-of queries
- Do NOT mention the company name in any query
- Return ONLY a JSON array of strings, nothing else

Example format:
["query one", "query two"]"""

    response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=500,
        messages=[{"role": "user", "content": prompt}]
    )

    raw = response.content[0].text.strip()
    raw = raw.replace("```json", "").replace("```", "").strip()

    queries = json.loads(raw)
    return queries


def get_fallback_queries(industry, location):
    return [
        f"best {industry} companies in {location}",
        f"top {industry} agencies {location}",
        f"who are the leading {industry} companies",
        f"recommend a good {industry} company",
        f"most trusted {industry} services in {location}",
        f"which {industry} company should I hire",
        f"top rated {industry} near me",
        f"best {industry} for small business",
    ]