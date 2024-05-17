const express = require('express');
const mongoose = require('mongoose');
const BooksSchema = require('./model')

const app = express()

app.use(express.json())

mongoose.connect('mongodb+srv://loki:loki@cluster0.zark761.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=> console.log('DB Connected...')).catch((e)=> console.log(e))

app.listen('3000', () => console.log('Server Running....'))

// post movie route
app.post('/addbook', async(req, res)=>{
    const {name, img, summary} = req.body;
    try {
        const newData = new BooksSchema({
            name,
            img,
            summary
        })
        await newData.save();
        return res.status(201).send('book posted successfully');
    } catch (err) {
        res.status(400).send(err)
    }
})

// get all books route

app.get('/books', async(req, res)=>{
    try {
        const books = await BooksSchema.find();
        return res.status(200).json(books);
    } catch (error) {
        res.status(500).send(err)
    }
})

// get single book route

app.get('/books/:id', async(req, res)=>{
    const {id} = req.params;
    try {
        const book = await BooksSchema.findById(id);
        return res.status(200).json(book);
    } catch (err) {
        res.status(501).send(err)
    }
})

// update book route

app.put('/books/:id', async(req, res)=>{
    const {id} = req.params
    const{name, img, summary} = req.body
    try {
        await BooksSchema.findOneAndUpdate({_id:id},{
            $set:{
                name,
                img,
                summary
            }
        });
        return res.status(200).send('book updated')
    } catch (err) {
        res.status(400).send(err)
    }
})

// delete book api route

app.delete('/books/:id', async(req, res)=>{
    const {id} = req.params;
    try {
        await BooksSchema.findByIdAndDelete(id)
    return res.status(200).send('book deleted successfully')
    } catch (err) {
        res.status(500).send(err)
    }
})