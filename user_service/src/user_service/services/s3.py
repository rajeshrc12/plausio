import boto3
from botocore.config import Config
from pydantic import BaseModel
from user_service.config.settings import settings

s3_client = boto3.client(
    "s3",
    aws_access_key_id=settings.aws_access_key_id,
    aws_secret_access_key=settings.aws_secret_access_key,
    region_name=settings.aws_region,
    config=Config(signature_version="s3v4"),
)


def create_presigned_upload_url(
    id: int,
    content_type: str,
) -> dict[str, str]:
    key = f"file/{id}"

    url = s3_client.generate_presigned_url(
        ClientMethod="put_object",
        Params={
            "Bucket": settings.aws_s3_bucket,
            "Key": key,
            "ContentType": content_type,
        },
        ExpiresIn=900,
    )

    return {
        "url": url,
        "key": key,
    }
