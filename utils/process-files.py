import os 

print("Processing image files")
print(f"Current directory: {os.getcwd()}")
images_dir = os.path.join(os.getcwd(), "fafo", "images")

for fname in os.listdir(images_dir):
      print(f"processing file: {fname}")

      
