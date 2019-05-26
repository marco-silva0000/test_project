from starlette.routing import Route, Router
from starlette.responses import JSONResponse
from starlette.endpoints import HTTPEndpoint

class PersonListEndpoint(HTTPEndpoint):
    async def get(self, request):
        return await self.list(request)

    async def post(self, request):
        return await self.create(request)

    async def list(self, request):
        from models import Person
        people = await Person.objects.all()
        result = []
        for p in people:
            result.append(
                {
                    "id": p.id,
                    "name": p.name,
                    "age": p.age,
                    "balance": p.balance,
                    "email": p.email,
                    "address": p.address,
                    "is_favorite": p.is_favorite,
                }
            )
        return JSONResponse(result)

    async def create(self, request):
        from models import Person
        person = await Person.objects.create(** await request.json())
        result = {
                "id": person.id,
                "name": person.name,
                "age": person.age,
                "balance": person.balance,
                "email": person.email,
                "address": person.address,
                "is_favorite": person.is_favorite,
            }
        return JSONResponse(result)


class PersonEndpoint(HTTPEndpoint):
    async def get(self, request):
        pk = request.path_params['person_id']
        return await self.retrieve(request, pk)

    async def put(self, request):
        pk = request.path_params['person_id']
        return await self.update(request, pk)

    async def delete(self, request):
        pk = request.path_params['person_id']
        return await self.remove(request, pk)

    async def retrieve(self, request, pk):
        from models import Person
        person = await Person.objects.get(id=pk)
        result = {
                "id": person.id,
                "name": person.name,
                "age": person.age,
                "balance": person.balance,
                "email": person.email,
                "address": person.address,
                "is_favorite": person.is_favorite,
            }
        return JSONResponse(result)

    async def update(self, request, pk):
        from models import Person
        person = await Person.objects.get(id=pk)
        data = await request.json()
        fields = Person.fields.keys()
        data = {key: value for key, value in data.items() if key in fields}
        data.pop('id', None)
        print(data)
        await person.update(**data)
        result = {
                "id": person.id,
                "name": person.name,
                "age": person.age,
                "balance": person.balance,
                "email": person.email,
                "address": person.address,
                "is_favorite": person.is_favorite,
            }
        return JSONResponse(result)

    async def remove(self, request, pk):
        from models import Person
        person = await Person.objects.get(id=pk)
        response = await person.delete()
        return JSONResponse(response)

class PersonFavoriteEndpoint(HTTPEndpoint):
    async def put(self, request):
        pk = request.path_params['person_id']
        return await self.toggle_favorite(request, pk)

    async def toggle_favorite(self, request, pk):
        from models import Person
        person = await Person.objects.get(id=pk)
        await person.update(is_favorite=(not person.is_favorite))
        result = {
                "id": person.id,
                "name": person.name,
                "age": person.age,
                "balance": person.balance,
                "email": person.email,
                "address": person.address,
                "is_favorite": person.is_favorite,
            }
        return JSONResponse(result)

endpoints = Router([
    Route('/person/', endpoint=PersonListEndpoint),
    Route('/person/{person_id:int}/', endpoint=PersonEndpoint),
    Route('/person/{person_id:int}/toggle-favorite/', endpoint=PersonFavoriteEndpoint),
])
