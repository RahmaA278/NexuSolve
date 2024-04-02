const Post = require("../models/Posts");

async function index (req, res) {
    try {
        const posts = await Post.getAll();
        res.status(200).json(posts);
    } catch(e) {
        res.status(500).json({error: e.message})
    }
}

async function show (req, res) {
    try {
        let id = req.params.id;
        const post = await Post.getOneById(id);
        res.status(200).json(post)
    } catch(e) {
        res.status(404).json({error: e.message})
    }
}

async function showAll (req, res) {
    try {
        let id = req.params.id;
        const posts = await Post.getByUser(id);
        res.status(200).json(posts);
    } catch(e) {
        res.status(500).json({error: e.message})
    }
}

async function create (req, res) {
    try {
        const data = req.body;
        const newPost = await Post.create(data);
        res.status(201).json(newPost);
    } catch(e) {
        res.status(400).json({error: e.message});
    }
}

async function update (req, res) {
    try {
        const id = req.params.id;
        const data = req.body;
        const post = await Post.getOneById(id);
        const result = await post.update(data);
        res.status(200).json(result);
    } catch (e) {
        res.status(404).json({error: e.message})
    }
}

async function destroy (req, res) {
    try {
        const id = req.params.id;
        const post = await Post.getOneById(id);
        const result = await post.destroy();
        res.status(204).end();
    } catch (e) {
        res.status(404).json({error: e.message})
    }
};

module.exports={ index, show, showAll, create, update, destroy }