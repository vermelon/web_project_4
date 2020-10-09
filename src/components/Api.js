export default class Api {
    constructor (options) {
        this.url = options.baseUrl;
        this.authorization = options.headers.authorization;
    }


getInitialCards() {
    return fetch(this.url+"cards", {
        headers: {
            authorization: this.authorization
        }
    })
    .then(res=> {
        if (res.ok) {

            return res.json()
        }
        return Promise.reject(`Error: ${res.status}`)
    })
    }

getUserInfo(){
    return fetch(this.url+"users/me", {
        headers:{
            authorization: this.authorization
        }
    })
    .then(res=> {
        if (res.ok) {
           
            return res.json()
        }
        return Promise.reject(`Error: ${res.status}`)
    })
    }

updateUserInfo(newName, newAbout){
    return fetch(this.url+"users/me", {
        method: "PATCH",
        headers: {
            authorization: this.authorization,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: newName,
            about: newAbout
        })
    })
    .then(res=> {
            if (res.ok) {
               
                return res.json()
            }
            return Promise.reject(`Error: ${res.status}`)
        })
    }

postNewCard(title, imageLink) {
        return fetch(this.url+"cards", {
            method: "POST",
            headers: {
                authorization: this.authorization,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: title,
                link: imageLink
            })
        })
        .then(res=> {
                if (res.ok) {
                   
                    return res.json()
                }
                return Promise.reject(`Error: ${res.status}`)
            })
    
}    

deleteCard(id)    {
    return fetch(this.url+"cards"+ "/" + id, {
    method: "DELETE",
    headers: {
        authorization: this.authorization,
        "Content-Type": "application/json"
    },
})
.then(res=> {
        if (res.ok) {
           
            return res.json()
        }
        return Promise.reject(`Error: ${res.status}`)
    })

}    

addLike(id, isLiked) {
    const method = isLiked ? "DELETE" : "PUT";
    return fetch(this.url+"cards/likes/"+id, {
        method: method,
        headers:{
            authorization: this.authorization
        }
    })
    .then(res=> {
        if (res.ok) {
           
            return res.json()
        }
        return Promise.reject(`Error: ${res.status}`)
    })
    }

updateAvatar(avatarUrl) {
    return fetch(this.url+"users/me/avatar", {
        method: "PATCH",
        headers: {
            authorization: this.authorization,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            avatar:avatarUrl
        })
        
    })
    .then(res=> {
            if (res.ok) {
               
                return res.json()
            }
            return Promise.reject(`Error: ${res.status}`)
        })
}     

}    



