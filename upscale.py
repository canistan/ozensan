from PIL import Image, ImageFilter

try:
    img = Image.open('public/logo_original.png')
    img = img.convert('RGBA')
    
    # 4x Upscale with Lanczos
    new_size = (img.width * 6, img.height * 6)
    upscaled = img.resize(new_size, resample=Image.LANCZOS)
    
    # Unsharp Mask to sharpen edges
    sharpened = upscaled.filter(ImageFilter.UnsharpMask(radius=2, percent=150, threshold=3))
    
    sharpened.save('public/logo.png')
    print("Upscaled successfully.")
except Exception as e:
    print("Error:", e)
