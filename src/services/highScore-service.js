const fs = require('fs')
const highScoreModel = require('../models/highScore_model')

// const dbPath = `${__dirname}/../database.json`//do not need, because dont use file anymore


async function findAll() {
    return highScoreModel.find().populate('team')

}

async function add(highScore) {
    return highScoreModel.create(highScore)
}

async function del(id) {
    return highScoreModel.remove({ id }) // = id: highScoreId
}

async function find(id) {
    return highScoreModel.findOne({ id }).populate('team')
        //whenever mongoose finds an object in my friends list, go and fetch the details of my friends


}



module.exports = {
    findAll,
    find,
    add,
    del
}