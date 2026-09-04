from fastapi import FastAPI

from user_service.routes import user_router

app = FastAPI(
    title="Task API",
    version="1.0.0",
)

app.include_router(user_router)


@app.get("/")
def root():
    return {"message": "User API is running"}
