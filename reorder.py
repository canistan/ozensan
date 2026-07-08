with open("src/app/[locale]/hakkimizda/page.tsx", "r", encoding="utf-8") as f:
    lines = f.readlines()

# Find indices
hak_start = next(i for i, l in enumerate(lines) if "{/* Hakkımızda Section */}" in l)
yon_start = next(i for i, l in enumerate(lines) if "{/* Yönetimimiz Section */}" in l)
viz_start = next(i for i, l in enumerate(lines) if "{/* Vizyon & Misyon Section */}" in l)

# Slice parts
before_hak = lines[:hak_start]
hak_section = lines[hak_start:yon_start]
yon_section = lines[yon_start:viz_start]
after_viz = lines[viz_start:]

# Reorder
new_lines = before_hak + yon_section + hak_section + after_viz

with open("src/app/[locale]/hakkimizda/page.tsx", "w", encoding="utf-8") as f:
    f.writelines(new_lines)

