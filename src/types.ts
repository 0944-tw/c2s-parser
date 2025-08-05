export enum NoteType {
    Tap = 1,
    ExNote = 2,
    Hold = 3,
    Slide = 4,
    Flick = 5,
    Air = 6,
    AirHold = 7,
    Downward = 8,
    Mine = 9,
    Unknown = 0,
}

export enum Direction {
    Up = "AIR",
    UpRight = "AUR",
    UpLeft = "AUL",
    Unknown = "UNK",
    Down = "ADW",
    DownRight = "ADR",
    DownLeft = "ADL"
}
export type Metadata = {
    version?: string
    level?: string
    difficult?: string
}

export type Note = {
    type: NoteType,
    chunithm_type: "TAP" | "CHR" | "SLD" | "SLC" | "FLK" | "AUR" | "AIR" | "AUL" | "AHD" | "ADW" | "ADR" | "ADL" | "MNE"
    measure: number
    offset: number
    cell: number
    width: number
    duration?: number
    endcell?: number
    endwidth?: number
    targetNote?: number
    unknown?: string
    direction?: string
}
export {}; 