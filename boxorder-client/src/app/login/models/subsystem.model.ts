export class Subsystem {
    id: number;
    name: string;
    version: string;

    constructor(id: number, name: string, version: string) {
        this.id = id;
        this.name = name;
        this.version = version;
    }
}