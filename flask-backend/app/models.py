from dataclasses import dataclass
from .extensions import db
from datetime import datetime

@dataclass
class App(db.Model):
    device_name: str
    device_type: str
    current_location: str
    total_cycles: int
    cycles_left: int
    dt_start: datetime
    
    id = db.Column(db.Integer, primary_key=True)
    device_name = db.Column(db.String(10), unique=True, nullable=False)
    device_type = db.Column(db.String(10), unique=False, nullable=False)
    current_location = db.Column(db.String(10),default="B", unique=False, nullable=False)
    total_cycles = db.Column(db.Integer, unique=False, nullable=False)
    cycles_left = db.Column(db.Integer, unique=False, nullable=False)
    dt_start = db.Column(db.DateTime, nullable=False, default=datetime.now)