# app/create_user.py

from app.database import SessionLocal
from app.models import User
from app.auth.security import hash_password

db = SessionLocal()

users_to_create = [
    {
        "email": "employee1@example.com",
        "password": "password123",
        "role": "employee",
        "manager_id": 1
    },
    {
        "email": "employee2@example.com",
        "password": "password234",
        "role": "employee",
        "manager_id": 1
    },
    {
        "email": "employee3@example.com",
        "password": "password345",
        "role": "employee",
        "manager_id": 1
    }
]

for user_data in users_to_create:
    existing = db.query(User).filter(User.email == user_data["email"]).first()
    if existing:
        print(f"{user_data['email']} already exists.")
    else:
        new_user = User(
            email=user_data["email"],
            hashed_password=hash_password(user_data["password"]),
            role=user_data["role"],
            manager_id=user_data["manager_id"]
        )
        db.add(new_user)
        print(f"{user_data['email']} added.")

db.commit()
db.close()
