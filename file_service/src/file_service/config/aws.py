import boto3

from langchain_aws import BedrockEmbeddings, ChatBedrockConverse

from file_service.config.settings import settings

bedrock_client = boto3.client(
    "bedrock-runtime",
    region_name=settings.aws_region,
    aws_access_key_id=settings.aws_access_key_id,
    aws_secret_access_key=settings.aws_secret_access_key,
)

s3_client = boto3.client(
    "s3",
    region_name=settings.aws_region,
    aws_access_key_id=settings.aws_access_key_id,
    aws_secret_access_key=settings.aws_secret_access_key,
)

llm = ChatBedrockConverse(
    client=bedrock_client,
    model="amazon.nova-lite-v1:0",
    temperature=0.2,
)


embeddings = BedrockEmbeddings(
    client=bedrock_client,
    model_id="amazon.titan-embed-text-v2:0",
)
