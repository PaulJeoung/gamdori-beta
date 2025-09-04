export async function fetchBusArrivalList(stationId) {
    const serviceKey = import.meta.env.VITE_BUS_API_KEY;
    const url = `https://apis.data.go.kr/6410000/busarrivalservice/v2/getBusArrivalListv2?format=json&serviceKey=${serviceKey}&stationId=${stationId}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error("API 호출 실패");
    const json = await res.json();
    return json?.response?.msgBody?.busArrivalList || [];
}
