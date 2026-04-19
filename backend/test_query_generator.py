from dotenv import load_dotenv
load_dotenv()

from services.query_generator import generate_queries

queries = generate_queries(
    company_name="L99",
    industry="video production",
    location="London",
    use_case="corporate brand films"
)

for q in queries:
    print(q)