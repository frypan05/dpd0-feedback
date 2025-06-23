from app.database import SessionLocal
from app.models import User
from app.auth.security import hash_password

db = SessionLocal()

# Create test manager
user = User(
    email="manager@example.com",
    hashed_password=hash_password("password123"),
    role="manager"
)

db.add(user)
db.commit()
db.close()
