const axios = require("axios");

const comicsVisited = Array(2533).fill(0);

const getComicsStripe = async (req, res) => {
    const id = req.params.id;
    if (id >= 1 && id <=2532) {
        try {
            await sendResponse(req, res, id);
        } catch (e) {
            console.log(e);
        }
    } else {
        res.status(404).json({error: "Invalid id, ID range should be from  1 -> 2532"});
    }
}

const getRandomComicStripe = async (req, res) => {
    const randomNumber = getRandomNumber(1, 2532);
    try {
        await sendResponse(req, res, randomNumber);
    } catch (e) {
        console.log(e);
    }
}

const sendResponse = async (req, res, id) => {
    const url = `https://xkcd.com/${id}/info.0.json`;
    try {
        const response = await axios.get(url);
        comicsVisited[id]++;
        const data = {...response.data , visited: comicsVisited[id]};
        res.json(data);
    } catch (e) {
        res.status(500).json({error: "Something went wrong while fetching the comics"});
    }
}

const getRandomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
module.exports = {
    getComicsStripe,
    getRandomComicStripe,
}