// @ts-nocheck
const url = document.querySelector(".url_box");
const btn_get = document.querySelector(".btn_get");
const btn_post = document.querySelector(".btn_post");
const btn_update = document.querySelector(".btn_update");
const btn_delete = document.querySelector(".btn_delete");
const body_parser = document.querySelector("#body-parser");
const body_parser_data = document.querySelector("#body-parser-data");
const len = document.querySelector(".len");
const response = document.querySelector(".response");

btn_get.addEventListener("click", function () {
    get_call(url.value)
})
btn_post.addEventListener("click", function () {
    post_call(url.value)
})
btn_update.addEventListener("click", function () {
    update_call(url.value)
})
btn_delete.addEventListener("click", function () {
    delete_call(url.value)
})

body_parser.addEventListener("click", function () {
    if (!body_parser.checked) {
        body_parser_data.style.display = "none"
    } else {
        body_parser_data.style.display = "block"
    }
})

// @ts-ignore
async function get_call(url) {
    if (url) {
        axios.get(url).then(data => {
            // @ts-ignore
            var json = JSON.stringify(data.data, undefined, 2)
            len.innerHTML = (data.data.length == undefined) ? "" : "length : " + data.data.length
            response.textContent = json
        }).catch(err => {
            len.innerHTML = "Error"
            response.innerHTML = err.message
        })
    } else {
        len.innerHTML = "Invalid URL"
        response.innerHTML = ""
    }
    // @ts-ignore
}

async function post_call(url) {
    if (url) {
        try {
            let parseData = JSON.parse(body_parser_data.value);
            axios.post(url, parseData).then(res => {
                len.innerHTML = "Success"
                response.innerHTML = JSON.stringify(res.data, undefined, 2);
            }).catch(err => {
                len.innerHTML = "Error"
                response.innerHTML = err
            })
        } catch (Error) {
            len.innerHTML = "Error"
            response.innerHTML = Error
        }
    } else {
        len.innerHTML = "Invalid URL"
        response.innerHTML = ""
    }
}
async function update_call(url) {
    if (url) {
        try {
            let parseData = JSON.parse(body_parser_data.value);
            axios.put(url, parseData).then(res => {
                len.innerHTML = "Updated"
                response.innerHTML = JSON.stringify(res.data, undefined, 2);
            }).catch(err => {
                len.innerHTML = "Error"
                response.innerHTML = err
            })
        } catch (Error) {
            len.innerHTML = "Error"
            response.innerHTML = Error
        }
    } else {
        len.innerHTML = "Invalid URL"
        response.innerHTML = ""
    }
}
async function delete_call(url) {
    if (url) {
        try {
            axios.delete(url).then(res => {
                len.innerHTML = "Deleted"
                response.innerHTML = JSON.stringify(res.data, undefined, 2);
            }).catch(err => {
                len.innerHTML = "Error"
                response.innerHTML = err
            })
        } catch (Error) {
            len.innerHTML = "Error"
            response.innerHTML = Error
        }
    } else {
        len.innerHTML = "Invalid URL"
        response.innerHTML = ""
    }
}

