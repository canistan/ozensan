import re
import json

with open("gce_catalog.txt", "r") as f:
    text = f.read()

# Let's extract portions around X11, X21, and FIT+
x11_idx = text.find("X11")
x21_idx = text.find("X21")
fit_idx = text.find("FIT+")

print("X11 found at:", x11_idx)
print("X21 found at:", x21_idx)
print("FIT+ found at:", fit_idx)

if x11_idx != -1:
    print("\n--- X11 Context ---")
    print(text[max(0, x11_idx-500):x11_idx+1500])

if x21_idx != -1:
    print("\n--- X21 Context ---")
    print(text[max(0, x21_idx-500):x21_idx+1500])

