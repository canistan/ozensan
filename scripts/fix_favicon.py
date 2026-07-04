import sys
from PIL import Image

def add_white_bg(image_path, output_path):
    print(f"Processing {image_path}...")
    try:
        img = Image.open(image_path)
        img = img.convert("RGBA")
        
        # Determine sizes. Let's add a bit of padding to make it a nice vertical rectangle.
        width, height = img.size
        # Make padding proportionate
        pad_x = 40
        pad_y = 60
        
        new_width = width + pad_x * 2
        new_height = height + pad_y * 2
        
        # Create a new white image
        background = Image.new("RGBA", (new_width, new_height), (255, 255, 255, 255))
        
        # Paste the original image onto the background using the original image as a mask for transparency
        offset = (pad_x, pad_y)
        background.paste(img, offset, img)
        
        # Save it
        background.save(output_path, "PNG")
        print(f"Successfully saved favicon with white bg to {output_path}")
            
    except Exception as e:
        print(f"Failed to process {image_path}: {e}")

if __name__ == "__main__":
    public_dir = "../public/"
    add_white_bg(public_dir + "faviconseffaf.png", public_dir + "favicon.png")
