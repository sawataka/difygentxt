from flask import Flask, request, jsonify, render_template
import requests
import os

app = Flask(__name__)

DIFY_API_URL = "http://localhost:8080/v1/chat-messages"
DIFY_API_KEY = "app-xKuHg8IZfIjw7TUXVjKYCy5d"  # In production, use environment variable


@app.route("/")
def index():
    return render_template("chat.html")


@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json.get("message")
    if not user_message:
        return jsonify({"error": "No message provided"}), 400
    headers = {
        "Authorization": f"Bearer {DIFY_API_KEY}",
        "Content-Type": "application/json",
    }

    data = {
        "inputs": {},
        "query": user_message,
        "response_mode": "blocking",
        "user": "user123",
    }

    try:
        response = requests.post(DIFY_API_URL, headers=headers, json=data, timeout=60)
        response.raise_for_status()
        result = response.json()
        print("API response:", result)  # Debug log
        return jsonify({"response": result.get("answer", "No response")})
        # return jsonify(result)

    except requests.exceptions.RequestException as e:
        print("API error:", str(e))  # Debug log
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
