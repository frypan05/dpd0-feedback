# app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, feedback
from app.routes import users
from app.routes import feedback

app = FastAPI()

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(auth.router)
app.include_router(feedback.router)
app.include_router(users.router)
app.include_router(feedback.router)


from app.database import Base, engine

Base.metadata.create_all(bind=engine)