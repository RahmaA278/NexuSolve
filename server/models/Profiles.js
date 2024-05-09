const db = require("../db/connect");

class Profile {
    constructor({account_id, first_name, last_name, display_name, email, image_name, image_url, image_url_expiration, password}) {
        this.account_id=account_id;
        this.first_name=first_name;
        this.last_name=last_name;
        this.display_name=display_name;
        this.email=email;
        this.image_name=image_name;
        this.image_url=image_url;
        this.image_url_expiration=image_url_expiration;
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
        const { first_name, last_name, display_name, email, password } = data;
        const existingProfile = await db.query("SELECT * FROM profiles WHERE email = $1", [email]);
        if (existingProfile.rows.length > 0) {
            throw new Error("Email already exists");
        }

        let response = await db.query("INSERT INTO profiles (first_name, last_name, display_name, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *;", [first_name, last_name, display_name, email, password]);
        
        return new Profile(response.rows[0]);
    }

    static async deleteExpiredImageUrls() {
        const currentTimestamp = moment().utcOffset('+01:00').format('YYYY-MM-DD HH:mm:ss');
        const timezoneOffset = moment().format('Z').replace(':', '');
        const formattedCurrentTimestamp = currentTimestamp + ' ' + timezoneOffset;
        const response = await db.query('UPDATE profiles SET image_url = NULL WHERE image_url_expiration <= $1', [formattedCurrentTimestamp]);
        
        if (response.rowCount === 0) {
            console.error("No expired image urls were deleted.");
        } else if (response.rowCount === 1) {
            return console.log(`Deleted ${response.rowCount} expired image url.`);
        } else {
            return console.log(`Deleted ${response.rowCount} expired image urls`);
        }
    }

    async update(data) {
        const { display_name, email, image_name, image_url, image_url_expiration, password } = data;
        const updates = [];
    
        if (display_name !== undefined) {
            updates.push(`display_name = ${display_name !== null ? `'${display_name}'` : 'null'}`);
        }
        if (email !== undefined) {
            updates.push(`email = ${email !== null ? `'${email}'` : `${null}`}`);
        }
        if (image_name !== undefined) {
            updates.push(`image_name = ${image_name !== null ? `'${image_name}'` : `${null}`}`);
        }
        if (image_url !== undefined) {
            updates.push(`image_url = ${image_url !== null ? `'${image_url}'` : `${null}`}`);
        }
        if (image_url_expiration !== undefined) {
            updates.push(`image_url_expiration = ${image_url_expiration !== null ? `'${image_url_expiration}'` : 'null'}`);
        }
        if (password !== undefined) {
            updates.push(`password = ${password !== null ? `'${password}'` : `${null}`}`);
        }
    
        if (updates.length === 0) {
            throw new Error("No fields to update.");
        }
    
        const response = await db.query(`UPDATE profiles SET ${updates.join(', ')} WHERE account_id = $1 RETURNING *;`, [ this.account_id ]);
        if (response.rows.length !== 1) {
            throw new Error("Unable to update profile.")
        }
        return new Profile(response.rows[0]);
    }
    
    async destroy() {
        const response = await db.query("DELETE FROM profiles WHERE account_id = $1 RETURNING *;", [this.account_id]);
        return new Profile(response.rows[0]);
    }
   
}

module.exports=Profile