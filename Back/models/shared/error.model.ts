export class ErrorObject {
    status: 'Not Found' | 'Bad Request' | 'Internal Server Error';
    message: string;

    constructor(status: 'Not Found' | 'Bad Request' | 'Internal Server Error', message: string) {
        this.status = status;
        this.message = message;
    }
};