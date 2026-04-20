from flask import Blueprint, request, jsonify
import uuid
import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from services.query_generator import generate_queries, get_fallback_queries
from services.llm_runner import run_all_models
from services.mention_scorer import score_all_results, calculate_summary
from services.report_builder import assemble_report

audit_bp = Blueprint("audit", __name__)


@audit_bp.route("/run", methods=["POST"])
def run_audit():

    data = request.get_json()

    company_name = data.get("company_name", "").strip()
    industry = data.get("industry", "").strip()
    location = data.get("location", "United Kingdom")
    use_case = data.get("use_case", "")

    if not company_name or not industry:
        return jsonify({
            "error": "company_name and industry are required"
        }), 400

    audit_id = str(uuid.uuid4())

    try:
        queries = generate_queries(company_name, industry, location, use_case)
    except Exception:
        queries = get_fallback_queries(industry, location)

    raw_results = run_all_models(queries)

    scored_results = score_all_results(raw_results, company_name)

    visibility_summary = calculate_summary(scored_results, company_name)

    report = assemble_report(
        audit_id=audit_id,
        company_name=company_name,
        industry=industry,
        location=location,
        queries=queries,
        scored_results=scored_results,
        visibility_summary=visibility_summary
    )

    return jsonify({
        "status": "complete",
        "audit_id": audit_id,
        "report": report
    }), 200


@audit_bp.route("/preview", methods=["POST"])
def preview_queries():

    data = request.get_json()
    company_name = data.get("company_name", "")
    industry = data.get("industry", "")
    location = data.get("location", "United Kingdom")
    use_case = data.get("use_case", "")

    if not company_name or not industry:
        return jsonify({
            "error": "company_name and industry are required"
        }), 400

    try:
        queries = generate_queries(company_name, industry, location, use_case)
    except Exception:
        queries = get_fallback_queries(industry, location)

    return jsonify({
        "queries": queries,
        "count": len(queries)
    }), 200