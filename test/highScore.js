import test from 'ava'
import request from 'supertest'
import app from '../src/app'


test('Get list of highScores', async t => {
    const highScoreToCreate = { name: 'Lilli Stevie', score: 33 }

    const creation = await request(app) //lets you call the route handlers like in real code
        .post('/highScore') //these two lines are just like creating a highScore with axios
        .send(highScoreToCreate)
        // 
    const res = await request(app) //getting the list of people to check
        .get('/highScore')

    t.is(res.status, 200)
    t.true(Array.isArray(res.body), 'Body should be an array')
    t.true(res.body.length > 0)
});

test('Create new highScore', async t => {
    const highScoreToCreate = { name: 'Lilli Stevie', score: 33 }
    console.log(highScoreToCreate)
    console.log(highScoreToCreate.name)

    const res = await request(app)
        .post('/highScore')
        .send(highScoreToCreate)

    t.is(res.status, 200)
    t.is(res.body.name, highScoreToCreate.name)
    t.is(res.body.score, highScoreToCreate.score)
})

test('Fetch a highScore', async t => {
    t.plan(2)

    const highScore = (await request(app)
            .post('/highScore')
            .send({ name: 'Lilli Stevie', score: 33 }))
        .body

    const fetch = await request(app)
        .get(`/highScore/${highScore.id}/json`)

    t.is(fetch.status, 200)
    t.deepEqual(fetch.body, highScore)
})

test('Delete a highScore', async t => {
    t.plan(3)

    const highScore = (await request(app)
            .post('/highScore')
            .send({ name: 'Lilli Stevie', score: 33 }))
        .body

    const del = await request(app)
        .delete(`/highScore/${highScore.id}`)

    t.is(del.status, 200)
    t.is(del.text, 'ok!')

    const fetch = await request(app)
        .get(`/highScore/${highScore.id}/json`)

    t.is(fetch.status, 404)
})

// test('Make friends with', async t => {
//     const highScore1 = (await request(app)
//             .post('/highScore')
//             .send({ name: 'Stevie Amirault', score: 33 }))
//         .body

//     const highScore2 = (await request(app)
//             .post('/highScore')
//             .send({ name: 'Lilli Baaske', score: 35 }))
//         .body

//     const makeFriends = (await request(app)
//         .post(`/highScore/${highScore1.id}/friends`)
//         .send({ targetId: highScore2.id }))

//     const updatedHighScore1 = (await request(app)
//             .get(`/highScore/${highScore1.id}/json`))
//         .body

//     t.deepEqual(updatedHighScore1.friends[0], highScore2)
// })