class PartModel {
    id: string;
    partId : string;
    englishName: string;
    chineseName: string;
    belongingEquipmentId: string;
    img: string;

    constructor (id: string, partId: string, englishName: string, 
        chineseName: string, belongingEquipmentId:string, img: string) {
            this.id = id;
            this.partId = partId;
            this.englishName = englishName;
            this.chineseName = chineseName;
            this.belongingEquipmentId = belongingEquipmentId;
            this.img = img;
    }
}

export default PartModel;