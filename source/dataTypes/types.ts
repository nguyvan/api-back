import { Request } from 'express';

declare namespace DataType {
    interface UserDataRequest extends Request {
        email?: string;
        token?: string;
    }
    interface JustifyRequest extends Request {
        email?: string;
        output?: string;
    }

    type User = {
        email: string;
        pwd: string;
        last_session: string;
        limit: number;
    }

    type Data = {
        users: User[]
    }
}


export default DataType;