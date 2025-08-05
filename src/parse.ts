import { Metadata, Note, NoteType, Direction } from "./types";
function parseMetadata(lines: string[]): Metadata {
    const metadata: Metadata = {}
    for (const index in lines) {
        const line = lines[index]
        const line_sp: string[] = line.split(" ")
        const header: string = line_sp[0];
        // fuck you visual studio code shit 
        const values: string[] = line_sp.slice(1);


        switch (header) {
            case "VERSION":
                metadata.version = values[0];
                break;
            case "LEVEL":
                metadata.level = values[0];
                break;
            case "DIFFICULT":
                metadata.difficult = values[0];
                break;
            default:
                console.log(`Unknown Properties: ${header} | ${values.join(" | ")}`)
        }

    }
    return metadata
}
function parseNotes(lines: string[]): Note[] {
    const notes: Note[] = [];
    for (const index in lines) {
        const line = lines[index]
        const header: string = line.split(" ")[0];
        // fuck you visual studio code shit 
        const values: string[] = line.split(" ").slice(1);
        if (values.length <= 0) {
            continue;
        }

        const note: Note = {
            type: NoteType.Unknown,
            chunithm_type: "TAP",
            measure: 0,
            offset: 0,
            cell: 0,
            width: 0
        }
        note.measure = parseInt(values[0]);
        note.offset = parseInt(values[1]);
        note.cell = parseInt(values[2]);
        note.width = parseInt(values[3]);
        if (header == "CHR") {
            const CHR_Last = values[values.length - 1];
            if (CHR_Last == "UP" || CHR_Last == "CE" || CHR_Last == "CW") {
                note.type = NoteType.ExNote
                note.unknown = CHR_Last;
            } else {
                // HOLD
                note.duration = parseInt(CHR_Last);
            }
        } else if (header == "SLD" || header == "SLC") {
            note.type = NoteType.Slide
            note.duration = parseInt(values[4]);
            note.endcell = parseInt(values[5]);
            note.endwidth = parseInt(values[6]);
            note.chunithm_type = header
        } else if (header == "FLK") {
            note.type = NoteType.Flick
            note.unknown = values[4];
        } else if (header == "AIR" || "AUR" || "AUL") {
            note.type = NoteType.Air;
            note.targetNote = parseInt(values[4]);
            switch (header) {
                case "AUR":
                    note.direction = Direction.UpRight
                    break;
                case "AIR":
                    note.direction = Direction.Up
                    break;
                case "AUL":
                    note.direction = Direction.UpLeft
                    break;
                default:
                    note.direction = Direction.Unknown
                    break;
            }
        } else if (header == "AHD") {
            note.type = NoteType.AirHold;
            note.targetNote = parseInt(values[4]);
            note.duration = parseInt(values[5]);
        } else if (header == "ADW" || header == "ADL" || header == "ADR") {
            note.type = NoteType.Downward
            switch (header) {
                case "ADW":
                    note.direction = Direction.Down
                    break;
                case "ADL":
                    note.direction = Direction.DownLeft
                    break;
                case "ADR":
                    note.direction = Direction.DownRight
                    break;
                default:
                    note.direction = Direction.Unknown
                    break;
            }
        } else if (header == "MNE") {
            note.type = NoteType.Mine
        } else {
            note.type = NoteType.Unknown
            console.log(`Fuck you  ${header} ${values.join(" ")}`)
        }
        notes.push(note)
    }
    return notes;
}
const split_c2s = (string: String) => {
    const score: string[] = []
    const metadata: string[] = []
    for (const line of string.split("\n")) {
        const datas: string[] = line.split("\t")
        if (datas[0].length > 3) {
            metadata.push(datas.join(" "))
        } else {
            score.push(datas.join(" "))
        }
    }
    return {
        score: score,
        metadata: metadata
    }
}
export function parse(string: string) {
    const lines = split_c2s(string);

    const metadata = parseMetadata(lines.metadata);

    const notes = parseNotes(lines.score);

    return {
        metadata,
        notes
    }

}