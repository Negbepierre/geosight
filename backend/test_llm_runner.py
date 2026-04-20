from dotenv import load_dotenv
import os
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

from services.llm_runner import run_all_models

queries = [
    "best video production companies in London",
    "who makes the best corporate brand films UK"
]

results = run_all_models(queries)

for r in results:
    print("MODEL:", r["model"])
    print("QUERY:", r["query"])
    print("SUCCESS:", r["success"])
    print("LATENCY:", r.get("latency_seconds", "n/a"), "seconds")
    if r["success"]:
        print("RESPONSE:", r["response"][:150])
    else:
        print("ERROR:", r.get("error", "unknown error"))
    print("---")