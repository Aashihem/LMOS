from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# --- Import all your route modules ---
# Ensure the names here exactly match your filenames in the 'routes' folder
from routes import (
    login_routes,
    profile_routes,
    img_process_routes,
    esp32_routes,
    dashboard_routes,
    issue_routes, 
    reservation_routes,
    equipment_routes,
    attendance_routes,
    batch_routes,
    user_routes, # Removed the comma from this line
    experiment_routes
)

app = FastAPI()

# --- CORS Middleware Setup ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Include all your API routers ---
app.include_router(login_routes.router)
app.include_router(profile_routes.router)
app.include_router(img_process_routes.router)
app.include_router(esp32_routes.router)
app.include_router(dashboard_routes.router)
app.include_router(issue_routes.router)
app.include_router(reservation_routes.router)
app.include_router(equipment_routes.router)
app.include_router(attendance_routes.router)
app.include_router(experiment_routes.router)
app.include_router(batch_routes.router)
app.include_router(user_routes.router)


@app.get("/")
def read_root():
    return {"message": "Welcome to the LMOS Backend!"}

# This block allows you to run the server directly using "python main.py"
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)