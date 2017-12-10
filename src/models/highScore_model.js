// module.exports = class HighScore {
//     constructor(id, name, age, score) {
//         this.id = id
//         this.name = name
//         this.age = age || 0
//         this.score = score || 0
//     }

//     static create(highScore) {
//         return new HighScore(highScore.id, highScore.name, highScore.age, highScore.score);
//     }
// }
//*********** */

const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const HighScoreSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
            // minlength: 3,
    },
    score: {
        type: Number,
        required: true,
        default: 0
    },
    // team: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'highScore' //here you can create relationships between anmimals, furniture, kings etc.
    // }],
    create_date: {
        type: Date,
        default: Date.now
    }
})
HighScoreSchema.plugin(AutoIncrement, { inc_field: 'id' })
module.exports = mongoose.model('highScore', HighScoreSchema)