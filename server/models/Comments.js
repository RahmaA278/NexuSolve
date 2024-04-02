const db = require("../db/connect");

class Comment {
    constructor({comment_id, account_id, post_id, content, date, anonymous}) {
        this.comment_id=comment_id;
        this.account_id=account_id;
        this.post_id=post_id;
        this.content=content;
        this.date=date;
        this.anonymous=anonymous;
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM comments;");
        if (response.rows.length === 0) {
            throw new Error("No comments available.")
        }
        return response.rows.map(c => new Comment(c));
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM comments WHERE comment_id=$1;", [id]);

        if(response.rows.length === 0) {
            throw new Error("Unable to locate comment.")
        }

        return new Comment(response.rows[0]);
    }

    static async getByUser(id) {
        const response = await db.query("SELECT * FROM comments WHERE account_id=$1;", [id]);

        if(response.rows.length === 0) {
            throw new Error("Unable to locate comments.")
        }

        return response.rows.map(c => new Comment(c));
    }

    static async getByPost(id) {
        const response = await db.query("SELECT * FROM comments WHERE post_id=$1;", [id]);

        if(response.rows.length === 0) {
            throw new Error("Unable to locate comments.")
        }

        return response.rows.map(c => new Comment(c));
    }

    static async create(data) {
        const { account_id, post_id, content, date, anonymous } = data;
        let response = await db.query("INSERT INTO comments (account_id, post_id, content, date, anonymous) VALUES ($1, $2, $3, $4, $5) RETURNING *;", [account_id, post_id, content, date, anonymous]);
        return new Comment(response.rows[0]);
    }

    async update(data) {
        const { content } = data;
        const response = await db.query("UPDATE comments SET content = $1 WHERE comment_id = $2 RETURNING *;",
            [ data.content, this.comment_id ]);
        if (response.rows.length != 1) {
            throw new Error("Unable to update comment.")
        }
        return new Comment(response.rows[0]);
    }

    async destroy() {
        const response = await db.query("DELETE FROM comments WHERE comment_id = $1 RETURNING *;", [this.comment_id]);
        return new Comment(response.rows[0]);
    }
   
}

module.exports=Comment