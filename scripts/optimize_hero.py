import sys
from PIL import Image

def optimize_image(input_path, output_path):
    print(f"Optimizing {input_path}...")
    try:
        img = Image.open(input_path)
        # Convert to RGB just in case
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")
            
        # Resize if width is larger than 1920 (standard HD width for web heroes)
        max_width = 1920
        if img.width > max_width:
            ratio = max_width / img.width
            new_height = int(img.height * ratio)
            img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
            
        # Save as optimized webp
        img.save(output_path, "webp", quality=85, optimize=True)
        print(f"Successfully optimized and saved to {output_path}")
            
    except Exception as e:
        print(f"Failed to process {input_path}: {e}")

if __name__ == "__main__":
    input_file = "/Users/canalbayrak/.gemini/antigravity-ide/brain/bc36c1aa-5fd6-44fa-b054-a2cf2888f3d0/.tempmediaStorage/media_bc36c1aa-5fd6-44fa-b054-a2cf2888f3d0_1783116979013.jpg"
    output_file = "public/hero-bg.webp"
    optimize_image(input_file, output_file)
