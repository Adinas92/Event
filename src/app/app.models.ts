export interface User {
    id?: Number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    
}
export interface UserLogin {
    
    login: string;
    password: string;
}
