console.log("Javascript is loaded");

const getComics = async (id) => {
    try {
        let response = await fetch("/comics/" + id);
        if (response.status === 200) {
            response  = await response.json();
            updateContent(response);
        }
    } catch (e) {
        console.log(e.message)
    }
}

const getCurrentComic = () => {
    const pathName = window.location.pathname.replace("/", "");
    if (pathName !== "") {
        const currentComicId = parseInt(pathName);
        if (!isNaN(currentComicId) && (currentComicId >= 1 && currentComicId <= 2532)) {
            return currentComicId;
        }
    }
    return -1;
}

const startApplication = async () => {
    let currentComicId = getCurrentComic();
    if (currentComicId === -1) {
        currentComicId = 2532;
    }

    try {
        await getComics(currentComicId);
    } catch (e) {
        console.log(e.message);
    }
}

const updateContent = (data) => {
    document.getElementById("comicTitle").textContent = data.title;
    const date = `Date created at: ${new Date(data.year, data.month, data.day).toISOString().substring(0,10)}`
    document.getElementById("dateTag").textContent = date;
    document.getElementById("timesVisited").textContent = `Times visited: ${data.visited}`;
    document.getElementById("comicImage").src = data.img;
    window.history.pushState({}, null, "/" + data.num);
    const transcriptDiv = document.getElementById("transcriptContent");
    transcriptDiv.innerHTML = "";
    parseTranscript(data, transcriptDiv);
    updateButtons(data.num);
    document.getElementById("comicdiv").style.display = "block";
}

const updateButtons = (num) => {
    const prevButton = document.getElementById("prevbutton");
    const nextButton = document.getElementById("nextbutton");

    num === 1 ? prevButton.style.display = "none" : prevButton.style.display = "block";
    num === 2532 ? nextButton.style.display = "none" : nextButton.style.display = "block";
}

const parseTranscript = (data, transcriptDiv) => {
    const transcripts = data.transcript.split("\n");
    const noTranscript = document.getElementById("noTranscript");

    if (transcripts.length === 0 || data.transcript === "") {
        noTranscript.style.display = "block";
        transcriptDiv.style.display = "none";
    } else {
        noTranscript.style.display = "none";
        transcriptDiv.style.display = "block";
        transcripts.forEach(transcript => sanitizeTranscript(transcript, transcriptDiv));
    }
}

const sanitizeTranscript = (transcript, transcriptDiv) => {
    let parsedString = ""
    let element = null;
    if (transcript.substring(0,2) === "[[") {
        parsedString = transcript.substring(2, transcript.length -2);
        element = createSpan(parsedString);
    } else if (transcript.substring(0, 2) === "((") {
        parsedString = transcript.substring(2, transcript.length -2);
        element = createSpan(parsedString);
    } else if (transcript.substring(0, 2) === "<<") {
        parsedString = transcript.substring(2, transcript.length -2);
        element = createSpan(parsedString);
    } else if (transcript === "") {
        element = document.createElement("BR");
    } else if (transcript.substring(0, 2) === "{{") {
        parsedString = transcript.substring(2, transcript.length -2);
        element = createSpan(parsedString);
    } else {
        element = createSpan(transcript);
    }
    transcriptDiv.insertAdjacentElement("beforeend", element);
}

const createSpan = (data) => {
    const para = document.createElement("SPAN");
    para.innerHTML = data
    para.classList.add("transcriptSpan");
    return para;
}


const handlePrev = async () => {
    let currentComicId = getCurrentComic();
    try {
        await getComics(currentComicId - 1)
    } catch (e) {
        console.log(e.message);
    }
}

const handleRandom = async () => {
    try {
        await getComics("random");
    } catch (e) {
        console.log(e.message);
    }
}

const handleNext = async () => {
    let currentComicId = getCurrentComic();
    try {
        await getComics(currentComicId + 1);
    } catch (e) {
        console.log(e.message);
    }
}

startApplication()
    .then(resolve => console.log("resolved"))
    .catch(reject => console.log("rejected"));
