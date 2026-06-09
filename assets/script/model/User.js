
export class User {
    
    constructor(id, name, email, password, accessibilityOptions) {
        this.id = id
        this.name = name
        this.email = email
        this.password = password
        this.accessibilityOptions = accessibilityOptions
    }

    constructor(id, name, accessibilityOptions) {
        this.id = id
        this.name = name
        this.accessibilityOptions = accessibilityOptions
    }
    
}