import json
import urllib.request
import os

token = "vercel_blob_rw_b3pcsGrSPWM0h0Uo_IYM2FjodZ1wobQG7Bzw8bmOlsLZgWR"
api_url = "https://blob.vercel-storage.com/"

public_dir = "public/products"
products_json = "src/data/products.json"

with open(products_json, "r", encoding="utf-8") as f:
    products = json.load(f)

for p in products:
    img_path = p.get("image", "")
    if img_path.startswith("/products/"):
        local_path = os.path.join("public", img_path.lstrip("/"))
        if os.path.exists(local_path):
            filename = os.path.basename(local_path)
            upload_url = api_url + filename
            
            with open(local_path, "rb") as f_img:
                data = f_img.read()
                
            req = urllib.request.Request(upload_url, data=data, method="POST")
            req.add_header("Authorization", f"Bearer {token}")
            req.add_header("x-api-version", "7")
            req.add_header("Content-Type", "image/webp")
            
            try:
                with urllib.request.urlopen(req) as response:
                    resp_data = json.loads(response.read().decode())
                    new_url = resp_data.get("url")
                    if new_url:
                        p["image"] = new_url
                        print(f"Uploaded: {new_url}")
                        # Delete local file
                        os.remove(local_path)
            except Exception as e:
                print(f"Failed to upload {filename}: {e}")

with open(products_json, "w", encoding="utf-8") as f:
    json.dump(products, f, ensure_ascii=False, indent=2)

print("Migration completed successfully.")
