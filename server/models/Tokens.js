const { v4: uuidv4 } = require("uuid");
const moment = require('moment'); 

const db = require("../db/connect");

class Token {
    constructor({ token_id, account_id, token, expiration_timestamp }) {
        this.token_id = token_id;
        this.account_id = account_id;
        this.token = token;
        this.expiration_timestamp=expiration_timestamp;
    }

    static async create(account_id) {
        const token = uuidv4();
        const expirationTimestamp = new Date();
        expirationTimestamp.setHours(expirationTimestamp.getHours() + 2); // 1 hour from now
        const response = await db.query("INSERT INTO tokens (account_id, token, expiration_timestamp) VALUES ($1, $2, $3) RETURNING token_id;", [account_id, token, expirationTimestamp]);
        const newId = response.rows[0].token_id;
        const newToken = await Token.getOneById(newId);
        return newToken;
    }
    

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM tokens WHERE token_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate token.");
        } else {
            return new Token(response.rows[0]);
        }
    }

    static async getOneByToken(token) {
        const response = await db.query("SELECT * FROM tokens WHERE token = $1", [token]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate token.");
        } else {
            return new Token(response.rows[0]);
        }
    }

    static async deleteExpiredTokens() {
        const currentTimestamp = moment().utcOffset('+01:00').format('YYYY-MM-DD HH:mm:ss');
        const timezoneOffset = moment().format('Z').replace(':', '');
        const formattedCurrentTimestamp = currentTimestamp + ' ' + timezoneOffset;
        const response = await db.query('DELETE FROM tokens WHERE expiration_timestamp <= $1', [formattedCurrentTimestamp]);
        
        if (response.rowCount === 0) {
            console.error("No expired tokens were deleted.");
        } else if (response.rowCount === 1) {
            return console.log(`Deleted ${response.rowCount} expired token.`);
        } else {
            return console.log(`Deleted ${response.rowCount} expired tokens`);
        }
    }

    async destroy() {
        const response = await db.query("DELETE FROM tokens WHERE token_id = $1 RETURNING *;", [this.token_id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to delete token.");
        } else {
            return new Token(response.rows[0]);
        }
    }

}

module.exports = Token;