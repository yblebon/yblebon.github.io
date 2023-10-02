import os
import tempfile
from PIL import Image

print("Processing image files")
print(f"Current directory: {os.getcwd()}")
images_dir = os.path.join(os.getcwd(), "fafo", "images")

tmp_dir = tempfile.mkdtemp()

for fname in os.listdir(images_dir):
      print(f"processing file: {fname}")
      if fname.split(".")[1].lower() in ["jpeg", "jpg"]:
         fpath = os.path.join(images_dir, fname)
         img = Image.open(fpath)
         print(f"File size: {img.size}")
         orig_x, orig_y = img.size
         factor = 800 / orig_x
         y = int(factor * orig_y)
         new_img = img.thumbail((800, y))
         output_img = os.path.join(tmp_dir, fname)
         new_img.save(output_img, 'JPEG', quality=90)
         print(f"New image file: {output_img}")
         print(f"New file size: {new_img.size}")

      
