const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  const { title, content } = req.body;
  try {
    const post = await Post.create({ title, content, author: req.userId });
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getPosts = async (req, res) => {
  const posts = await Post.find().populate('author', 'username');
  res.json(posts);
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username');
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch {
    res.status(400).json({ error: 'Invalid ID' });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post || post.author.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    await post.save();

    res.json(post);
  } catch {
    res.status(400).json({ error: 'Invalid request' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post || post.author.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await post.remove();
    res.json({ message: 'Post deleted' });
  } catch {
    res.status(400).json({ error: 'Invalid request' });
  }
};
