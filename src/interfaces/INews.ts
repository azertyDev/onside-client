import { IImage } from "./IImage";

export interface INews {
    id:number;
    ruTitle: string;
    uzTitle: string;
    title:string;
    ruDescription:string;
    uzDescription: string;
    description:string;
    ruRichText: string;
    uzRichText: string;
    richText:string;
    images: IImage[];
    image: string;
    img: string;
    createdAt: string;
}
