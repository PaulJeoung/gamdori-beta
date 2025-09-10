
export default function BusCard({ bus }) {
    // 운행 상태 처리 - 도착시간 유무와 flag 값에 따라 결정
    const statusText =
        bus.predictTime1 || bus.flag !== "PASS" || bus.flag === "RUN"
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
    const time = parseInt(bus.predictTime1) || 0;
    let progress = 0;
    if (time > 2) progress = 100;
    else if (time > 1) progress = 50;
    else progress = 10;

    // 탑승확률 색상 그라데이션 처리
    const progressColor =
        progress < 30 ? "bg-red-500" :
            progress < 70 ? "bg-yellow-500" :
                "bg-green-500";

    return (
        <div className="p-3 border rounded-lg bg-white dark:bg-gray-800 shadow transition-colors">
            <div className="flex justify-between items-center mb-2">
                <div className="font-bold text-base text-gray-900 dark:text-gray-100">
                    {bus.routeName}
                </div>
                <div className={`text-xs font-semibold flex items-center gap-1 ${statusColor}`}>
                    <span>{statusIcon}</span>
                    <span>{statusText}</span>
                </div>
            </div>

            <div className="flex justify-between">
                {/* 왼쪽 정보 영역 */}
                <div className="flex-1 text-sm">
                    <div className="mb-1 text-gray-800 dark:text-gray-200">
                        도착예상: {bus.predictTime1 ?? "-"}분
                    </div>
                    {bus.plateNo1 && (
                        <div className="text-gray-700 dark:text-gray-300 text-xs">
                            차량번호: {bus.plateNo1}
                        </div>
                    )}
                    {bus.routeDestName && (
                        <div className="text-gray-700 dark:text-gray-300 text-xs">
                            방향: {bus.routeDestName}
                        </div>
                    )}
                </div>

                {/* 오른쪽 정보 영역 */}
                <div className="flex-1 text-xs text-right">
                    {bus.locationNo1 !== "" && (
                        <div className="text-gray-700 dark:text-gray-300">
                            위치: {bus.locationNo1}번째 전
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
                </div>
            </div>

            {/* 진행바 - 탑승확률 표시 */}
            <div className="mt-2">
                <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-gray-700 dark:text-gray-300">탑승확률</span>
                    <span className="text-gray-700 dark:text-gray-300">{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                    <div
                        className={`${progressColor} h-2.5 rounded-full transition-all duration-300`}
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
}