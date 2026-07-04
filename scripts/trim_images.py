import sys
from PIL import Image

def trim_transparent(image_path, output_path):
    print(f"Processing {image_path}...")
    try:
        img = Image.open(image_path)
        img = img.convert("RGBA")
        
        # Get the bounding box of the non-zero (non-transparent) regions
        # getbbox() works on the alpha channel if we separate it, or directly on RGBA if fully transparent is (0,0,0,0)
        # To be safe, we extract the alpha channel and get its bounding box
        alpha = img.split()[-1]
        bbox = alpha.getbbox()
        
        if bbox:
            print(f"Original size: {img.size}, Bounding box: {bbox}")
            # Crop the image to the bounding box
            cropped_img = img.crop(bbox)
            print(f"New size: {cropped_img.size}")
            
            # Save the trimmed image
            cropped_img.save(output_path, "PNG")
            print(f"Successfully saved trimmed image to {output_path}")
        else:
            print("Image is entirely transparent or couldn't find a bounding box.")
            
    except Exception as e:
        print(f"Failed to process {image_path}: {e}")

if __name__ == "__main__":
    public_dir = "../public/"
    
    # Trim logo
    trim_transparent(public_dir + "logoseffaf.png", public_dir + "logoseffaf.png")
    
    # Trim favicon
    trim_transparent(public_dir + "faviconseffaf.png", public_dir + "faviconseffaf.png")
