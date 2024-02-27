export declare enum OrderEnum {
    ACTIVE = "active",
    INACTIVE = "inactive",
    DELETED = "deleted"
}
export declare class CreateOrderDto {
    title: string;
    description: string;
    status: OrderEnum;
    estimate: number;
}
export declare class GetOrderDto {
    id: number;
    title: string;
    description: string;
    status: OrderEnum;
    estimate: number;
    created_at: Date;
}
export declare class UpdateOrderDto {
    title: string;
    description: string;
    status: OrderEnum;
    estimate: number;
}
