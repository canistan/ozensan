from PIL import Image
import os

images = ["gce-ecosaver.png", "gce-dincontrol.png", "gce-procontrol.png"]
public_dir = "public/products"

for img_name in images:
    filepath = os.path.join(public_dir, img_name)
    if os.path.exists(filepath):
        try:
            img = Image.open(filepath)
            
            # Remove alpha channel and convert to RGB if it's RGBA (so it can be saved as JPEG or clean WEBP)
            if img.mode in ('RGBA', 'LA'):
                background = Image.new(img.mode[:-1], img.size, (255, 255, 255))
                background.paste(img, img.split()[-1])
                img = background

            max_width = 800
            if img.width > max_width:
                ratio = max_width / float(img.width)
                new_height = int((float(img.height) * float(ratio)))
                img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
            
            base = os.path.splitext(filepath)[0]
            webp_path = base + ".webp"
            
            img.save(webp_path, "WEBP", quality=80)
            print(f"Optimized {filepath} -> {webp_path}")
            
            # Remove the original png to save space
            os.remove(filepath)
            
        except Exception as e:
            print(f"Error optimizing {filepath}: {e}")

