from file_service.config.celery import app
from file_service.config.aws import s3_client
from file_service.config.settings import settings
from file_service.config.qdrant import get_vector_store
import tempfile
from pathlib import Path

from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

from file_service.services.user import update_status


@app.task(name="process_file")
def process_file(id: int, type: str):
    print(f"Processing file: {id}")
    print(f"Type: {type}")

    if type != "application/pdf":
        raise ValueError(f"Unsupported file type: {type}")

    update_status(id, "PROCESSING")

    try:
        s3_key = f"file/{id}"

        with tempfile.TemporaryDirectory() as tmp_dir:
            pdf_path = Path(tmp_dir) / f"{id}.pdf"

            s3_client.download_file(
                settings.aws_s3_bucket,
                s3_key,
                str(pdf_path),
            )

            loader = PyPDFLoader(str(pdf_path))
            docs = loader.load()

            splitter = RecursiveCharacterTextSplitter(
                chunk_size=1000,
                chunk_overlap=150,
            )

            chunks = splitter.split_documents(docs)

            for chunk in chunks:
                chunk.metadata["file_id"] = id

            vector_store = get_vector_store()
            vector_store.add_documents(chunks)

        update_status(id, "COMPLETED")

        return {
            "id": id,
            "type": type,
            "chunks": len(chunks),
        }

    except Exception:
        try:
            update_status(id, "FAILED")
        except Exception as status_error:
            print(f"Failed to update status for file {id}: {status_error}")

        raise
