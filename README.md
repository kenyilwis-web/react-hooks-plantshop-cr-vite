# Plant Shop (React)

A frontend React application for managing a small plant inventory.

## Description

This app connects to a backend API and supports the core inventory flow:

- Load and display all plants on page load.
- Add a new plant using a form.
- Mark a plant as sold out.
- Filter plants by name using search.

## Screenshot

![Completed Plant Shop UI](docs/images/completed-app.svg)

## Tech Stack

- React 18
- Vite
- CSS Modules
- Fetch API

## Installation

```bash
npm install
```

## Usage

1. Start the frontend:

   ```bash
   npm run dev
   ```

2. Start your backend API so `GET/POST/PATCH` requests are available at:

   ```
   http://localhost:6001/plants
   ```

3. Open the app in your browser using the Vite URL shown in terminal.

## API Expectations

The frontend expects a REST resource at `/plants`:

- `GET /plants` → returns all plants
- `POST /plants` → creates a plant
- `PATCH /plants/:id` → updates plant fields (for sold-out status)

Example plant shape:

```json
{
  "id": 1,
  "name": "Monstera",
  "image": "https://example.com/monstera.png",
  "price": 25,
  "soldOut": false
}
```

## Testing

Run tests with:

```bash
npm test
```

## Project Structure

- `src/App.jsx`: API requests, app state, filtering, and form handling
- `src/components/Search.jsx`: controlled search input
- `src/components/ProductList.jsx`: filtered list rendering
- `src/components/ProductCard.jsx`: single-plant UI and sold-out action

## Contributing

1. Create a feature branch.
2. Make your changes and commit with clear messages.
3. Open a pull request for review.

## License

See [LICENSE.md](LICENSE.md).