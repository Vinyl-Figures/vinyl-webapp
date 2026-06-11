import { Vinyl } from "../../model/Vinyl"

/**
 * Client de comunicação com o servidor para operações relacionadas à loja, como listar produtos, 
 * buscar produtos por texto ou categoria e listar categorias de produtos.
 */
export class VinylClient {

    constructor() {
        this.baseUrl = 'https://vinyl-store-api/store'
    }

    /**
     * Método para listar os produtos disponíveis na loja, realizando uma requisição POST para o endpoint /products
     * @returns {Promise<Vinyl[]>} lista de objetos Vinyl contendo as informações dos produtos disponíveis na loja
     * @throws Erro com mensagem amigável caso a resposta do servidor seja inválida ou a atualização falhe
     */
    async listProduct() {
        const endpoint = `${this.baseUrl}/products`

        const response = await fetch(
            endpoint,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )

        if (response.ok) {
            const data = await response.json()

            if (data.status === 'success') {
                return this.getListOfProductsFromJson(data.products)
            } else {
                throw new Error(data.message)
            }
        } else {
            throw new Error('Erro ao consultar servidor, tente novamente.')
        }
    }

    /**
     * Método para buscar produtos na loja com base em um texto de busca, realizando uma 
     * requisição GET para o endpoint /products com o parâmetro searchText
     * @param {string} searchText 
     * @returns {Promise<Vinyl[]>} lista de objetos Vinyl contendo as informações dos produtos que correspondem ao texto de busca
     * @throws Erro com mensagem amigável caso a resposta do servidor seja inválida ou a atualização falhe
     */
    async searchProducts(searchText) {
        const endpoint = `${this.baseUrl}/products?searchText=${encodeURIComponent(searchText)}`

        const response = await fetch(endpoint)

        if (response.ok) {
            const data = await response.json()

            if (data.status === 'success') {
                return this.getListOfProductsFromJson(data.products)
            } else {
                throw new Error(data.message)
            }
        } else {
            throw new Error('Erro ao consultar servidor, tente novamente.')
        }
    }

    /**
     * Método para buscar produtos na loja com base em uma categoria específica, realizando 
     * uma requisição GET para o endpoint /products com o parâmetro category
     * @param {string} category 
     * @returns {Promise<Vinyl[]>} lista de objetos Vinyl contendo as informações dos produtos que pertencem à categoria especificada
     * @throws Erro com mensagem amigável caso a resposta do servidor seja inválida ou a atualização falhe
     */
    async searchProductsByCategory(category) {
        const endpoint = `${this.baseUrl}/products?category=${encodeURIComponent(category)}`

        const response = await fetch(endpoint)

        if (response.ok) {
            const data = await response.json()

            if (data.status === 'success') {
                return this.getListOfProductsFromJson(data.products)
            } else {
                throw new Error(data.message)
            }
        } else {
            throw new Error('Erro ao consultar servidor, tente novamente.')
        }
    }

    /**
     * Método para listar as categorias de produtos disponíveis na loja, realizando uma requisição GET para o endpoint /categories
     * @returns {Promise<string[]>} lista de categorias de produtos disponíveis na loja
     * @throws Erro com mensagem amigável caso a resposta do servidor seja inválida ou a atualização falhe
     */
    async listProductsCategories() {
        const endpoint = `${this.baseUrl}/categories`

        const response = await fetch(endpoint)

        if (response.ok) {
            const data = await response.json()

            if (data.status === 'success') {
                return data.categories
            } else {
                throw new Error(data.message)
            }
        } else {
            throw new Error('Erro ao consultar servidor, tente novamente.')
        }
    }

    /**
     * Utilitário para converter uma lista de dicionários (JSON) em uma lista de objetos do tipo Vinyl.
     * @param {Array<Object>} listOfDictionaries 
     * @returns {Vinyl[]} lista de objetos do tipo Vinyl
     */
    getListOfProductsFromJson(listOfDictionaries) {
        return listOfDictionaries.map(product => new Vinyl(
            product.id,
            product.title,
            product.realeased_at,
            product.description,
            product.price,
            product.artists,
            product.genre,
            product.image_url
        ))
    }
}