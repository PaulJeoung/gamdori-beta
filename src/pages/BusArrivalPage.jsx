import { useEffect, useState } from "react";
import { fetchBusArrivalList } from "../config/api";
import BusCard from "../components/BusCard";

export default function BusArrivalPage() {
    const [list, setList] = useState([]);
    const [stationId, setStationId] = useState("228001831");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const load = async () => {
        setLoading(true);
        setError("");
        try {
            const data = await fetchBusArrivalList(stationId);
            setList(data);
        } catch (e) {
            setError(e.message || "조회 실패");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
        const iv = setInterval(load, 30 * 1000);
        return () => clearInterval(iv);
    }, [stationId]);

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <input
                    className="w-full rounded-lg border px-3 py-2"
                    value={stationId}
                    onChange={(e) => setStationId(e.target.value)}
                    placeholder="정류장 ID 입력 (예: 228001831)"
                />
                <button
                    onClick={load}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white"
                >
                    새로고침
                </button>
            </div>

            {loading && <div className="text-gray-500">불러오는 중…</div>}
            {error && <div className="text-red-600">에러: {error}</div>}

            <div className="grid gap-3">
                {list.length === 0 && !loading && (
                    <div className="text-gray-500">표시할 정보가 없습니다.</div>
                )}
                {list.map((bus, i) => (
                    <BusCard key={i} bus={bus} />
                ))}
            </div>
        </div>
    );
}
