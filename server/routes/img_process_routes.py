from fastapi import APIRouter, File, UploadFile
from fastapi.responses import JSONResponse
from roboflow import Roboflow
from PIL import Image, ImageDraw, ImageFont
import io
import time
import os

router = APIRouter()

# Initialize Roboflow
rf = Roboflow(api_key="tl44hGdKoh1F94o5HO3g")  # Replace with your API key
project = rf.project("electrocom-61")  # Replace with your project name
model = project.version(4).model       # Replace with your model version

# Create a folder for processed images if it doesn't exist
PROCESSED_IMAGES_DIR = "processed_images"
os.makedirs(PROCESSED_IMAGES_DIR, exist_ok=True)

@router.post("/process-image/")
async def process_image(file: UploadFile = File(...)):
    # Read the uploaded image
    image_data = await file.read()
    image = Image.open(io.BytesIO(image_data)).convert("RGB")

    # Save the image temporarily
    temp_image_path = f"{PROCESSED_IMAGES_DIR}/temp_{time.time()}.jpg"
    image.save(temp_image_path)

    # Run inference
    result = model.predict(temp_image_path).json()

    # Draw bounding boxes
    draw = ImageDraw.Draw(image)
    try:
        font = ImageFont.truetype("arial.ttf", 14)
    except:
        font = ImageFont.load_default()

    for pred in result["predictions"]:
        x, y, w, h = pred["x"], pred["y"], pred["width"], pred["height"]
        label = pred["class"]
        conf = pred["confidence"]

        # Convert to box coordinates
        left = x - w / 2
        top = y - h / 2
        right = x + w / 2
        bottom = y + h / 2

        draw.rectangle([left, top, right, bottom], outline="red", width=2)
        draw.text((left, top - 10), f"{label} ({conf:.2f})", fill="red", font=font)

    # Save the processed image in the folder
    output_path = f"{PROCESSED_IMAGES_DIR}/processed_{time.time()}.jpg"
    image.save(output_path)

    # Return the processed image as a response
    with open(output_path, "rb") as f:
        return JSONResponse(content={"processed_image": f.read().hex()})