export interface BusData {
    busId: string;
    routeVariant: string;
    deviationFromTimetable?: number;
}

export interface Organisation {
    organisation: string;
    date: string;
    busData: BusData[];
}

export interface BusServices {
    data: Organisation[];
}
