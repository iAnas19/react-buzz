# React Buzz

A lightweight, customizable toaster notification component for React featuring drag-to-dismiss, auto-expiration, grouped/stacked appearance, and pop-in/pop-out animations.

## Features

- **Types & Icons:** Supports success, error, warning, and info notifications with customizable icons.

- **Drag-to-Dismiss:** Drag notifications horizontally; if dragged beyond a set threshold, they fade out and are removed.

- **Auto-Dismiss:** Notifications automatically disappear after a specified duration.

- **Grouped Appearance:** Toasts are grouped/stacked by default so that only a portion of underlying notifications is visible; on hover, they expand to full view.

- **Pop Animations:** Toasts pop in from the top or bottom (depending on container position) and exit with matching animations.

- **Customizable:** Easily set container position (top-right, top-left, bottom-right, or bottom-left) and default duration.

## Installation

Install via npm or yarn:

`npm install react-buzz` or `yarn add react-buzz`

> Adjust the package name as needed if you publish this package.

## Usage

Wrap your app with the ToasterProvider and use the useToaster hook to trigger notifications.

### Example

#### main.tsx / index.tsx

import React from "react";import ReactDOM from "react-dom/client";import App from "./App";import { ToasterProvider } from "react-buzz";

ReactDOM.createRoot(document.getElementById("root")!).render();

#### App.tsx

```

import React from "react";
import { useToaster } from "react-buzz";

const App = () => {

const toast = useToaster();

toast("Success Message", "success") // Show Success
toast("Error Message", "error") //Show Error
toast("Warning Message", "warning") //Show Warning
toast("Info Message", "info") //Show Info

};



export default App;

```

## API

### ToasterProvider

Wraps your application and provides context for toast notifications.

Props:

- **children**: React.ReactNodeChild components.

- **position** (optional):Container position. Options:

- "top-right" (default)

- "top-left"

- "bottom-right"

- "bottom-left"

- **duration** (optional):Default auto-dismiss duration in milliseconds. Default is 3000.

### useToaster

A hook to trigger toast notifications.

Usage:

```
import { useToaster } from "react-buzz";`

const toast = useToaster();
toast("Your message", "success", 5000); // optional duration overrides default
```

Parameters:

- **message** (string): The notification message.

- **type** (optional): "success" | "error" | "warning" | "info" (defaults to "info").

- **duration** (optional): Duration in milliseconds before auto-dismiss.

## Customization

You can customize the look and feel by modifying the provided CSS in toaster.css.

Default Styles Include:

- **Grouped/Stacked Mode:** Toasts are grouped by default (only the top portions of lower toasts are visible). On hover, they expand to full view.

- **Pop Animations:** Toasts animate in with a pop effect from the top or bottom based on container position. When exiting, they pop out in the corresponding direction.

- **Drag-to-Dismiss Fade:** As you drag a toast, it gradually fades out; if dragged far enough, it is removed. Otherwise, it snaps back.

Feel free to override or extend these styles as needed.

## Development

To run the demo locally:

1. Clone the repository.

2. Install dependencies:npm install

3. Run the development server:npm run dev

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## License

This project is licensed under the MIT License.
