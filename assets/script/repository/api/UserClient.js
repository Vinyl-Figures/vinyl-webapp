import User from '../model/User.js';

/**
 * Classe responsável por realizar as operações de autenticação do usuário, 
 * como login, cadastro e atualização das opções de acessibilidade.
 */
export class UserClient {

    constructor() {
        this.baseUrl = 'https://vinyl-store-api/user';
    }

    /**
     * Realiza a autenticação do usuário, enviando o email e senha para o servidor 
     * e recebendo os dados do usuário caso a autenticação seja bem-sucedida.
     * 
     * @param {string} email - O email digitado pelo usuário
     * @param {string} password - A senha digitada pelo usuário
     * @returns Objeto User populado com id, nome e opções de acessibilidade do usuário
     * 
     * @throws Erro com mensagem amigável caso a resposta do servidor seja inválida ou a autenticação falhe
     */
    async signIn(email, password) {
        const endpoint = `${this.baseUrl}/signin`

        const response = await fetch(
            endpoint,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        )

        if (response.ok) {
            const data = await response.json()

            if (data.status === 'success') {
                return new User(data.id, data.name, data.accessibility_options)

            } else {
                throw new Error(data.message)

            }

        } else {
            throw new Error('Erro ao consultar servidor, tente novamente.')

        }
    }

    /**
     * Realiza o cadastro do usuário, enviando o nome, email e senha para o servidor
     * 
     * @param {string} name - O nome digitado pelo usuário
     * @param {string} email - O email digitado pelo usuário
     * @param {string} password - A senha digitada pelo usuário
     * @returns Id gerado para o usuário recém cadastrado
     * 
     * @throws Erro com mensagem amigável caso a resposta do servidor seja inválida ou o cadastro falhe
     */
    async signUp(name, email, password) {
        const endpoint = `${this.baseUrl}/signup`

        const response = await fetch(
            endpoint,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            }
        )

        if (response.ok) {
            const data = await response.json()

            if (data.status === 'success') {
                return data.id

            } else {
                throw new Error(data.message)

            }

        } else {
            throw new Error('Erro ao consultar servidor, tente novamente.')

        }
    }

    /**
     * Atualiza as opções de acessibilidade do usuário, enviando o id do usuário 
     * e a lista de opções selecionadas para o servidor.
     * 
     * @param {number} userId - O id do usuário para o qual as opções de acessibilidade devem ser atualizadas
     * @param {list[string]} options - Lista de opções de acessibilidade selecionadas pelo usuário
     * @returns Sem retono
     * 
     * @throws Erro com mensagem amigável caso a resposta do servidor seja inválida ou a atualização falhe
     */
    async updateAcessibilityOptions(userId, options) {
        const endpoint = `${this.baseUrl}/accessibility-options?userId=${userId}?options=${JSON.stringify(options)}`

        const response = await fetch(endpoint)

        if (response.ok) {
            const data = await response.json()

            if (data.status === 'success') {
                return

            } else {
                throw new Error(data.message)

            }

        } else {
            throw new Error('Erro ao consultar servidor, tente novamente.')

        }
    }
}