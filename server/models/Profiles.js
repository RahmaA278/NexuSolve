const db = require("../db/connect");

class Profile {
    constructor({account_id, first_name, last_name, display_name, email, image_path, password}) {
        this.account_id=account_id;
        this.first_name=first_name;
        this.last_name=last_name;
        this.display_name=display_name;
        this.email=email;
        this.image_path=image_path;
        this.password=password;
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM profiles;");
        if (response.rows.length === 0) {
            throw new Error("No profiles available.")
        }
        return response.rows.map(p => new Profile(p));
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM profiles WHERE account_id=$1;", [id]);

        if(response.rows.length === 0) {
            throw new Error("Unable to locate profile.")
        }

        return new Profile(response.rows[0]);
    }

    static async getOneByEmail(email) {
        const response = await db.query("SELECT * FROM profiles WHERE email=$1;", [email]);

        if(response.rows.length === 0) {
            throw new Error("Unable to locate profile.")
        }

        return new Profile(response.rows[0]);
    }

    static async create(data) {
        const { first_name, last_name, display_name, email, image_path, password } = data;

        const existingProfile = await db.query("SELECT * FROM profiles WHERE email = $1", [email]);
        if (existingProfile.rows.length > 0) {
            throw new Error("Email already exists");
        }

        let response = await db.query("INSERT INTO profiles (first_name, last_name, display_name, email, image_path, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;", [first_name, last_name, display_name, email, image_path, password]);
        
        return new Profile(response.rows[0]);
    }

    async update(imagePath) {
        const response = await db.query("UPDATE profiles SET image_path = $1 WHERE account_id = $2 RETURNING *;",
            [ imagePath, this.account_id ]);
        if (response.rows.length != 1) {
            throw new Error("Unable to update image.")
        }
        return new Profile(response.rows[0]);
    }

    async destroy() {
        const response = await db.query("DELETE FROM profiles WHERE account_id = $1 RETURNING *;", [this.account_id]);
        return new Profile(response.rows[0]);
    }
   
}

module.exports=Profile