import json

data = json.load(open("src/data/products.json", "r", encoding="utf-8"))

features = set()
params = set()
values = set()
accessories = set()

for p in data:
    for f in p.get("features", []):
        features.add(f)
    for t in p.get("technicalData", []):
        params.add(t.get("param", ""))
        values.add(t.get("value", ""))
        accessories.add(t.get("accessory", ""))

print("FEATURES:")
for f in features: print(f)
print("\nPARAMS:")
for p in params: print(p)
print("\nVALUES:")
for v in values: print(v)
print("\nACCESSORIES:")
for a in accessories: print(a)
