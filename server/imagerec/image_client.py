from ibm_botocore.client import Config, ClientError
import ibm_boto3
import time


COS_ENDPOINT = "<cos-endpoint>"
COS_API_KEY_ID = "<api-key>"
COS_AUTH_ENDPOINT = "https://iam.cloud.ibm.com/identity/token"
COS_RESOURCE_CRN = "<CRN>"

cos = ibm_boto3.resource("s3",
    ibm_api_key_id=COS_API_KEY_ID,
    ibm_service_instance_id=COS_RESOURCE_CRN,
    ibm_auth_endpoint=COS_AUTH_ENDPOINT,
    config=Config(signature_version="oauth"),
    endpoint_url=COS_ENDPOINT
)

bucket = cos.Bucket('c4cimages')

def upload(file):
    filename = str(int(time.time())) + '.jpg'
    bucket.upload_fileobj(file, filename)
    return filename