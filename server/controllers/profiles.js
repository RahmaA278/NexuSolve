const bcrypt = require('bcrypt');
const cron = require('node-cron');

const Profile = require("../models/Profiles");
const Token = require("../models/Tokens");

async function index(req, res) {
    try {
        const profiles = await Profile.getAll();
        res.status(200).json(profiles);
    } catch(e) {
        res.status(500).json({error: e.message})
    }
}

async function show (req, res) {
    try {
        let id = req.params.id;
        const profile = await Profile.getOneById(id);
        res.status(200).json(profile)
    } catch(e) {
        res.status(404).json({error: e.message})
    }
}

async function register (req, res) {
    try {
        const data = req.body;
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
        data["password"] = await bcrypt.hash(data["password"], salt);
        
        const result = await Profile.create(data);

        res.status(201).send(result);
    } catch (e) {
        res.status(400).json({"error": e.message})
    }
};

async function update (req, res) {
    try {
        const id = req.params.id;
        const data = req.body;

        const profile = await Profile.getOneById(id);
        const currentPassword = profile.password

        if (data["password"] !== undefined) {
            const oldPassword = data["oldPassword"];
            const isOldPasswordCorrect = await bcrypt.compare(oldPassword, currentPassword);
            if (!isOldPasswordCorrect) {
                alert("The current password you entered is incorrect.");
                return;
            }
            const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
            data["password"] = await bcrypt.hash(data["password"], salt);
        }

        const result = await profile.update(data);
        res.status(200).json(result);
    } catch (e) {
        res.status(404).json({error: e.message})
    }
}

async function destroy (req, res) {
    try {
        const id = req.params.id;
        const profile = await Profile.getOneById(id);
        const result = await profile.destroy();
        res.status(204).end();
    } catch (e) {
        res.status(404).json({error: e.message})
    }
};

async function login (req, res) {
    const data = req.body;

    try {
        const profile = await Profile.getOneByEmail(data.email);
        const authenticated = await bcrypt.compare(data.password, profile["password"]);

        if (!authenticated) {
            throw new Error("Incorrect credentials.")
        } else {
            const token = await Token.create(profile.account_id);
            res.status(200).json({authenticated: true, token: token.token});
        }
    } catch (e) {
        res.status(403).json({"error": e.message})
    }
}

async function token (req, res) {
    try {
        let tokenCode = req.params.token;
        const token = await Token.getOneByToken(tokenCode);
        res.status(200).json(token)
    } catch(e) {
        res.status(404).json({error: e.message})
    }
}

async function logout (req, res) {
    try {
        let tokenCode = req.params.token;
        const token = await Token.getOneByToken(tokenCode);
        const result = await token.destroy();
        res.status(204).end();
    } catch (e) {
        res.status(404).json({error: e.message})
    }
}

cron.schedule('0 * * * *', async () => {
    try {
    await Token.deleteExpiredTokens();
    console.log('Expired tokens deleted successfully.');
    } catch (error) {
    console.error('Error deleting expired tokens:', error);
    }
    try {
    await Profile.deleteExpiredImageUrls();
    console.log('Expired image urls deleted successfully.');
    } catch (error) {
    console.error('Error deleting expired image urls:', error);
    }
});

module.exports={ index, show, register, update, destroy, login, token, logout }