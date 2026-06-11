
/**
 * Modelo que representa um vinil, contendo informações como id, título, data de lançamento, descrição, 
 * preço, artistas, gênero e URL da imagem.
 */
export class Vinyl {

    /**
     * Contrutor do modelo Vinyl, que recebe todas as informações do vinil.
     * 
     * @param {number} id 
     * @param {string} title 
     * @param {date} realeased_at 
     * @param {string} description 
     * @param {number} price 
     * @param {list[string]} artists 
     * @param {string} genre 
     * @param {string} imageUrl 
     */
    constructor(id, title, realeased_at, description, price, artists, genre, imageUrl) {
        this.id = id;
        this.title = title;
        this.realeased_at = realeased_at;
        this.description = description;
        this.price = price;
        this.artists = artists;
        this.genre = genre;
        this.imageUrl = imageUrl;
    }

}