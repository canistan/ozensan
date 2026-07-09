import json

specs = [
    "Engine power (petrol)",
    "3.6 kW (4.8 HP)",
    "Emulsion tank capacity",
    "1000 l",
    "Productivity",
    "28 l/min",
    "Nozzles on the spraying bar",
    "7 pcs.",
    "Spraying width",
    "1.7 m",
    "Diesel cleaning system",
    "Mechanical thermal sensor",
    "Self-pumping function of the tank",
    "Heating system of the emulsion tank",
    "Possibility of connecting an extra compressor for spraying bar cleaning",
    "Hand spraying rod",
    "Installation on a frame or on a trailer at the customer s request"
]

parsed = []
i = 0
while i < len(specs):
    param = specs[i]
    
    if i + 1 < len(specs):
        next_str = specs[i+1]
        # Heuristic for value
        if any(c.isdigit() for c in next_str) or next_str[0].islower() or len(next_str) < 15:
            parsed.append({"parameter": param, "value": next_str})
            i += 2
        else:
            parsed.append({"parameter": param, "value": "Standart"})
            i += 1
    else:
        parsed.append({"parameter": param, "value": "Standart"})
        i += 1

print(json.dumps(parsed, indent=2))
