const http = new XMLHttpRequest();
const api = 'https://api.pluralkit.me/v1';

//gets system from discord id
async function getSystem (id) {
    let url = `${api}/a/${id}/`
    result = await newRequest(url)
    return JSON.parse(result)
}

//gets members from system id
async function getMembers (id) {
    let url = `${api}/s/${id}/members`
    console.log(url)
    result = await newRequest(url)
    return JSON.parse(result)
}

//creates a new request
function newRequest (url) {

    //send request
    http.open('GET', url)
    http.send()

    //create httpState promise that resolves on completion
    let httpState = new Promise((resolved, rejected) => {
        http.onreadystatechange = (e) => {
            if(http.readyState >= 4 && http.status==200) {
                resolved(http.response);
            }
        }
    })
    return httpState.then((response) => {return response}, (error) => {logError(error)})
}

//log any errors
function logError (error) {
    console.log(`API Wrapper Error: ${error}`)
}