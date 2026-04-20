from dotenv import load_dotenv
import os
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

from services.llm_runner import run_queries_on_claude

queries = [
    "best video production companies in London",
    "who makes the best corporate brand films UK"
]

results = run_queries_on_claude(queries)

for r in results:
    print("MODEL:", r["model"])
    print("QUERY:", r["query"])
    print("SUCCESS:", r["success"])
    print("LATENCY:", r["latency_seconds"], "seconds")
    print("RESPONSE:", r["response"][:150])
    print("---")