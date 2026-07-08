with open("gce_catalog.txt", "r") as f:
    text = f.read()

safe_idx = text.find("SAFE-GUARD")
flash_idx = text.lower().find("flashback arrestor")

print("SAFE-GUARD found at:", safe_idx)
print("Flashback Arrestor found at:", flash_idx)

if safe_idx != -1:
    print("\n--- SAFE-GUARD Context ---")
    print(text[max(0, safe_idx-500):safe_idx+1500])
elif flash_idx != -1:
    print("\n--- Flashback Arrestor Context ---")
    print(text[max(0, flash_idx-500):flash_idx+1500])

