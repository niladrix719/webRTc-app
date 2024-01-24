import './index.css';
import App from './App';
import { createRoot } from "react-dom/client";

const rootElement: any = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <App />
);
