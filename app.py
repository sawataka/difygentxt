from flask import Flask, render_template, request, jsonify
import markdown
from services.dify_client import generate
import json
import re

app = Flask(__name__)


def parse_ai_response(text):

    try:
        return json.loads(text)

    except:
        match = re.search(r"\{.*\}", text, re.S)

        if match:
            try:
                return json.loads(match.group())
            except:
                pass

    return {"description": text, "points": [], "sns_post": ""}


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/generate", methods=["POST"])
def generate_ai():

    title = request.form.get("title")
    organization = request.form.get("organization")
    question = request.form.get("question")

    if not question:
        return jsonify({"error": "質問は必須です"}), 400

    dify_response = generate(title, organization, question)

    answer_text = dify_response.get("answer", "")

    parsed = parse_ai_response(answer_text)

    description_html = markdown.markdown(parsed["description"])

    return jsonify(
        {
            "description": description_html,
            "points": parsed["points"],
            "sns_post": parsed["sns_post"],
        }
    )


if __name__ == "__main__":
    app.run(debug=True)
