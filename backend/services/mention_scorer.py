import anthropic
import os

client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))


def detect_mention(response_text, company_name):

    if not response_text:
        return {
            "mentioned": False,
            "position": None,
            "context": None
        }

    text_lower = response_text.lower()
    company_lower = company_name.lower()

    if company_lower not in text_lower:
        return {
            "mentioned": False,
            "position": None,
            "context": None
        }

    index = text_lower.find(company_lower)
    total_length = len(text_lower)
    relative_position = index / total_length

    if relative_position < 0.25:
        position_label = "first"
    elif relative_position < 0.5:
        position_label = "early"
    elif relative_position < 0.75:
        position_label = "middle"
    else:
        position_label = "late"

    start = max(0, index - 80)
    end = min(len(response_text), index + len(company_name) + 80)
    context = response_text[start:end]

    return {
        "mentioned": True,
        "position": position_label,
        "relative_position": round(relative_position, 3),
        "context": context
    }


def analyse_sentiment(response_text, company_name):

    if not response_text:
        return "neutral"

    prompt = f"""Analyse the sentiment of how '{company_name}' is described 
in the following text.

Text: {response_text}

Return ONLY one word: positive, neutral, or negative.
If the company is not mentioned return neutral."""

    try:
        response = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=10,
            messages=[{"role": "user", "content": prompt}]
        )
        sentiment = response.content[0].text.strip().lower()
        if sentiment not in ["positive", "neutral", "negative"]:
            return "neutral"
        return sentiment
    except Exception:
        return "neutral"


def score_result(result, company_name):

    if not result.get("success") or not result.get("response"):
        return {
            **result,
            "mention": {"mentioned": False},
            "sentiment": "neutral",
            "score": 0
        }

    mention = detect_mention(result["response"], company_name)
    sentiment = "neutral"

    if mention["mentioned"]:
        sentiment = analyse_sentiment(result["response"], company_name)

    score = 0
    if mention["mentioned"]:
        score += 40
        if mention["position"] == "first":
            score += 40
        elif mention["position"] == "early":
            score += 25
        elif mention["position"] == "middle":
            score += 10
        if sentiment == "positive":
            score += 20
        elif sentiment == "neutral":
            score += 10

    return {
        **result,
        "mention": mention,
        "sentiment": sentiment,
        "score": score
    }


def score_all_results(results, company_name):
    return [score_result(r, company_name) for r in results]


def calculate_summary(scored_results, company_name):

    by_model = {"claude": [], "chatgpt": [], "gemini": []}

    for r in scored_results:
        model = r.get("model")
        if model in by_model:
            by_model[model].append(r)

    def model_stats(results):
        if not results:
            return {
                "mention_rate": 0,
                "avg_score": 0,
                "total_queries": 0,
                "mentions": 0
            }
        total = len(results)
        mentions = sum(1 for r in results if r.get("mention", {}).get("mentioned"))
        avg_score = round(sum(r.get("score", 0) for r in results) / total, 1)
        return {
            "mention_rate": round((mentions / total) * 100, 1),
            "avg_score": avg_score,
            "total_queries": total,
            "mentions": mentions
        }

    overall_scores = [r.get("score", 0) for r in scored_results]
    overall = round(sum(overall_scores) / len(overall_scores), 1) if overall_scores else 0

    return {
        "company": company_name,
        "overall_score": overall,
        "by_model": {
            "claude": model_stats(by_model["claude"]),
            "chatgpt": model_stats(by_model["chatgpt"]),
            "gemini": model_stats(by_model["gemini"])
        },
        "total_queries_run": len(scored_results),
        "total_mentions": sum(1 for r in scored_results if r.get("mention", {}).get("mentioned"))
    }