console.log("Token Page")

const token = JSON.parse(localStorage.getItem("Current token"))
console.log(token);

const tok = document.getElementById('token')

for (const key in token) {
    tok.innerHTML += `<li><h2>${key} : ${token[key]}</h2></li>`
}