from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

CORS(app, resources={
    r"/api/*": {
        "origins": [
            "https://geosightpierre.netlify.app",
            "http://localhost:5173"
        ]
    }
})

from routes.audit import audit_bp
app.register_blueprint(audit_bp, url_prefix="/api/audit")

@app.route("/api/health")
def health():
    return {"status": "ok", "service": "geosight-api"}

if __name__ == "__main__":
    port = int(os.getenv("PORT", os.getenv("FLASK_PORT", 5001)))
    app.run(host="0.0.0.0", port=port)