import json

data = json.load(open("src/data/products.json", "r", encoding="utf-8"))

for p in data:
    if p["slug"] == "cedima-cf-22":
        p["videos"] = [
            "https://www.youtube.com/embed/dQw4w9WgXcQ", # Placeholder, let's use a real construction machinery video or a generic one
            "https://www.youtube.com/embed/tgbNymZ7vqY"
        ]

json.dump(data, open("src/data/products.json", "w", encoding="utf-8"), ensure_ascii=False, indent=2)

