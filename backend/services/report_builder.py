import anthropic
import os
import json

client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))


def build_action_plan(company_name, industry, visibility_summary, scored_results):

    overall_score = visibility_summary.get("overall_score", 0)
    by_model = visibility_summary.get("by_model", {})

    weak_models = [
        m for m, s in by_model.items()
        if s.get("mention_rate", 0) < 40
    ]

    missed_queries = [
        r.get("query") for r in scored_results
        if not r.get("mention", {}).get("mentioned")
        and r.get("query")
    ][:4]

    prompt = f"""You are a Generative Engine Optimisation expert.

A company called '{company_name}' in the '{industry}' industry 
just ran an AI visibility audit.

Results:
- Overall visibility score: {overall_score} out of 100
- Weak models: {', '.join(weak_models) if weak_models else 'none'}
- Queries where they were not mentioned: {missed_queries}

Generate exactly 5 specific actionable recommendations to improve 
their AI visibility.

Return ONLY a JSON array with this structure, no other text:
[
  {{
    "title": "short action title",
    "description": "two sentence explanation of what to do and why",
    "priority": "high or medium or low",
    "effort": "quick win or medium term or long term"
  }}
]"""

    try:
        response = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=1000,
            messages=[{"role": "user", "content": prompt}]
        )

        raw = response.content[0].text.strip()
        raw = raw.replace("```json", "").replace("```", "").strip()
        return json.loads(raw)

    except Exception:
        return get_fallback_actions()


def get_fallback_actions():
    return [
        {
            "title": "Standardise your company name everywhere",
            "description": "Ensure your name is identical across your website, social profiles, and directories. LLMs build entity knowledge from consistent naming.",
            "priority": "high",
            "effort": "quick win"
        },
        {
            "title": "Publish long form authoritative content",
            "description": "Create in depth guides and case studies that answer the questions people ask AI assistants. LLMs surface content that comprehensively answers a question.",
            "priority": "high",
            "effort": "medium term"
        },
        {
            "title": "Earn citations in industry publications",
            "description": "Getting mentioned in trade publications and industry blogs increases how often LLMs include you. Reach out for features and contributed articles.",
            "priority": "medium",
            "effort": "medium term"
        },
        {
            "title": "Build a FAQ section on your website",
            "description": "Create a page that directly answers common industry questions in clear language. LLMs are trained heavily on question and answer style content.",
            "priority": "medium",
            "effort": "quick win"
        },
        {
            "title": "Claim all directory and review profiles",
            "description": "Ensure your business is fully listed on Google Business, Clutch, and industry directories. These sources feed into LLM training data.",
            "priority": "low",
            "effort": "quick win"
        }
    ]


def build_query_breakdown(scored_results):

    seen = {}

    for r in scored_results:
        q = r.get("query")
        if q not in seen:
            seen[q] = {"query": q, "results": []}
        seen[q]["results"].append({
            "model": r.get("model"),
            "mentioned": r.get("mention", {}).get("mentioned", False),
            "position": r.get("mention", {}).get("position"),
            "sentiment": r.get("sentiment"),
            "score": r.get("score", 0)
        })

    return list(seen.values())


def assemble_report(audit_id, company_name, industry, location,
                    queries, scored_results, visibility_summary):

    action_plan = build_action_plan(
        company_name, industry, visibility_summary, scored_results
    )

    query_breakdown = build_query_breakdown(scored_results)

    return {
        "audit_id": audit_id,
        "company_name": company_name,
        "industry": industry,
        "location": location,
        "visibility_summary": visibility_summary,
        "query_breakdown": query_breakdown,
        "action_plan": action_plan,
        "total_queries": len(queries),
        "total_responses": len(scored_results)
    }