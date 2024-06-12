class RecordModel {
    id: number;
    time: Date;
    worker: string;
    startDate: Date;
    endDate: Date;
    maintenanceContent: string;
    result: boolean;
    replacementParts?: Record<string, number>;
    maintenanceEquipmentId: string;

    constructor (id: number, time: Date, worker: string, startDate: Date, 
        endDate: Date, maintenanceContent: string, result: boolean, 
        replacementParts: Record<string, number>, maintenanceEquipmentId: string) {
            this.id = id;
            this.time = time;
            this.worker = worker;
            this.startDate = startDate;
            this.endDate = endDate;
            this.maintenanceContent = maintenanceContent;
            this.result = result;
            this.replacementParts = replacementParts;
            this.maintenanceEquipmentId = maintenanceEquipmentId;
    }
}

export default RecordModel;