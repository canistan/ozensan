from PIL import Image
import os

# Optimize Logo
try:
    img = Image.open('public/logo.png')
    img = img.convert('RGBA')
    if img.width > 1200:
        ratio = 1200 / float(img.width)
        new_height = int(float(img.height) * float(ratio))
        img = img.resize((1200, new_height), Image.LANCZOS)
    img.save('public/logo.png', optimize=True)
    print("Logo optimized.")
except Exception as e:
    print("Logo error:", e)

# Optimize Favicon
try:
    img2 = Image.open('public/faviconB.png')
    img2 = img2.convert('RGBA')
    # Resize to exactly 512x512 for a perfect favicon
    img2 = img2.resize((512, 512), Image.LANCZOS)
    img2.save('src/app/icon.png', optimize=True)
    
    # Clean up old files
    if os.path.exists('public/faviconB.png'):
        os.remove('public/faviconB.png')
    if os.path.exists('src/app/favicon.ico'):
        os.remove('src/app/favicon.ico')
    print("Favicon optimized and set.")
except Exception as e:
    print("Favicon error:", e)
