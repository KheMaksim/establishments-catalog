### Как запустить проект

Установить Node.Js.
По ссылке репозитория склонировать проект к себе.
После клонирования нужно в папках client и server установить node_modules с помощью команды npm install.
Далее в папке server cоздать фикстуры командой npm run seed.
После этого можно запустить локальный сервер с помощью команды npm run dev.
В папке client так же можно запустить локальный сервер с помощью команды npm run dev.

### Имеющиеся эндпоинты:

GET /establishments - получить список заведений.
GET /establishments/:id - получить заведение по id.
POST /establishments - создать заведение (доступно для авторизованного пользователя)
DELETE /establishments/delete/:id - удалить заведение (доступно для админа)

GET /reviews - получить все отзывы.
GET /reviews/:id - список отзывов конкретного заведения.
POST /reviews - создать отзыв (доступно для авторизованного пользователя)
DELETE /reviews/delete/:id - удалить отзыв (доступно для админа).

GET /pictures/:id - получить все изображения данного заведения
POST /pictures - создать изображение (доступно для авторизованного пользователя)
DELETE /pictures/:id - удалить изображение

POST /users - Регистрация нового пользователя
POST /users/sessions - Логин пользователя
DELETE /users/logout - Логаут пользователя (доступно для админа)

### Ипользуемые методы отправки

Для метода POST использовался thunder client, по адресу http://localhost:8000/.

### Общие ошибки

при неверном адресе
{
"message": "Invalid path"
}

если пользователь неавторизован
{
"error": {
"message": "No token present"
}
}

если у пользователя неверный токен
{
"error": {
"message": "Wrong token"
}
}

### Пример post-запроса

GET http://localhost:8000/establishments
[
{
"id": 2,
"name": "credo desolo",
"description": "solium suscipit solum quaerat alius bellicus cervus beneficium tendo aliqua adsum cupio considero atrox nam cum perspiciatis saepe vesper tandem",
"image": "1.jpg",
"overallRate": 2,
"avgFoodRate": 2.1,
"avgInteriorRate": 2.1,
"avgServiceRate": 1.8,
"userId": 1,
"reviews": [
{
"id": 4,
"text": "Reprehenderit contigo veniam urbs mollitia creo antiquus. Curvo ter timor.",
"serviceRate": 2,
"interiorRate": 2,
"foodRate": 2,
"datetime": "2023-02-09T11:06:15.000Z",
"establishmentId": 2,
"userId": 2
},
],
"pictures": [
{
"id": 2,
"image": "1.jpg",
"establishmentId": 2,
"userId": 1
},
]
},
{
"id": 3,
"name": "delectus caput",
"description": "curvo cauda ager collum desolo libero alo coniuratio deprecator abscido perferendis confero summa varietas arguo sint culpo crudelis audio demergo",
"image": "3.jpg",
"overallRate": 3.7,
"avgFoodRate": 4.5,
"avgInteriorRate": 3.5,
"avgServiceRate": 3,
"userId": 3,
"reviews": [
{
"id": 7,
"text": "Atqui impedit defendo vigilo vindico tenax attollo anser.",
"serviceRate": 1,
"interiorRate": 2,
"foodRate": 4,
"datetime": "2023-03-21T22:04:24.000Z",
"establishmentId": 3,
"userId": 5
},
],
"pictures": [
{
"id": 4,
"image": "2.jpg",
"establishmentId": 3,
"userId": 2
},
{
"id": 10,
"image": "4.jpg",
"establishmentId": 3,
"userId": 4
},
]
},
]

=============================================

GET http://localhost:8000/establishments/:id
{
"id": 2,
"name": "credo desolo",
"description": "solium suscipit solum quaerat alius bellicus cervus beneficium tendo aliqua adsum cupio considero atrox nam cum perspiciatis saepe vesper tandem",
"image": "1.jpg",
"overallRate": 2,
"avgFoodRate": 2.1,
"avgInteriorRate": 2.1,
"avgServiceRate": 1.8,
"userId": 1,
"reviews": [
{
"id": 4,
"text": "Reprehenderit contigo veniam urbs mollitia creo antiquus. Curvo ter timor.",
"serviceRate": 2,
"interiorRate": 2,
"foodRate": 2,
"datetime": "2023-02-09T11:06:15.000Z",
"establishmentId": 2,
"userId": 2
},
],
"pictures": [
{
"id": 2,
"image": "1.jpg",
"establishmentId": 2,
"userId": 1
},
]
},

=============================================

POST http://localhost:8000/establishments
используется формдата, так как имеются картинки
{
"name": "Establishment title",
"duration": "Some desc",
"checked": "true",
"image": (binary)
}

пример ответа:
{
"name": "Establishment title",
"description": "Some desc",
"image": "e6afd91e-6bf1-41ed-becd-40b70b43e9bc.jpg",
"checked": "true",
"userId": "2",
"overallRate": 3,
"avgFoodRate": 3,
"avgInteriorRate": 3,
"avgServiceRate": 3,
"id": 10
}

============================================

DELETE http://localhost:8000/establishments/delete/:id
для удаления должен быть токен админа

при успешном удалении приходит статус 200

============================================

GET http://localhost:8000/reviews
[
{
"id": 4,
"text": "Reprehenderit contigo veniam urbs mollitia creo antiquus. Curvo ter timor.",
"serviceRate": 2,
"interiorRate": 2,
"foodRate": 2,
"datetime": "2023-02-09T11:06:15.000Z",
"establishmentId": 2,
"userId": 2
},
{
"id": 9,
"text": "Suasoria culpa defero causa sublime villa stips delectus quae voluptas.",
"serviceRate": 1,
"interiorRate": 4,
"foodRate": 4,
"datetime": "2023-08-12T19:54:53.000Z",
"establishmentId": 2,
"userId": 2
},
]

=============================================

GET http://localhost:8000/reviews/:id
[
{
"id": 14,
"text": "Umquam perspiciatis absens assentator spes perspiciatis.",
"serviceRate": 3,
"interiorRate": 2,
"foodRate": 1,
"datetime": "2023-09-24T22:54:56.000Z",
"establishmentId": 2,
"userId": 5,
"user": {
"id": 5,
"username": "Weldon72",
"password": "$2b$10$gNNDSpv8GnF3hGF3sk4vSeFpjHokx1ngm8Nss/frX5icMhCGcUsua",
"token": "c1854dc0-552f-4f83-bc39-c77f7d23093e",
"role": "user"
}
},
{
"id": 9,
"text": "Suasoria culpa defero causa sublime villa stips delectus quae voluptas.",
"serviceRate": 1,
"interiorRate": 4,
"foodRate": 4,
"datetime": "2023-08-12T19:54:53.000Z",
"establishmentId": 2,
"userId": 2,
"user": {
"id": 2,
"username": "admin",
"password": "$2b$10$wQlrHrBPSUAM2ZZiQsvUKufH1/040isy.WSOAsp0C6eYwxyHKk8Xe",
"token": "de6b2c38-9fee-4398-a1d1-e7127fc7c7c4",
"role": "admin"
}
},
]

=============================================

POST http://localhost:8000/reviews
{
"text": "test",
"serviceRate": "5",
"interiorRate": "4",
"foodRate": "3",
"establishmentId": "2"
}

пример ответа:
{
"text": "test",
"serviceRate": "11",
"interiorRate": "12",
"foodRate": "12",
"userId": "2",
"establishmentId": "2",
"datetime": "2023-10-24T14:45:02.000Z",
"id": 58
}

============================================

DELETE http://localhost:8000/reviews/delete/:id
для удаления должен быть токен админа

при успешном удалении приходит статус 200

============================================

GET http://localhost:8000/pictures/:id
[
{
"id": 2,
"image": "1.jpg",
"establishmentId": 2,
"userId": 1
},
{
"id": 7,
"image": "4.jpg",
"establishmentId": 2,
"userId": 4
},
]

=============================================

POST http://localhost:8000/pictures
используется формдата, так как имеются картинки
{
"establishmentId": "5",
"image": (binary)
}

пример ответа:
{
"image": "3fc11e4e-e6f1-4407-a536-08c97f1b7a3b.png",
"establishmentId": "2",
"userId": "2",
"id": 48
}

============================================

DELETE http://localhost:8000/pictures/delete/:id
для удаления должен быть токен админа

при успешном удалении приходит статус 200

============================================

POST http://localhost:8000/users
{
"username": "exampleuser",
"password": "examplepassword"
}

пример ответа:
{
"username": "wdaawdw",
"token": null,
"id": 3
}

=============================================

POST http://localhost:8000/users/sessions
{
"username": "exampleuser",
"password": "examplepassword"
}

пример ответа:
{
"id": 3,
"username": "wdaawdw",
"token": "61e0330c-c610-49a2-a475-d83a1916ca37"
}

при несуществующем юзере
{
"error": {
"message": "User not exist"
}
}

при неверном пароле
{
"error": {
"message": "Login or password is wrong"
}
}

=============================================

DELETE http://localhost:8000/users

при успешном удалении приходит статус 200
