
export interface carType {
    p_name: string;
    p_price: number;
    p_stock: number;
    p_image: string;
    p_category: string;
    p_description: string;
}


export interface carFetchType extends carType {
    id: string;
}