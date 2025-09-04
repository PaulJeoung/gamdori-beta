import React from "react";
import BusCard from "../components/BusCard.jsx";

export default function BusList({ busList }) {
    return (
        <div className="p-4 grid gap-4
                    grid-cols-1   /* 모바일: 1열 */
                    sm:grid-cols-1
                    md:grid-cols-2  /* 태블릿: 2열 */
                    lg:grid-cols-3  /* 데스크톱: 3열 */
                    xl:grid-cols-4  /* 큰 화면: 4열 */
                    ">
            {busList.map((bus) => (
                <BusCard key={bus.routeId + "_" + bus.vehId1} bus={bus} />
            ))}
        </div>
    );
}
