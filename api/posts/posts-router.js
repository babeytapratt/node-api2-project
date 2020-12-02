const express = require('express');
const Post = require('../../data/db')

const router = express.Router();

// this one comes first, os it will swallow requests
// to get /api/posts
router.get('/', (req, res) => {
    // 1- pull stuff from req
    const { query } = req
    // 2- interact with db
    Post.find(query)
    .then(posts => {
        // 3A- respond appr (happy path)
        res.json(posts)
    })
    .catch(error => {
        // 3B- respond appr (sad path)
        console.log(error.message)
        res.json(error.message)
    })
});

// this comes second and will never be used
router.get('/', async (req, res) => {
    const { query } = req
    try {
        const posts = await Post.find(query)
        res.json(posts)
    } catch (error) {
        res.json(error.message)
    }
})

router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if (post) {
                res.status(200).json(posts);
            } else {
                res.status(404).json({ message: 'The post with the specified ID does not exist.' })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'The posts information could not be retrieved.' })
        });
});

router.get('/:id/comments', (req, res) => {
    Post.findPostComments(req.params.id)
        .then(comments => {
            if (comments.length < 0) {
                res.status(200).json(comments);
            } else {
                res.status(404).json({ message: 'The post with the specified ID does not exist.' })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'The comments information could not be retrieved.' })
        });
});

router.post('/', (req, res) => {
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({ message: 'Please provide title and contents for the post.' })
    }
    Post.add(req.body)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'There was an error while saving the post to the database' })
        })
})

router.delete('/:id', (req, res) => {
    Post.remove(req.params.id)
        .then(count =>  {
           if (count > 0 )  {
               res.status(200).json({ message: 'The post has been deleted' });
           } else {
               res.status(404).json({ message: 'The post with the specified ID does not exist.' })
           }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'The post could not be removed'})
        })
})

router.put('/:id', (req, res) => {
    const changes = req.body;
    Post.update(req.params.id, changes)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: 'The post with the specified ID does not exist.' })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'The post information could not be modified.'})
        });
});

module.exports = router
