import sys
import os

# This adds the parent 'server' directory to the Python path
# so we can import our other modules like db, models, and security
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from db import SessionLocal
from models import User, Faculty  # Import your database models
from security import get_password_hash # Import the hashing function

def hash_existing_passwords():
    """
    Connects to the database, finds any plain-text passwords,
    and updates them with a secure bcrypt hash.
    """
    db = SessionLocal()
    try:
        # --- Hash passwords for the User (student) table ---
        print("Hashing passwords for 'users' table...")
        users_to_update = db.query(User).all()
        for user in users_to_update:
            # A simple check to see if the password is NOT already hashed
            # bcrypt hashes start with '$2b$'
            if not user.password.startswith('$2b$'):
                print(f"  - Hashing password for user: {user.username}")
                hashed_password = get_password_hash(user.password)
                user.password = hashed_password
            else:
                print(f"  - Password for {user.username} is already hashed. Skipping.")

        # --- Hash passwords for the Faculty table ---
        print("\nHashing passwords for 'faculty' table...")
        faculty_to_update = db.query(Faculty).all()
        for member in faculty_to_update:
            if not member.password.startswith('$2b$'):
                print(f"  - Hashing password for faculty: {member.username}")
                hashed_password = get_password_hash(member.password)
                member.password = hashed_password
            else:
                print(f"  - Password for {member.username} is already hashed. Skipping.")
        
        db.commit()
        print("\n✅ Successfully updated all plain-text passwords.")

    except Exception as e:
        db.rollback()
        print(f"\n❌ An error occurred: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    hash_existing_passwords()
