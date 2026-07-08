import os
from PIL import Image

def optimize_image(filepath, max_width=800, quality=80):
    try:
        img = Image.open(filepath)
        
        # Calculate new dimensions if image is too large
        if img.width > max_width:
            ratio = max_width / float(img.width)
            new_height = int((float(img.height) * float(ratio)))
            img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
        
        # Save as webp
        base = os.path.splitext(filepath)[0]
        webp_path = base + ".webp"
        
        img.save(webp_path, "WEBP", quality=quality)
        print(f"Optimized {filepath} -> {webp_path}")
        
    except Exception as e:
        print(f"Error optimizing {filepath}: {e}")

public_dir = "public"
images = ["logo.png", "logoseffaf.png", "faviconseffaf.png"]

for img_name in images:
    filepath = os.path.join(public_dir, img_name)
    if os.path.exists(filepath):
        optimize_image(filepath)
