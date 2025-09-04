import BusArrivalPage from "./pages/BusArrivalPage";
import GameFloatingButton from "./components/GameFloatingButton";

export default function App() {
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b">
                <div className="mx-auto max-w-3xl px-4 py-3 flex items-center justify-between">
                    <h1 className="text-lg font-bold">🚍 실시간 버스</h1>
                    <nav className="text-sm text-gray-500">Prototype</nav>
                </div>
            </header>

            <main className="mx-auto max-w-3xl px-4 py-6">
                <BusArrivalPage />
            </main>

            <GameFloatingButton />
        </div>
    );
}
