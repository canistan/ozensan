with open("gce_catalog.txt", "r") as f:
    text = f.read()

sg3_idx = text.find("SAFE-GUARD-3")
qc_idx = text.find("QUICK COUPLINGS")

print("SAFE-GUARD-3 found at:", sg3_idx)
print("QC found at:", qc_idx)

if sg3_idx != -1:
    print("\n--- SAFE-GUARD-3 Context ---")
    print(text[max(0, sg3_idx-500):sg3_idx+1000])

