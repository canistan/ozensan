import sys
import os
from PIL import Image

def optimize_hero():
    input_path = "public/hero-bg.png"
    output_path = "public/hero-bg.webp"
    
    if not os.path.exists(input_path):
        print(f"File not found: {input_path}")
        sys.exit(1)
        
    try:
        print(f"Opening {input_path}...")
        img = Image.open(input_path)
        
        # Convert to RGB (WebP doesn't need RGBA for background hero if there's no transparency needed, 
        # but let's keep it RGB to save space since it's a photo)
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")
            
        # Standardize max width to 1920px
        max_width = 1920
        if img.width > max_width:
            ratio = max_width / img.width
            new_height = int(img.height * ratio)
            img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
            print(f"Resized to {max_width}x{new_height}")
            
        # Save as WEBP
        img.save(output_path, "webp", quality=80, optimize=True)
        print(f"Successfully saved optimized image to {output_path}")
        
        # Remove original PNG to save space
        os.remove(input_path)
        print("Removed original PNG.")
        
    except Exception as e:
        print(f"Failed to process image: {e}")

if __name__ == "__main__":
    optimize_hero()
