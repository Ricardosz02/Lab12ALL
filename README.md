# Blog Application - Lab12

Aplikacja blogowa z systemem autentykacji, paginacją, walidacją formularzy i systemem polubień.

## 🚀 Technologie

### Backend
- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **CORS**

### Frontend
- **Angular 19** (Standalone Components)
- **Bootstrap 5**
- **Font Awesome**
- **Reactive Forms**
- **RxJS**

---

## 📦 Wymagania wstępne

Zainstaluj następujące narzędzia:

1. **Node.js** (v18 lub nowsze) - [Pobierz tutaj](https://nodejs.org/)
2. **MongoDB** - [Pobierz tutaj](https://www.mongodb.com/try/download/community)
3. **Git** - [Pobierz tutaj](https://git-scm.com/)

---

## 🛠️ Instalacja i uruchomienie

### 1. Klonowanie repozytorium
```bash
git clone https://github.com/Ricardosz02/Lab12ALL.git
cd Lab12ALL
```

### 2. Uruchomienie MongoDB
Otwórz terminal i uruchom MongoDB:
```bash
mongod
```

### 3. Instalacja i uruchomienie backendu
```bash
cd server
npm install
npm start
```
Serwer będzie dostępny pod adresem: **http://localhost:3000**

### 4. Instalacja i uruchomienie frontendu
W **nowym terminalu**:
```bash
cd blog
npm install
npm start
```
Aplikacja będzie dostępna pod adresem: **http://localhost:4200**

---

## ✅ Zaimplementowane funkcjonalności

### 1. **Paginacja postów** ✅
- Wyświetlanie 5 postów na stronę
- Przyciski nawigacji między stronami (« 1 2 3 »)
- Informacja o aktualnej stronie i łącznej liczbie stron
- Parametry query w URL (`?page=1&limit=5`)
- Synchronizacja z URL - odświeżenie zachowuje stronę

**Backend:** GET `/api/posts?page=1&limit=5`  
**Komponenty:** `BlogComponent`, `PaginationComponent`

---

### 2. **Walidacja formularzy (Reactive Forms)** ✅
Wszystkie formularze używają **Reactive Forms** z walidacją:

#### Rejestracja (`/signup`)
- Email: wymagany + poprawny format email
- Hasło: wymagane + min. 5 znaków
- Imię: wymagane
- Przycisk submit zablokowany gdy formularz niepoprawny
- Komunikaty błędów wyświetlane przy polach

#### Logowanie (`/login`)
- Login: wymagany
- Hasło: wymagane
- Przycisk submit zablokowany
- Komunikat o błędzie logowania

#### Dodawanie posta (`/add-post`)
- Tytuł: wymagany + min. 3 znaki
- Treść: wymagana + min. 10 znaków
- URL obrazka: opcjonalny
- Przycisk submit zablokowany

**Komponenty:** `SignupComponent`, `LoginComponent`, `AddPostComponent`

---

### 3. **System polubień (like/unlike)** ✅
- Przycisk like/unlike przy każdym poście (ikona kciuka)
- Licznik polubień synchronizowany z serwerem
- Użytkownik może polubić post tylko raz
- Wizualne oznaczenie: 
  - Polubiony: niebieska ikona wypełniona (👍)
  - Niepolubiony: szara ikona konturu
- Persystencja w localStorage (frontend) + MongoDB (backend)

**Backend:** 
- POST `/api/posts/:id/like` - polubienie
- DELETE `/api/posts/:id/like` - usunięcie polubienia

**Komponenty:** `BlogItemComponent`  
**Serwisy:** `LikesService`, `DataService`

---

### 4. **Licznik wyświetleń (views)** ✅
- Automatyczne inkrementowanie przy każdym otwarciu posta
- Wyświetlanie ikony oka (👁️) + liczby wyświetleń
- Persystencja w MongoDB

**Backend:** GET `/api/posts/:id` - automatycznie zwiększa `views`  
**Schema:** `views: { type: Number, default: 0 }`

---

### 5. **Dodatkowe funkcjonalności**

#### System komentarzy ✅
- Dodawanie komentarzy pod postami
- Persystencja w localStorage (klucz: `blog_comments`)
- Wyświetlanie listy komentarzy

**Komponenty:** `CommentsSectionComponent`  
**Serwisy:** `CommentsService`

#### System ulubionych (favorites) ✅
- Dodawanie/usuwanie postów do ulubionych (ikona serca ❤️)
- Strona z ulubionymi postami (`/favorites`)
- Persystencja w localStorage

**Komponenty:** `FavoritesComponent`  
**Serwisy:** `FavoritesService`

#### Filtrowanie/wyszukiwanie ✅
- Pasek wyszukiwania filtrujący po tytule i treści
- Backend: regex case-insensitive
- Reset paginacji do strony 1 przy filtrowaniu

**Komponenty:** `SearchBarComponent`

#### System ocen/ratingów ✅
- Ocena postów (gwiazdki)
- Komponent: `RatingComponent`

#### Autentykacja użytkowników ✅
- Rejestracja nowych użytkowników
- Logowanie z walidacją
- MongoDB: kolekcja `users`

**Endpointy:**
- POST `/api/user/auth` - logowanie
- POST `/api/user/create` - rejestracja

#### Dark mode ✅
- Przełącznik jasny/ciemny motyw
- Komponent: `ThemeToggleComponent`

#### Routing ✅
- Strona główna (`/`)
- Lista postów (`/blog`)
- Szczegóły posta (`/details/:id`)
- Ulubione (`/favorites`)
- Dodawanie posta (`/add-post`)
- Logowanie (`/login`)
- Rejestracja (`/signup`)

---

## 📁 Struktura projektu

```
Lab12ALL/
├── server/              # Backend (Node.js + Express)
│   ├── index.js         # Główny plik serwera
│   ├── package.json     # Zależności backendu
│   └── node_modules/
│
├── blog/                # Frontend (Angular)
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/     # Komponenty Angular
│   │   │   │   ├── blog/
│   │   │   │   ├── blog-item/
│   │   │   │   ├── pagination/
│   │   │   │   ├── add-post/
│   │   │   │   ├── login/
│   │   │   │   ├── signup/
│   │   │   │   ├── comments-section/
│   │   │   │   └── ...
│   │   │   │
│   │   │   └── services/       # Serwisy Angular
│   │   │       ├── data.ts
│   │   │       ├── auth.ts
│   │   │       ├── likes.ts
│   │   │       ├── comments.ts
│   │   │       └── favorites.ts
│   │   │
│   │   └── styles.scss
│   │
│   ├── package.json
│   └── angular.json
│
├── .gitignore
└── README.md
```

---

## 🗄️ API Endpoints

### Posty
- `GET /api/posts?page=1&limit=5&filter=text` - lista postów z paginacją i filtrowaniem
- `GET /api/posts/:id` - szczegóły posta (zwiększa views)
- `POST /api/posts` - dodanie nowego posta
- `POST /api/posts/:id/like` - polubienie posta
- `DELETE /api/posts/:id/like` - usunięcie polubienia

### Użytkownicy
- `POST /api/user/auth` - logowanie
- `POST /api/user/create` - rejestracja
- `DELETE /api/user/logout/:id` - wylogowanie

### Migracje
- `POST /api/migrate-views` - dodanie pola `views` do starych postów
- `POST /api/migrate-likes` - dodanie pól `likes` i `likesCount` do starych postów

---

## 🧪 Testowanie

### Testy manualne

#### Test 1: Paginacja
1. Otwórz http://localhost:4200
2. Sprawdź czy widoczne max 5 postów
3. Kliknij stronę 2
4. Zweryfikuj URL: `?page=2&limit=5`
5. Odśwież stronę (F5) - powinna pozostać strona 2

#### Test 2: Walidacja formularzy
1. Otwórz `/signup`
2. Kliknij "Zarejestruj się" bez wypełnienia
3. Sprawdź komunikaty błędów
4. Wpisz niepoprawny email (np. "test")
5. Sprawdź czy przycisk jest disabled

#### Test 3: Polubienia
1. Kliknij ikonę kciuka przy poście
2. Sprawdź czy ikona się zmieniła (kolor + wypełnienie)
3. Sprawdź czy licznik wzrósł
4. Odśwież stronę (F5)
5. Zweryfikuj czy stan się zachował

#### Test 4: Licznik wyświetleń
1. Zapisz liczbę wyświetleń posta
2. Kliknij "Zobacz więcej"
3. Wróć do listy
4. Sprawdź czy licznik wzrósł o 1

---

## 🔧 Rozwiązywanie problemów

### Port 3000 już zajęty
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Port 4200 już zajęty
```bash
# Windows
netstat -ano | findstr :4200
taskkill /PID <PID> /F
```

### MongoDB nie uruchamia się
Sprawdź czy MongoDB jest zainstalowane:
```bash
mongod --version
```

### Błąd CORS
Upewnij się, że backend działa na porcie 3000 i ma zainstalowany `cors`.

---

## 👨‍💻 Autor

**Sebastian Kukieła**  
Projekt wykonany w ramach przedmiotu: **Technologie Aplikacji Webowych**  
Uczelnia: **Politechnika Warszawska**  
Rok akademicki: **2025/2026**

---

## 📄 Licencja

Projekt edukacyjny - użytek akademicki.

---

## 📝 Odpowiedzi na pytania dotyczące implementacji

### 1. Jak zaimplementowano paginację?
**Backend:** Endpoint `/api/posts` przyjmuje parametry `page` i `limit`, używa Mongoose `.skip()` i `.limit()` do ograniczenia wyników. Zwraca także `totalPosts`, `totalPages` i `currentPage`.

**Frontend:** Komponent `BlogComponent` synchronizuje się z URL query params (`ActivatedRoute`), a `PaginationComponent` renderuje przyciski nawigacji. Przy zmianie strony aktualizowany jest URL i pobierane są nowe dane.

### 2. Dlaczego użyto Reactive Forms?
Reactive Forms oferują:
- Lepszą kontrolę nad walidacją
- Łatwiejsze testowanie
- Typowanie TypeScript
- Reaktywne programowanie z RxJS
- Walidację asynchroniczną

Wszystkie formularze używają `FormGroup` + `FormControl` z walidatorami (`Validators.required`, `Validators.email`, `Validators.minLength`).

### 3. Jak działa system polubień?
**Frontend:** `LikesService` przechowuje polubione posty w localStorage. Przy kliknięciu wywoływany jest odpowiedni endpoint DELETE/POST.

**Backend:** Tablica `likes` w schemacie przechowuje userId użytkowników, którzy polubili post. `likesCount` to długość tablicy. Przy każdym like/unlike aktualizowany jest dokument w MongoDB.

### 4. Czy dane są persystentne?
- **Posty, użytkownicy, likes, views** → MongoDB (persystencja pełna)
- **Komentarze, ulubione, informacja o polubionych** → localStorage (persystencja w przeglądarce)

### 5. Jakie są słabe strony obecnej implementacji?
1. **Autentykacja:** Używa fake token zamiast JWT
2. **Bezpieczeństwo:** Hasła przechowywane plain text (brak bcrypt)
3. **Komentarze:** Tylko w localStorage, powinny być w bazie
4. **Brak autoryzacji:** Każdy może dodać post
5. **Walidacja:** Tylko frontend, backend powinien też walidować

### 6. Co można ulepszyć?
1. Dodać JWT authentication
2. Hash haseł (bcrypt)
3. Przenieść komentarze do MongoDB
4. Dodać role użytkowników (admin, user)
5. Dodać testy jednostkowe (Jasmine, Jest)
6. Dodać paginację komentarzy
7. Optymalizacja zapytań (indexy w MongoDB)
8. Server-side rendering (Angular Universal)
