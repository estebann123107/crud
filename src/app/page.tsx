import { AsideComponent } from "./components/aside-component";
import { MainComponent } from "./components/main-component";

export default function TodoView() {
  return (
    <div className="app-shell">
      <AsideComponent />
      <main className="app-content">
        <MainComponent />
      </main>
    </div>
  );
}
