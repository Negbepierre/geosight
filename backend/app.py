from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

app = Flask(__name__)
CORS(app)

from routes.audit import audit_bp
app.register_blueprint(audit_bp, url_prefix="/api/audit")

@app.route("/api/health")
def health():
    return {"status": "ok", "service": "geosight-api"}

if __name__ == "__main__":
    port = int(os.getenv("FLASK_PORT", 5001))
    app.run(debug=True, port=port)