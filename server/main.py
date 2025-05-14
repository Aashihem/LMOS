from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# from routes.equipment_routes import router as equipment_router
from routes.login_routes import router as login_router
# from routes.reservation_routes import router as reservation_router

from routes.profile_routes import router as profile_router
from routes.img_process_routes import router as img_process_router
from routes.esp32_routes import router as esp32_router


# Include the ESP32 API routes
#wifi ip usse everywhere
#backend on 0.0.0.0
#allow origins all these addreses as well



app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173","http://10.10.120.31:5173/","2322-103-104-226-58.ngrok-free.app","192.168.170.20","0.0.0.0"]  # Update with specific origins if needed
    # Ngrok URL
,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the API routes
app.include_router(login_router)
# app.include_router(equipment_router, prefix="/api")
# app.include_router(reservation_router, prefix="/api")
app.include_router(profile_router)
app.include_router(img_process_router)
app.include_router(esp32_router)
# Include other routers as needed

@app.get("/")
def read_root():
    return {"message": "Welcome to the LMOS Backend!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)