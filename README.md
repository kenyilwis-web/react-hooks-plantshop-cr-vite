# Plant Shop (React + Vite)

A React frontend connected to a plant backend API.

## Features

- Fetch and display all plants on initial page load.
- Add a new plant via form submission.
- Mark a plant as sold out in the UI (non-persisting toggle).
- Search plants by name with live filtering.

## Screenshot

![Completed Plant Shop UI](docs/images/completed-app.svg)

## Tech Stack

- React 18
- Vite
- Fetch API
- Jest + React Testing Library

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the backend (JSON Server against `db.json`):

   ```bash
   npx json-server --watch db.json --port 6001
   ```

3. In a new terminal, start the frontend:

   ```bash
   npm run dev
   ```

4. Open the Vite URL shown in terminal.

## API Contract

The UI expects:

- `GET http://localhost:6001/plants`
- `POST http://localhost:6001/plants`

## Project Structure

- `src/components/PlantPage.jsx` — data fetching, create flow, search filtering
- `src/components/NewPlantForm.jsx` — controlled form + submit handling
- `src/components/PlantList.jsx` — maps filtered plants to cards
- `src/components/PlantCard.jsx` — card UI + sold-out toggle button
- `src/components/Search.jsx` — controlled search input

## Testing

```bash
npm test
```

## Branch Cleanup (GitHub)

Delete merged remote branches:

```bash
git fetch --prune
git branch -r --merged origin/main | grep -v "origin/main" | sed 's/origin\///' | xargs -r -n 1 git push origin --delete
```

Delete fully merged local branches:

```bash
git branch --merged | grep -v "^*" | grep -v " main$" | xargs -r git branch -d
```

## License

See [LICENSE.md](LICENSE.md).