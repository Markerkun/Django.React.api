export interface IUserRegistration {
    username: string
    first_name: string | null
    last_name: string | null
    email: string
    password: string
    confirm_password: string
    image: File
}