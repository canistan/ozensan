import fitz
import os

pdf_path = "public/GCE_Global_catalogue.pdf"
output_dir = "public/products/extracted_gce"
os.makedirs(output_dir, exist_ok=True)

doc = fitz.open(pdf_path)

# ECOSAVER is on page 6-7 (index 5-6), DINCONTROL is on page 8 (index 7).
# Let's extract from pages 5 to 15 to be safe (Procontrol might be there).
for page_num in range(5, 16):
    page = doc[page_num]
    image_list = page.get_images()
    
    for image_index, img in enumerate(image_list, start=1):
        xref = img[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        
        # Only save images larger than 50KB to filter out small icons/logos
        if len(image_bytes) > 20000:
            image_name = f"page{page_num+1}_img{image_index}.{image_ext}"
            image_path = os.path.join(output_dir, image_name)
            with open(image_path, "wb") as f:
                f.write(image_bytes)
            print(f"Saved {image_name} (Size: {len(image_bytes)//1024} KB)")

print("Done extracting!")
