import { NextResponse } from "next/server";
import { ZodError } from "zod";

export class HTTPError extends Error {
    status: number;
    constructor(status: number, message: string) {
        super(message); 
        this.status = status;
    }
}

export class HTTPNotFoundError extends HTTPError {
    constructor(message: string) {
        super(404, message); 
    }
}

export class HTTPBadRequestError extends HTTPError {
    constructor(message: string) {
        super(400, message); 
    }
}

export class HTTPUnauthorizedError extends HTTPError {
    constructor(message: string) {
        super(401, message); 
    }
}

export class HTTPServerError extends HTTPError {
    constructor(message: string) {
        super(500, message); 
    }
}

export class HTTPForbiddenError extends HTTPError {
    constructor(message: string) {
        super(403, message); 
    }
}

export function withErrorHandler(handler: Function) {
    return async function (...args: any[]) {
        try {
            return await handler(...args);
        }
        catch (error) {
            if (error instanceof HTTPError) {
                return NextResponse.json({ error: error.message }, { status: error.status });
            }

            if (error instanceof ZodError) {
                return NextResponse.json({ errors: error.issues }, { status: 400 });
            }

            console.log(error)
            return NextResponse.json({ error: "Unknown server error" }, { status: 500 });
        }
    };
}