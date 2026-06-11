import { Order } from "../../model/Order"
import { Vinyl } from "../../model/Vinyl"

/**
 * Client de comunicação com o servidor para operações relacionadas aos pedidos,
 * como listar os pedidos de um usuário e salvar um novo pedido.
 */
export class OrderClient {

    constructor() {
        this.baseUrl = 'https://vinyl-store-api/order'
    }

    /**
     * Método para listar os pedidos de um usuário específico, realizando uma
     * requisição GET para o endpoint /list com o parâmetro userId.
     * @param {number|string} userId - O id do usuário dono dos pedidos
     * @returns {Promise<Order[]>} lista de objetos Order contendo as informações dos pedidos do usuário
     * @throws Erro com mensagem amigável caso a resposta do servidor seja inválida ou a busca falhe
     */
    async listOrder(userId) {
        const endpoint = `${this.baseUrl}/list?userId=${userId}`

        const response = await fetch(endpoint)

        if (response.ok) {
            const data = await response.json()

            if (data.status === 'success') {
                return this.getListOfOrdersFromJson(data.orders)
            } else {
                throw new Error(data.message)
            }
        } else {
            throw new Error('Erro ao consultar servidor, tente novamente.')
        }
    }

    /**
     * Realiza a criação e salvamento de um novo pedido para o usuário, enviando o
     * id do usuário e a lista de produtos via POST para o endpoint /save.
     * @param {number|string} userId - O id do usuário que está realizando o pedido
     * @param {Vinyl[]} products - Lista de objetos do tipo Vinyl que compõem o pedido
     * @returns {Promise<number|string>} Id gerado para o pedido recém criado
     * @throws Erro com mensagem amigável caso a resposta do servidor seja inválida ou o salvamento falhe
     */
    async saveOrder(userId, products) {
        const endpoint = `${this.baseUrl}/save`

        const response = await fetch(
            endpoint,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: userId,
                    products: products
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
     * Utilitário para converter uma lista de dicionários (JSON) em uma lista de objetos do tipo Order,
     * tratando também a conversão interna da lista de produtos para instâncias de Vinyl.
     * @param {Array<Object>} listOfDictionaries 
     * @returns {Order[]} lista de objetos do tipo Order
     */
    getListOfOrdersFromJson(listOfDictionaries) {
        return listOfDictionaries.map(order => {
            // Mapeia os produtos do pedido para instâncias de Vinyl (caso a API retorne os dados do produto em formato raw)
            const vinylProducts = order.products.map(product => new Vinyl(
                product.id,
                product.title,
                product.realeased_at,
                product.description,
                product.price,
                product.artists,
                product.genre,
                product.image_url
            ))

            return new Order(
                order.id,
                order.userId,
                vinylProducts,
                order.totalPrice,
                order.createdAt
            )
        })
    }
}