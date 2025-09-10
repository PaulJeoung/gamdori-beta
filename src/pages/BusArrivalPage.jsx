
import { useEffect, useState } from "react";
import { fetchBusArrivalList } from "../config/api";
import BusCard from "../components/BusCard";

export default function BusArrivalPage() {
    const [list, setList] = useState([]);
    const [stationId, setStationId] = useState("228001831");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const stationOptions = [
        { id: "228001831", name: "흥덕유타워(분당선방향)" },
        { id: "228003219", name: "기흥역4번출구" },
        { id: "228000682", name: "기흥역 6번출구" },
        { id: "203000121", name: "청명역1번출구.청명산" }
    ];

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
                <select
                    className="w-full rounded-sm border px-3 py-2"
                    value={stationId}
                    onChange={(e) => setStationId(e.target.value)}
                >
                    {stationOptions.map((station) => (
                        <option key={station.id} value={station.id}>
                            {station.name}
                        </option>
                    ))}
                </select>
                <button
                    onClick={load}
                    className="rounded-sm px-3 py-2 text-white font-medium"
                    style={{
                        background: "linear-gradient(to right, #4f46e5, #3b82f6)",
                        minWidth: "90px"
                    }}
                >
                    F5
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