import requests

from file_service.config.settings import settings


def update_status(id: int, status: str):
    response = requests.patch(
        f"{settings.user_service_url}/connector",
        json={
            "id": id,
            "status": status,
        },
        timeout=10,
    )

    response.raise_for_status()

    return response.json()
