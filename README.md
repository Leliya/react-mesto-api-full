# Проект Mesto
*Приложение создано в рамках обучения на курсе Веб-разработки Яндекс Практикума.*  

## Описание

Проект представляет собой небольшое приложение с возможностью добавлять изображения и оценивать их. Вход в приложение осуществляется с помощью регистрации и авторизации. При заполнении форм происходит live-валидация.

## Технологии

**Frontend-часть** приложения написана на **React.js** с применением **отзывчивой верстки** и принципов методологии **БЭМ**. Запросы формируются и обрабатываются по принципам **REST API**.

**Backend** использует **Express.js** предоставляя ресурсы с помощью **MongoDB**. Настроены логгирование и валидация входящих данных.

## Использование

Склонируйте репозиторий 
```
git clone https://github.com/Leliya/react-mesto-api-full.git
```
**Запуск Frontend-части приложения:**
1. Перейдите в папку **frontend**:  
      ```
      cd frontend/
      ```
2. Установите зависимости:
      ```
      npm install
      ```
3. Проект запускается локально на 3000 порту командой:
      ```
      npm run start
      ```
      При локальном запуске запросы API отправляются на локально запущенную на 4000 порту серверную часть.
</br>

**Запуск Backend-части приложения:**  
1. Из корневой директории проекта перейдите в папку **backend**:   
      ```
      cd backend/
      ```  
2. Установите зависимости:
      ```
      npm install
      ```
3. Проект запускается локально на 4000 порту командой:
      ```
      npm run start
      ```

## Демо

Ознакомиться с демо-версиями можно по ссылкам:

**Frontend** [https://leliya.mesto.nomoredomains.icu](https://leliya.mesto.nomoredomains.icu)  
**Backend**  [https://api.leliya.mesto.nomoredomains.icu](https://api.leliya.mesto.nomoredomains.icu)
