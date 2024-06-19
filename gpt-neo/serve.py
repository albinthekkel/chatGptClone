import os
from transformers import GPTNeoForCausalLM, GPT2Tokenizer
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model_name = os.getenv("MODEL_NAME", "EleutherAI/gpt-neo-125m")

try:
    model = GPTNeoForCausalLM.from_pretrained(model_name)
    tokenizer = GPT2Tokenizer.from_pretrained(model_name)
except Exception as e:
    print(f"Error loading model: {e}")
    exit(1)

@app.route('/generate', methods=['POST'])
def generate():
    data = request.json
    prompt = data.get("prompt", "")
    max_length = data.get("max_length", 100)

    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(inputs.input_ids, max_length=max_length, do_sample=True)
    text = tokenizer.decode(outputs[0], skip_special_tokens=True)

    return jsonify(text)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

