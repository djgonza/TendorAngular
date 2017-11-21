export class Token {
    
    private token: String

    Token (token: String) {
        this.token = token;
    }

    setToken (token: String): void {
        this.token = token;
    }

    getToken (): String {
        return this.token;
    }

}