const db = require("../db/connect");

class Post {     
    constructor({post_id, account_id, category, title, content, date, anonymous}) {
        this.post_id=post_id;
        this.account_id=account_id;
        this.category=category;
        this.title=title;
        this.content=content;
        this.date=date;
        this.anonymous=anonymous;
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM posts;");
        if (response.rows.length === 0) {
            throw new Error("No posts available.")
        }
        return response.rows.map(p => new Post(p));
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM posts WHERE post_id=$1;", [id]);

        if(response.rows.length === 0) {
            throw new Error("Unable to locate post.")
        }

        return new Post(response.rows[0]);
    }

    static async getByUser(id) {
        const response = await db.query("SELECT * FROM posts WHERE account_id=$1;", [id]);

        if(response.rows.length === 0) {
            throw new Error("Unable to locate posts.")
        }

        return response.rows.map(p => new Post(p));
    }

    static async create(data) {
        const { account_id, category, title, content, date, anonymous } = data;
        let response = await db.query("INSERT INTO posts (account_id, category, title, content, date, anonymous) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;", [account_id, category, title, content, date, anonymous]);
        return new Post(response.rows[0]);
    }

    async update(data) {
        const { title, content } = data;
        const response = await db.query("UPDATE posts SET title = $1, content = $2 WHERE post_id = $3 RETURNING *;",
            [ data.title, data.content, this.post_id ]);
        if (response.rows.length != 1) {
            throw new Error("Unable to update post.")
        }
        return new Post(response.rows[0]);
    }

    async destroy() {
        const response = await db.query("DELETE FROM posts WHERE post_id = $1 RETURNING *;", [this.post_id]);
        return new Post(response.rows[0]);
    }
   
}

module.exports=Post