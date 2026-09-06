from user_service.config.settings import settings
from user_service.config.aws import s3_client


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
