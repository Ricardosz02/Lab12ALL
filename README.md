# Lab12ALL

Aplikacja blogowa z paginacją, walidacją formularzy i systemem polubień.

## Wymagania

- Node.js (v18+)
- MongoDB
- Git

## Uruchomienie aplikacji

### 1. Klonowanie repozytorium
```bash
git clone https://github.com/Ricardosz02/Lab12ALL.git
cd Lab12ALL
```

### 2. Uruchomienie MongoDB
Otwórz nowy terminal i uruchom:
```bash
mongod
```

### 3. Backend (Node.js + Express)
```bash
cd server
npm install
npm start
```
Serwer dostępny pod: **http://localhost:3000**

### 4. Frontend (Angular)
W **nowym terminalu**:
```bash
cd blog
npm install
npm start
```
Aplikacja dostępna pod: **http://localhost:4200**

## Zaimplementowane funkcjonalności

1. **Paginacja postów** - wyświetlanie 5 postów na stronę z nawigacją
2. **Walidacja formularzy** - Reactive Forms we wszystkich formularzach (signup, login, add-post)
3. **System polubień** - like/unlike z persystencją w bazie danych
4. **Licznik wyświetleń** - automatyczne zliczanie otwarć posta
