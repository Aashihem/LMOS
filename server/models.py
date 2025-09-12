from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Date, Table
from sqlalchemy.orm import relationship
from db import Base
from datetime import datetime

# --- Association Table for Students and Batches (Many-to-Many) ---
# This table links students to the specific lab batches they are enrolled in.
student_batch_association = Table('student_batch_association', Base.metadata,
    Column('user_uid', Integer, ForeignKey('users.uid')),
    Column('batch_id', Integer, ForeignKey('lab_batches.id'))
)

# --- Main Models ---

class User(Base):
    __tablename__ = "users"
    uid = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    phone_number = Column(String(15), nullable=False)
    email = Column(String(255), nullable=False)
    username = Column(String(50), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    uid_no = Column(String(255), nullable=True)

    # --- Relationships to other tables ---
    reservations = relationship("ReservationRequest", back_populates="user")
    issues = relationship("EquipmentIssue", back_populates="reporter")
    submissions = relationship("Submission", back_populates="student")
    batches = relationship("LabBatch", secondary=student_batch_association, back_populates="students")

class Faculty(Base):
    __tablename__ = "faculty"
    faculty_id = Column(Integer, primary_key=True, index=True) # Corrected from 'id'
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    phone_number = Column(String(15), nullable=True)
    username = Column(String(50), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    role = Column(String(50), nullable=False)
    
    batches = relationship("LabBatch", back_populates="faculty")

class LabBatch(Base):
    __tablename__ = "lab_batches"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    lab_name = Column(String(100))
    
    faculty_id = Column(Integer, ForeignKey("faculty.faculty_id")) # Corrected from 'faculty.id'
    faculty = relationship("Faculty", back_populates="batches")

    students = relationship("User", secondary=student_batch_association, back_populates="batches")
    experiments = relationship("Experiment", back_populates="batch")

class Experiment(Base):
    __tablename__ = "experiments"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(String(1000), nullable=True)
    due_date = Column(Date)
    status = Column(String(50), default="Active")
    
    lab_batch_id = Column(Integer, ForeignKey("lab_batches.id"))
    batch = relationship("LabBatch", back_populates="experiments")

    submissions = relationship("Submission", back_populates="experiment")

class Submission(Base):
    __tablename__ = "submissions"
    id = Column(Integer, primary_key=True, index=True)
    submitted_at = Column(DateTime, default=datetime.utcnow)
    grade = Column(String(50), nullable=True)
    
    student_uid = Column(Integer, ForeignKey("users.uid"), nullable=False)
    experiment_id = Column(Integer, ForeignKey("experiments.id"), nullable=False)
    
    student = relationship("User", back_populates="submissions")
    experiment = relationship("Experiment", back_populates="submissions")

# --- Supporting Models ---
# (EquipmentIssue, EquipmentDetails, ReservationRequest, RFIDAttendance remain the same)
class EquipmentIssue(Base):
    __tablename__ = "equipment_issues"
    issue_id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(String(1000))
    equipment = Column(String(255))
    lab = Column(String(255))
    status = Column(String(50), default="Open", nullable=False)
    priority = Column(String(50), default="Normal", nullable=False)
    uid = Column(Integer, ForeignKey("users.uid"), nullable=False)
    reporter = relationship("User", back_populates="issues")

class EquipmentDetails(Base):
    __tablename__ = "equipment_details"
    equipment_id = Column(String(50), primary_key=True, index=True)
    equipment_name = Column(String(255), nullable=False)
    available_units = Column(Integer, nullable=False)

class ReservationRequest(Base):
    __tablename__ = "equipment_reservations"
    reservation_id = Column(Integer, primary_key=True, index=True)
    uid = Column(Integer, ForeignKey("users.uid"), nullable=False)
    equipment = Column(String(255), nullable=False)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    status = Column(String(50), default="Pending", nullable=False)
    user = relationship("User", back_populates="reservations")

class RFIDAttendance(Base):
    __tablename__ = "rfid_attendance"
    id = Column(Integer, primary_key=True, index=True)
    uid = Column(String(255), nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow, nullable=False)

