# Дипломная работа Fullstack JS
### автор Ожуг Константин

## Приложение: "Cайт-агрегатор просмотра и бронирования гостиниц"

#### Техзадание: 
https://github.com/netology-code/fjs-diplom/blob/main/README.md#12-%D0%BC%D0%BE%D0%B4%D1%83%D0%BB%D1%8C-%D0%B3%D0%BE%D1%81%D1%82%D0%B8%D0%BD%D0%B8%D1%86%D1%8B

#### Стэк приложения:
  
  - Node.js, Nest.jx, MongoDB, WebSocket
  - React, Redux, React Router, Redux-Saga

  Корень приложения: fjs-diplom
  Внутри 2 раздела:
  - backend
  - frobtend

-----

### Запуск приложения:
  
  #### Вариант 1 (основной):
  
  В корне запустить "docker compose up"/
  Итог:
  - localhost:3000 - fromtend
  - localhost:4000 - backend
  - localhost:27017 - mongodb

  #### Вариант 2 : 
    - docker run -d -p 27017:27017 mongodb/mongodb-community-server
    - В каталоге /backend/src переименовать файл ".env-example" в ".env"
    - Внутри строки раскоментировать
    - Запустить из /backend/ "npm run start"
    
    - В каталоге /frontend/src переименовать файл ".env-example" в ".env"
    - Внутри строки раскоментировать
    - Запустить из /frontend/ "npm run start" 
    
    Итог:
      localhost:3000 - fromtend
      localhost:4000 - backend
      localhost:27017 - mongodb

-----

### Backend
- При прохождении аутентификации выдается токен JWT с доступом на 10 часов ( нужно значительно меньше, сделал так для удобства проверки и отладки приложения)
- Контроль доступа на маршруты по ролям пользователей из TokenJWT
- Все изменеия на Frontend записываются в MongoDB

-----

### Frontend
Интерфейс и возможности пользователя во Fronend зависят от роль пользователя.

1. Без логирования и без роли
  - Возможность зарегистрироваться (При ошибке выходит сообщение)
  - Возможность Войти под существующим логином  (При ошибке выходит сообщение)
  - Просмотр гостиниц (Название, описание, изображения, поиск по вхождению строки)
  - Выбрав гостиницу можем просмотреть номера в ней  (Название, описание, изображения)
  - Бронирование номеров только зарегистрированным пользователям с ролью "client"

После аутентификации пользователя, его данные храняться в localStorage

2. Пользователь с ролью "client"
  - Просмотр гостиниц (Название, описание, изображения, поиск по вхождению строки)
  - Выбрав гостиницу можем просмотреть номера в ней (Название, описание, изображения)
  - На странице номера есть возможность его забронировать, указав даты заезда и выезда (данные храняться в localStorage) 
  - Выбрав в шапке "Брони", можем просмотреть брони текущего пользователя и при желании отменить их.
  - Справа в низу значок Чата с менеджером, открываем и пишем сообщения

3. Пользователь с ролью "manager"
  - Просмотр гостиниц (Название, описание, изображения, поиск по вхождению строки)
  - Выбрав гостиницу можем просмотреть номера в ней  (Название, описание, изображения)
  - Бронирование номеров запрещено!
  - Чаты с пользовытелями:
    - Пользователи писавшие сообщения выводятся списком, нажимаем на пользователя, и справа открывается переписка. Шлём ответные сообщения.
    - Просмотр списка пользователей. Редактирование и удаление запрещено.
    - Просмотр данных пользователя (нажимаем на сообтветствующий значок)
    - Просмотр броней пользователя. Возможность отмены брони.

4. Пользователь с ролью "manager"
  - Добавление гостиницы. Контроль содержимого по техзаданию. Изображение можно перемещать, удалять.
  - Просмотр гостиниц (Название, описание, изображения, поиск по вхождению строки)
    - Редактирование гостиницы. Контроль содержимого по техзаданию. Изображение можно перемещать, удалять.
  - Выбрав гостиницу можем просмотреть номера в ней  (Название, описание, изображения)
    - Добавление номера. Контроль содержимого по техзаданию. Изображение можно перемещать, удалять.
    - Редактирование номера. Контроль содержимого по техзаданию. Изображение можно перемещать, удалять.
  - Бронирование номеров запрещено!
  - Просмотр списка пользователей.
    - Просмотр данных пользователя (нажимаем на сообтветствующий значок)
    - Редактирование данных пользователя (нажимаем на сообтветствующий значок)
    - Удаление пользователя (нажимаем на сообтветствующий значок)

      



