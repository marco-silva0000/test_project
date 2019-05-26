from starlette.applications import Starlette
from starlette.config import Config
import uvicorn
import sqlalchemy
import databases

from urls import urls
import settings


metadata = sqlalchemy.MetaData()
database = databases.Database(settings.DATABASE_URL)
app = Starlette(debug=settings.DEBUG)
app.mount('/', urls)

# app.add_middleware(SessonMiddleware, secret_key=settings.SECRET_KEY)


@app.on_event("startup")
async def startup():
    import models
    await database.connect()

@app.on_event("shutdown")
async def startup():
    await database.disconnect()

def run_app():
    uvicorn.run(app, host="0.0.0.0", port=8000, lifespan="on")

if __name__ == "__main__":
    run_app()
