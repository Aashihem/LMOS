from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

# Define a Pydantic model for the data sent by the ESP32
class ESP32Data(BaseModel):
    sensor_value: float  # Replace with the actual data type (e.g., int, str, etc.)


@router.post("/esp32/data")
async def receive_esp32_data(data: dict):
    sensor_value = data.get("sensor_value")
    print(f"Received data from ESP32: {sensor_value}")
    return {"message": "Data received successfully", "data": sensor_value}