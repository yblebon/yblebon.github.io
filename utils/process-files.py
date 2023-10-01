import os
from PIL import Image

print("Processing image files")
print(f"Current directory: {os.getcwd()}")
images_dir = os.path.join(os.getcwd(), "fafo", "images")

for fname in os.listdir(images_dir):
      print(f"processing file: {fname}")
      if fname.split(".")[1].lower() in ["jpeg", "jpg"]:
         fpath = os.path.join(images_dir, fname)
         img = Image.open(fpath)
         print(f"File size: {img.size}")

      
