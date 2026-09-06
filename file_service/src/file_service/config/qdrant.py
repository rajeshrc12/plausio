from langchain_qdrant import QdrantVectorStore
from qdrant_client import QdrantClient

from file_service.config.aws import embeddings
from file_service.config.settings import settings

client = QdrantClient(
    url=settings.qdrant_url,
)

collection_name = settings.qdrant_collection_name


def get_vector_store() -> QdrantVectorStore:
    return QdrantVectorStore(
        client=client,
        collection_name=collection_name,
        embedding=embeddings,
    )
