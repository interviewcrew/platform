const apiHost: string = process.env.JUDGE0_API_HOST ?? ""

const headers = {
    "content-type": "application/json",
    "Content-Type": "application/json",
    "X-RapidAPI-Key": process.env.JUDGE0_RAPID_API_KEY ?? "",
    "X-RapidAPI-Host": process.env.JUDGE0_RAPID_API_HOST ?? "",
};

const postRequest = async (path: string, data: object) => fetch(apiHost + path, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
});

const getRequest = async (path: string) => fetch(apiHost + path, {
    method: "GET",
    headers: headers,
    cache: "no-store"
});

const pathWithParams = (path: string, params?: object) => {
    if (params == null || Object.keys(params).length == 0) {
        return path
    }

    return path + "?" + Object.entries(params).map(([k, v]) => `${k}=${v}`).join("&")
}

export async function createSubmission({
    code,
    languageId
}: {
    code: string;
    languageId: number;
}): Promise<SUBMISSION_CREATION_RESPONSE> {
    const path = pathWithParams("/submissions", {
        base64_encoded: 'true',
    })

    const data = {
        language_id: languageId,
        source_code: btoa(code),
    };

    const response = await postRequest(path, data);

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`There was an error with status code ${response.status}: ${text}`)
    }

    return response.json();
}

export interface SUBMISSION_CREATION_RESPONSE {
    token: string,
}

export async function getSubmissionResult(token: string): Promise<SUBMISSION_RESULT_RESPONSE> {
    const path = pathWithParams(`/submissions/${token}`, {
        base64_encoded: 'true',
        // fields: '*'
    })

    const response = await getRequest(path);

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`There was an error with status code ${response.status}: ${text}`)
    }

    return response.json();
}

export interface SUBMISSION_RESULT_RESPONSE {
    stdout: string | null,
    time: string | null,
    memory: string | null,
    stderr: string | null,
    token: string,
    compile_output: string | null,
    message: string | null,
    status: SUBMISSION_STATUS,
}

export const submissionStatuses = [
    { id: 1, description: "In Queue" },
    { id: 2, description: "Processing" },
    { id: 3, description: "Accepted" },
    { id: 4, description: "Wrong Answer" },
    { id: 5, description: "Time Limit Exceeded" },
    { id: 6, description: "Compilation Error" },
    { id: 7, description: "Runtime Error (SIGSEGV)" },
    { id: 8, description: "Runtime Error (SIGXFSZ)" },
    { id: 9, description: "Runtime Error (SIGFPE)" },
    { id: 10, description: "Runtime Error (SIGABRT)" },
    { id: 11, description: "Runtime Error (NZEC)" },
    { id: 12, description: "Runtime Error (Other)" },
    { id: 13, description: "Internal Error" },
    { id: 14, description: "Exec Format Error" },
] as const

export const initialState: SUBMISSION_RESULT_RESPONSE = {
    stdout: null,
    time: null,
    memory: null,
    stderr: null,
    token: '',
    compile_output: null,
    message: null,
    status: { id: 1, description: 'In Queue' }
} as const

export const submissionStatusGroups: {
    waiting: readonly SUBMISSION_STATUS[],
    success: readonly SUBMISSION_STATUS[],
    failed: readonly SUBMISSION_STATUS[],
    error: readonly SUBMISSION_STATUS[],
} = {
    waiting: [
        { id: 1, description: "In Queue" },
        { id: 2, description: "Processing" },
    ],
    success: [
        { id: 3, description: "Accepted" },
    ],
    failed: [
        { id: 4, description: "Wrong Answer" },
        { id: 5, description: "Time Limit Exceeded" },
    ],
    error: [
        { id: 6, description: "Compilation Error" },
        { id: 7, description: "Runtime Error (SIGSEGV)" },
        { id: 8, description: "Runtime Error (SIGXFSZ)" },
        { id: 9, description: "Runtime Error (SIGFPE)" },
        { id: 10, description: "Runtime Error (SIGABRT)" },
        { id: 11, description: "Runtime Error (NZEC)" },
        { id: 12, description: "Runtime Error (Other)" },
        { id: 13, description: "Internal Error" },
        { id: 14, description: "Exec Format Error" },
    ]
} as const

export const isWaiting = (result: SUBMISSION_RESULT_RESPONSE) =>
    submissionStatusGroups.waiting.map(s => s.id).includes(result.status.id)

export type SUBMISSION_STATUS = typeof submissionStatuses[number]
