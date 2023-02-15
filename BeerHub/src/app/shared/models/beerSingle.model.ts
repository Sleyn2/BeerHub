export class BeerSingleModel {
    public id: number;
    public name: string;
    public abv: number;
    public ibu: number;
    public ebc: number;
    public srm: number;
    public ph: number;
    public first_brewed: string;
    public tagline: string;
    public image_url: string;
    public description: string;
    public brewers_tips: string;
    public food_pairing: string[];
    public volume: volumeModel;
}

export class volumeModel {
    public unit: string;
    public value: number;
}