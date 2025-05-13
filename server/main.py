from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.equipment_routes import router as equipment_router
from routes.login_routes import router as login_router
from routes.reservation_routes import router as reservation_router
from routes.login_routes import router
from routes.profile_routes import router as profile_router
from routes.img_process_routes import router as img_process_router




app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update with specific origins if needed
    allow_origins=["*"  # Ngrok URL
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the API routes
app.include_router(login_router)
app.include_router(equipment_router, prefix="/api")
app.include_router(reservation_router, prefix="/api")
app.include_router(router)
app.include_router(profile_router)
app.include_router(img_process_router)
# Include other routers as needed

@app.get("/")
def read_root():
    return {"message": "Welcome to the LMOS Backend!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)