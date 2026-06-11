
/**
 * Modelo que representa um pedido realizado por um usuário, contendo informações como id do pedido,
 *  id do usuário, lista de produtos, preço total e data de criação.
 */
export class Order {

    constructor(id, userId, products, totalPrice, createdAt) {
        this.id = id;
        this.userId = userId;
        this.products = products;
        this.totalPrice = totalPrice;
        this.createdAt = createdAt;
    }

}