export class Log {
    static d(...data: any[]) {
        console.log("INFO:", ...data);
    }

    static e(...data: any[]) {
        console.log("ERROR:", ...data);
    }

    static s(...data: any[]) {
        console.log("SUCCESS:", ...data);
    }
}