export interface IUserResponse {
    message: string
    username: string
    tokens: {
        refresh: string
        access: string
    }
}