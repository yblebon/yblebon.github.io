import boto3
import os

s3_client = boto3.client('s3',
	endpoint_url=os.getenv("S3_ENDPOINT"),
	aws_access_key_id=os.getenv("S3_ACCESS_KEY_ID"),
	aws_secret_access_key=os.getenv("S3_SECRET_ACCESS_KEY")
)

for fname in os.listdir(input_dir):
  fpath = os.path.join(input_dir, fname)
  s3_client.upload_file(fpath,os.getenv("S3_BUCKET_NAME", "yblebon-temp"), f"{os.getenv('S3_UPLOAD_DIR')}/{fname}")
