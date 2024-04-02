const Comment = require("../models/Comments");

async function index (req, res) {
    try {
        const comments = await Comment.getAll();
        res.status(200).json(comments);
    } catch(e) {
        res.status(500).json({error: e.message})
    }
}

async function show (req, res) {
    try {
        let id = req.params.id;
        const comment = await Comment.getOneById(id);
        res.status(200).json(comment)
    } catch(e) {
        res.status(404).json({error: e.message})
    }
}

async function showAllByUser (req, res) {
    try {
        let id = req.params.id;
        const comments = await Comment.getByUser(id);
        res.status(200).json(comments);
    } catch(e) {
        res.status(500).json({error: e.message})
    }
}

async function showAllByPost (req, res) {
    try {
        let id = req.params.id;
        const comments = await Comment.getByPost(id);
        res.status(200).json(comments);
    } catch(e) {
        res.status(500).json({error: e.message})
    }
}

async function create (req, res) {
    try {
        const data = req.body;
        const newComment = await Comment.create(data);
        res.status(201).json(newComment);
    } catch(e) {
        res.status(400).json({error: e.message});
    }
}

async function update (req, res) {
    try {
        const id = req.params.id;
        const data = req.body;
        const comment = await Comment.getOneById(id);
        const result = await comment.update(data);
        res.status(200).json(result);
    } catch (e) {
        res.status(404).json({error: e.message})
    }
}

async function destroy (req, res) {
    try {
        const id = req.params.id;
        const comment = await Comment.getOneById(id);
        const result = await comment.destroy();
        res.status(204).end();
    } catch (e) {
        res.status(404).json({error: e.message})
    }
};

module.exports={ index, show, showAllByUser, showAllByPost, create, update, destroy }