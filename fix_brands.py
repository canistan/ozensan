import json

with open("src/data/brands.json", "r", encoding="utf-8") as f:
    brands = json.load(f)

# Reorder: TICAB, CEDIMA, the rest
# Find indexes
ticab_idx = next(i for i, b in enumerate(brands) if b["slug"] == "ticab")
cedima_idx = next(i for i, b in enumerate(brands) if b["slug"] == "cedima")

ticab = brands.pop(ticab_idx)
# recalculate cedima idx since we popped ticab
cedima_idx = next(i for i, b in enumerate(brands) if b["slug"] == "cedima")
cedima = brands.pop(cedima_idx)

brands.insert(0, cedima)
brands.insert(0, ticab)

with open("src/data/brands.json", "w", encoding="utf-8") as f:
    json.dump(brands, f, ensure_ascii=False, indent=2)
