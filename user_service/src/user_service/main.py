from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from user_service.routes import user_router, auth_router

app = FastAPI(
    title="Task API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router)
app.include_router(auth_router)


@app.get("/")
def root():
    return {"message": "User API is running"}
