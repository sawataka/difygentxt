from dotenv import load_dotenv
import requests
import os

load_dotenv()

DIFY_API_KEY = os.getenv("DIFY_API_KEY")
print(DIFY_API_KEY)
URL = "http://localhost:8080/v1/completion-messages"


def generate(title, organization, question):

    headers = {
        "Authorization": f"Bearer {DIFY_API_KEY}",
        "Content-Type": "application/json",
    }

    data = {
        "inputs": {"title": title, "organization": organization, "text": question},
        "response_mode": "blocking",
        "user": "flask-user",
    }
    # data = {
    #     "inputs": {},
    #     "response_mode": "blocking",
    #     "user": "flask-user",
    # }

    r = requests.post(URL, headers=headers, json=data)
    print("Dify API Response:", r.text)

    return r.json()
