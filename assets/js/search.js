//search (called when button pressed)
async function search () {
    const id = document.getElementById('idSearch').value;
    const sysInfo = document.getElementById('sysInfo')

    //check if input is only numbers
    if(id.match(/^\d+$/) != null) {
        
        //get system
        getSystem(id).then(result => {
            sysInfo.hidden = false;
            sysInfo.style.display = 'block';
            console.log(result)

            //set system information
            if(result.name != null) addInfo('sysName', result.name)
            else clearInfo('sysName')
            if(result.avatar_url != null) addImage('sysIcon', result.avatar_url)
            else clearInfo('sysIcon')
            if(result.description != null) addInfo('sysDesc', result.description)
            else clearInfo('sysDesc')
            if(result.created != null) addInfo('sysCreated', result.created.substring(0,10))
            else clearInfo('sysDesc')

            //get members
            getMembers(result.id).then(result => {
                document.getElementById('members').innerHTML = ''
                console.log(result)
                for(i in result) {
                    let member = document.createElement('li')
                    
                    member.innerHTML += `<h3>${result[i].name}</h3>`;
                    
                    if(result[i].avatar_url) {member.innerHTML += `<br><img class='memberImg' src='${result[i].avatar_url}'>`}
                    else {member.innerHTML += `<br><img class='memberImg' src='./assets/images/noimg.png'>`};
                    
                    let desc = ''
                    let desc2 = ''
                    if(result[i].description) {
                        desc = result[i].description;
                        desc2 = desc.replace(/(?:\r\n|\r|\n)/g, "<br>");
                    } else {
                        desc2 = 'No description!'
                    }
                    member.innerHTML += `<br><p>Description:</p><p>${desc2}</p><br>`;
                    
                    document.getElementById('members').appendChild(member)
                }

            })
        })
        document.getElementById('idSearch').value = ''
    } else {
        console.log('Search returned an error.')
    }
}

//add info and show element
function addInfo (id, data) {
    let element = document.getElementById(id)
    if(element.hidden == true) element.hidden = false;
    if(element.parentElement.hidden == true) element.parentElement.hidden = false;
    element.innerHTML = data
}

//adds an image (instead of info)
function addImage (id, url) {
    console.log(url)
    let element = document.getElementById(id)
    if(element.hidden == true) element.hidden = false;
    element.src = url
}

//clear info and hide element
function clearInfo (id) {
    let element = document.getElementById(id)
    if(element.hidden == false) element.hidden = true;
    if(element.parentElement.hidden == false) element.parentElement.hidden = true;
    element.innerHTML = ''
}