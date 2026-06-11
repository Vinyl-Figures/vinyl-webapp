
/**
 * Modelo que representa um usuário do sistema, 
 * contendo informações como id, nome, email, senha e opções de acessibilidade.
 */
export class User {
    
    /**
     * Contrutor completo do modelo User, que recebe todas as informações do usuário, incluindo email e senha.
     * 
     * @param {number} id 
     * @param {string} name 
     * @param {string} email 
     * @param {string} password 
     * @param {list[string]} accessibilityOptions 
     */
    constructor(id, name, email, password, accessibilityOptions) {
        this.id = id
        this.name = name
        this.email = email
        this.password = password
        this.accessibilityOptions = accessibilityOptions
    }

    /**
     * Construtor simplificado do modelo User, que recebe apenas as informações essenciais do usuário, sem email e senha.
     * 
     * @param {number} id 
     * @param {string} name 
     * @param {list[string]} accessibilityOptions 
     */
    constructor(id, name, accessibilityOptions) {
        this.id = id
        this.name = name
        this.accessibilityOptions = accessibilityOptions
    }
    
}