import { AxiosPromise } from "axios"
import { http } from "./http"

export type AuthResponse = {
    id: string,
    name: string,
    email: string,
    token: string
}
export type Credential = {
    username: string,
    password: string,
    remember: boolean
}
class AuthServiceImpl {
    async signIn(username: string, password: string): AxiosPromise<AuthResponse> {
      const credential: Credential = { username, password, remember: false }
      return http.post('/login', credential)
    }
  
    // async changePassword(userId: number, newPassword: string): AxiosPromise {
    //   return http.patch(`/v1/clientes/usuario/change-password?id=${userId}`, {
    //     password: newPassword
    //   })
    // }
  }
  
  export const AuthService = new AuthServiceImpl()