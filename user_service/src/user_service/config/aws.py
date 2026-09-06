import boto3
from langchain_aws import ChatBedrockConverse

from user_service.config.settings import settings

client = boto3.client(
    "bedrock-runtime",
    region_name=settings.aws_region,
    aws_access_key_id=settings.aws_access_key_id,
    aws_secret_access_key=settings.aws_secret_access_key,
)

llm = ChatBedrockConverse(
    client=client,
    model="amazon.nova-lite-v1:0",
    temperature=0.2,
)
