
interface ApiResponseInterface<T = any> {
    success: boolean;
    statusCode: number;
    message?: string;
    data?: T;
}

export class ApiResponse<T = any> {
    success: boolean;
    statusCode: number;
    message?: string;
    data?: T;

    constructor(data: ApiResponseInterface) {
        this.success = data.success;
        this.statusCode = data.statusCode;
        this.data = data.data;
        this.message = data.message;
    }
}

export interface ApiInterface<T = any> {
    statusCode: number;
    message?: string;
    data?: T;
}

export class SuccessResponse<T = any> extends ApiResponse<T> {
    constructor(data: ApiInterface) {
        super({ success: true, statusCode: data.statusCode, data: data.data, message: data.message });
    }
}

export class ErrorResponse<T = any> extends ApiResponse<T> {

    constructor(data: ApiInterface) {
        super({ success: false, statusCode: data.statusCode, data: data.data, message: data.message });
    }
}