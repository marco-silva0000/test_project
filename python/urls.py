from starlette.routing import Mount, Route, Router
from starlette.staticfiles import StaticFiles
from starlette.templating import Jinja2Templates
import settings
import endpoints

templates = Jinja2Templates(directory=settings.STATIC_DIR)
async def homepage(request):
    return templates.TemplateResponse('index.html', {'request': request})



urls = Router(
    [
        Mount("/api", app=endpoints.endpoints),
        Route('/', endpoint=homepage, methods=['GET']),
        Mount("/", app=StaticFiles(directory=settings.STATIC_DIR)),
    ]
)
