Read the instruction files in this repository:

.github/copilot-instructions.md
copilot-scaffold.md
copilot-architecture.md

Using those guidelines, scaffold the full working project.

Requirements:
- Vite React project
- JavaScript only (JSX, no TypeScript)
- Use the Grommet UI framework
- Responsive layout
- Single landing page

Create the following files if they do not exist:

index.html
vite.config.js
firebase.json

src/main.jsx
src/App.jsx
src/firebase.js
src/assets/launch-image.png (placeholder reference)

The App should render:
- Heading title
- Image button that redirects to a URL
- Supporting text below the button

Use Grommet components:
Box
Heading
Button
Image
Text

Center the layout vertically and horizontally.

The image button should redirect using:

window.location.href

Implement responsive behaviour so the image scales for mobile and desktop.

Add npm scripts:

dev
build
preview
deploy

The deploy script must build the Vite project and deploy to Firebase Hosting.

Keep the entire React implementation simple and under ~200 lines.
Do not introduce routing, Redux, Tailwind, or additional frameworks.