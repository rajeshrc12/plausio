from user_service.config.database import engine, Base
from user_service.config.settings import settings
from user_service.config.aws import s3_client
from sqlalchemy import text
import user_service.models


def clean_postgres():
    print("Cleaning PostgreSQL...")

    with engine.begin() as connection:
        connection.execute(text("DROP SCHEMA public CASCADE"))
        connection.execute(text("CREATE SCHEMA public"))

    print("PostgreSQL database cleaned.")


def clean_s3():
    bucket = settings.aws_s3_bucket
    prefix = "file/"

    print(f"Cleaning S3: s3://{bucket}/{prefix}")

    paginator = s3_client.get_paginator("list_objects_v2")

    deleted = 0

    for page in paginator.paginate(
        Bucket=bucket,
        Prefix=prefix,
    ):
        objects = page.get("Contents", [])

        if not objects:
            continue

        s3_client.delete_objects(
            Bucket=bucket,
            Delete={"Objects": [{"Key": obj["Key"]} for obj in objects]},
        )

        deleted += len(objects)

    print(f"S3: deleted {deleted} objects.")


def main():
    clean_postgres()
    clean_s3()

    print("\nDone!")


if __name__ == "__main__":
    main()
