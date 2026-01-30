const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/blogdb')
  .then(() => console.log('Połączono z MongoDB'))
  .catch(err => console.error('Błąd połączenia z MongoDB:', err));

const PostSchema = new mongoose.Schema({
  title: String,
  text: String,
  image: String,
  date: { type: Date, default: Date.now },
  likes: { type: [String], default: [] },
  likesCount: { type: Number, default: 0 },
  views: { type: Number, default: 0 }
});
const Post = mongoose.model('Post', PostSchema);

const UserSchema = new mongoose.Schema({
  login: { type: String, required: true },
  password: { type: String, required: true },
  name: String,
  email: String
});
const User = mongoose.model('User', UserSchema);

app.get('/api/posts', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const filter = req.query.filter || '';

    const query = filter ? {
      $or: [
        { title: { $regex: filter, $options: 'i' } },
        { text: { $regex: filter, $options: 'i' } }
      ]
    } : {};

    const totalPosts = await Post.countDocuments(query);

    const posts = await Post.find(query)
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      posts: posts,
      totalPosts: totalPosts,
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      post.views = (post.views || 0) + 1;
      await post.save();
    }
    res.json(post);
  } catch (err) {
    res.status(404).json({ error: 'Post nie znaleziony' });
  }
});

app.post('/api/posts', async (req, res) => {
  try {
    const { title, text, image } = req.body;
    const newPost = new Post({
      title: title,
      text: text,
      image: image
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/user/auth', async (req, res) => {
  const { login, password } = req.body;
  const user = await User.findOne({ login: login, password: password });

  if (user) {
    res.json({ token: 'fake-jwt-token-123456789' });
  } else {
    res.status(401).json({ error: 'Błędny login lub hasło' });
  }
});

app.post('/api/user/create', async (req, res) => {
  try {
    const newUser = new User(req.body);
    newUser.login = req.body.email;
    await newUser.save();
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/user/logout/:id', (req, res) => {
  res.status(200).json({ message: 'Wylogowano' });
});

app.post('/api/posts/:id/like', async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.body.userId || '1';

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post nie znaleziony' });
    }

    if (post.likes.includes(userId)) {
      return res.status(400).json({ error: 'Post już polubiony' });
    }

    post.likes.push(userId);
    post.likesCount = post.likes.length;
    await post.save();

    res.json({
      message: 'Post polubiony',
      likesCount: post.likesCount,
      likes: post.likes
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/posts/:id/like', async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.body.userId || '1';

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post nie znaleziony' });
    }

    if (!post.likes.includes(userId)) {
      return res.status(400).json({ error: 'Post nie był polubiony' });
    }

    post.likes = post.likes.filter(id => id !== userId);
    post.likesCount = post.likes.length;
    await post.save();

    res.json({
      message: 'Like usunięty',
      likesCount: post.likesCount,
      likes: post.likes
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/migrate-views', async (req, res) => {
  try {
    const result = await Post.updateMany(
      { views: { $exists: false } },
      { $set: { views: 0 } }
    );
    res.json({
      message: 'Views migration completed',
      modifiedCount: result.modifiedCount
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/migrate-likes', async (req, res) => {
  try {
    const result = await Post.updateMany(
      { likes: { $exists: false } },
      {
        $set: {
          likes: [],
          likesCount: 0
        }
      }
    );
    res.json({
      message: 'Migration completed',
      modifiedCount: result.modifiedCount
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serwer backendowy działa na porcie ${PORT}`);
});