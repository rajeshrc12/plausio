from langchain_qdrant import QdrantVectorStore
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams

from user_service.config.aws import embeddings
from user_service.config.settings import settings

client = QdrantClient(
    url=settings.qdrant_url,
)

collection_name = settings.qdrant_collection_name


def init_qdrant():
    if not client.collection_exists(collection_name):
        client.create_collection(
            collection_name=collection_name,
            vectors_config=VectorParams(
                size=1024,
                distance=Distance.COSINE,
            ),
        )


init_qdrant()


def get_vector_store() -> QdrantVectorStore:
    return QdrantVectorStore(
        client=client,
        collection_name=collection_name,
        embedding=embeddings,
    )
