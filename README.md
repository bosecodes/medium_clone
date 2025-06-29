# Kitaabi Keeda 📚

**Kitaabi Keeda** is an Angular web app that displays a list of books, allowing users to:
- Search books by title or author
- Paginate through the list
- Mark books as favorites ❤️ (with persistence via `localStorage`)
- Add new books (with auto-generated random images)
- Switch between Dark 🌚 and Light 🌞 mode
- Enjoy minimal styling using **Angular Material**

---

## 🌟 Features

✅ **Book List with Random Images**  
Books are displayed with randomly generated image URLs.

✅ **Search & Filter**  
Instantly filter books by typing in the search bar (no need to press enter or click a button).

✅ **Pagination**  
Navigate through books using previous/next buttons. Total pages are calculated dynamically.

✅ **Add Book**  
Add new books via a form. New books appear immediately in the list.

✅ **Favorite Books (❤️/🤍)**  
Mark/unmark books as favorites. Favorites persist in `localStorage`.

✅ **Dark/Light Mode**  
Toggle between dark and light themes with Gen Z style emoji indicators 🌞/🌚.

✅ **Responsive, Minimal Design**  
Built with **Angular Material** components for a clean UI.

---

## 🛠️ Tools & Technologies

- **Angular** (with CLI)
- **RxJS**
  - `BehaviorSubject`, `Subject`
  - `Observable`, `combineLatest`
  - Operators: `map`, `filter`, `debounceTime`, `distinctUntilChanged`, `startWith`
- **Angular Material**
- **Custom Directive**  
  `appFavorite` directive handles favorite icon toggling.

- **Custom Pipe**
- **HTTP Interceptor**
- **LocalStorage** for persistence
- **GitHub Pages** for deployment

---

## ⚙️ Key Angular concepts demonstrated

- Template forms & Reactive forms  
- `@ViewChild` + `ngAfterViewInit`  
- `ngOnDestroy` (for cleaning up subscriptions)  
- Routing + RouterOutlet  
- Lazy loaded images  
- Custom directives  
- Pure/Impure pipes

---

## 🚀 Deployment

The app is deployed using **GitHub Pages**.

### To build + deploy:
```bash
ng build --base-href /kitaabi-keeda/
npx angular-cli-ghpages --dir=dist/kitaabi-keeda
