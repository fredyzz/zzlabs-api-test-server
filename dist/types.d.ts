export interface User {
    id: number;
    name: string;
    email: string;
}
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    count?: number;
}
export interface WelcomeResponse {
    message: string;
    timestamp: string;
}
export interface MessageRequest {
    message: string;
    sender?: string;
}
export interface MessageData {
    id: number;
    message: string;
    sender: string;
    timestamp: string;
    status: 'received' | 'processing' | 'sent';
}
export interface UsersResponse extends ApiResponse<User[]> {
    count: number;
}
export interface MessageResponse extends ApiResponse<MessageData> {
}
//# sourceMappingURL=types.d.ts.map