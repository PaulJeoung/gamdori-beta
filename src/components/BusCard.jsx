export default function BusCard({ bus }) {
    // flag 상태 처리
    const statusText =
        bus.flag === "RUN" || bus.flag === "PASS"
            ? "운행중"
            : bus.flag === "STOP"
                ? "운행종료"
                : "대기중";

    const statusIcon =
        statusText === "운행중"
            ? "🚍"
            : statusText === "운행종료"
                ? "⛔"
                : "⏳";

    const statusColor =
        statusText === "운행중"
            ? "text-green-600 dark:text-green-400"
            : statusText === "운행종료"
                ? "text-red-600 dark:text-red-400"
                : "text-yellow-600 dark:text-yellow-400";

    // 남은시간 기반 탑승 확률
    const time = parseInt(bus.predictTime1);
    let progress = 0;
    if (time > 2) progress = 100;
    else if (time > 1) progress = 50;
    else progress = 10;

    return (
        <div className="p-3 border rounded-lg bg-white dark:bg-gray-800 shadow transition-colors">
            <div className="flex justify-between items-center mb-1">
                <div className="font-bold text-lg text-gray-900 dark:text-gray-100">
                    {bus.routeName}
                </div>
                <div className={`text-sm font-semibold flex items-center gap-1 ${statusColor}`}>
                    <span>{statusIcon}</span>
                    <span>{statusText}</span>
                </div>
            </div>

            <div className="mb-1 text-gray-800 dark:text-gray-200">
                도착예상: {bus.predictTime1 ?? "-"}분
            </div>
            {bus.plateNo1 && (
                <div className="text-gray-700 dark:text-gray-300">
                    차량번호: {bus.plateNo1}
                </div>
            )}
            {bus.routeDestName && (
                <div className="text-gray-700 dark:text-gray-300">
                    방향: {bus.routeDestName}
                </div>
            )}
            {bus.locationNo1 !== "" && (
                <div className="text-gray-700 dark:text-gray-300">
                    위치: {bus.locationNo1}번째 전 정류소
                </div>
            )}
            {bus.crowded1 && (
                <div className="text-gray-700 dark:text-gray-300">
                    혼잡도: {bus.crowded1}
                </div>
            )}
            {bus.stateCd1 !== undefined && (
                <div className="text-gray-700 dark:text-gray-300">
                    차량상태: {bus.stateCd1}
                </div>
            )}
            {bus.remainSeatCnt1 !== undefined && bus.remainSeatCnt1 !== -1 && (
                <div className="text-gray-700 dark:text-gray-300">
                    남은좌석: {bus.remainSeatCnt1}
                </div>
            )}

            {/* 진행바 */}
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 mt-2">
                <div
                    className="bg-blue-500 dark:bg-blue-400 h-3 rounded-full"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    );
}





// import React from "react";
//
// export default function BusCard({ bus }) {
//     const travelSec = 90; // 사무실 → 정류장 1분30초
//     const etaSec1 = bus.predictTime1 != null ? bus.predictTime1 * 60 - travelSec : null;
//     const etaSec2 = bus.predictTime2 != null ? bus.predictTime2 * 60 - travelSec : null;
//
//     // Progress Bar 계산 (0~100%)
//     let progress = 0;
//     if (etaSec1 != null) {
//         if (etaSec1 <= 0) progress = 100;
//         else if (etaSec1 >= 180) progress = 0;
//         else progress = Math.floor(((180 - etaSec1) / 180) * 100);
//     }
//
//     // 탑승 확률
//     let probability = "-";
//     if (etaSec1 != null) {
//         if (etaSec1 > 120) probability = "높음 (≈90%)";
//         else if (etaSec1 > 60) probability = "낮음 (≈50%)";
//         else probability = "거의 없음 (≈0%)";
//     }
//
//     // 운행 상태
//     const status = bus.flag === "RUN" || bus.flag === "PASS" ? "운행중" : "미운행중";
//
//     const label1 = etaSec1 == null ? "예정 정보 없음" : etaSec1 <= 0 ? "곧 도착" : `${Math.ceil(etaSec1 / 60)}분 후`;
//     const label2 = etaSec2 == null ? null : etaSec2 <= 0 ? "곧 도착" : `${Math.ceil(etaSec2 / 60)}분 후`;
//
//     // 혼잡도
//     const crowdedMap = { 1: "여유", 2: "보통", 3: "혼잡", 4: "매우혼잡" };
//     const crowdedText = bus.crowded1 ? crowdedMap[bus.crowded1] : null;
//
//     // 상태 코드
//     const stateCdMap = { 0: "교차로통과", 1: "정류소 도착", 2: "정류소 출발" };
//     const stateCdText = bus.stateCd1 != null ? stateCdMap[bus.stateCd1] : null;
//
//     // 남은 좌석
//     const remainSeat = bus.remainSeatCnt1 != null ? (bus.remainSeatCnt1 >= 0 ? bus.remainSeatCnt1 : "정보없음") : null;
//
//     return (
//         <div className="rounded-xl border bg-white p-4 shadow-sm flex flex-col md:flex-row justify-between gap-3">
//             <div className="flex-1">
//                 <div className="text-lg font-bold">{bus.routeName}</div>
//                 <div className="text-sm text-gray-600">종점: {bus.routeDestName}</div>
//                 <div className="text-xs text-gray-500">정류장 순서: {bus.staOrder}</div>
//                 <div className="text-xs mt-1">운행 상태: {status}</div>
//                 {bus.locationNo1 != null && <div className="text-xs mt-1">위치: {bus.locationNo1}번째 전 정류소</div>}
//                 {stateCdText && <div className="text-xs mt-1">상태: {stateCdText}</div>}
//                 {crowdedText && <div className="text-xs mt-1">혼잡도: {crowdedText}</div>}
//                 {remainSeat != null && <div className="text-xs mt-1">빈 자리: {remainSeat}</div>}
//             </div>
//
//             <div className="flex-1 text-right">
//                 <div className="text-base font-semibold">첫 번째 차량: {label1}</div>
//                 {label2 && <div className="text-sm text-gray-500">두 번째 차량: {label2}</div>}
//                 {probability !== "-" && <div className="text-sm text-gray-500 mt-1">탑승 확률: {probability}</div>}
//
//                 {/* Progress Bar */}
//                 {etaSec1 != null && (
//                     <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden mt-2">
//                         <div
//                             className={`h-3 ${progress > 60 ? "bg-green-500" : progress > 30 ? "bg-yellow-400" : "bg-red-500"}`}
//                             style={{ width: `${progress}%` }}
//                         />
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }
