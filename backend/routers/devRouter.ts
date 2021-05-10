// import db connection and models
import express from 'express';
import 'dotenv/config';

export const devRouter = express.Router();
devRouter.use(express.urlencoded({ extended: true }));
devRouter.use(express.json());

// @dev: downloading a file on frontend that's stored on backend, see also frontend/component/Download
import path from 'path';
devRouter.get('/download', (req, res) => {
    res.download(path.resolve(__dirname, '../dev/wrts/excel-list-kanji-1-30..json'));
})

// @example: updating nested properties works like this. going for found.content = found.content.map(...) has proven troublesome. Maybe I just nested things wrong though
// List.findOne({owner: 'seerden', name: 'Kanji 1-30'}, (err, found) => {
//     for (let term of found.content) {
//         term.saturation = {forwards: null, backwards: null}
//         for (let i = 0; i < term.history.length; i++) {
//             term.history[i].direction = "forwards"
//         }
//     }

//     // console.log(found.content[0].history);
//     // found.save()
// })

// List.findOne({owner: 'a', name: 'Test'}, (err, found) => {
//     console.log(found.content[0].history);
// })