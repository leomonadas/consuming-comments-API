const url = "https://jsonplaceholder.typicode.com/posts";

//Homepage
const loadingElement = document.getElementById("loading");
const postsContainer = document.getElementById("posts-container");

// Posts pages
const postPage = document.querySelector("#post");
const postContainer = document.querySelector("#post-container");
const commentscontainer = document.querySelector("#comments-container");

// Get forms dat
const commentForm = document.querySelector("#comment-form");
const emailInput = document.querySelector("#email");
const bodyInput = document.querySelector("#body");

// Get id from url
const urlSearchParams = new URLSearchParams(window.location.search);
const postId = urlSearchParams.get("id");


// Get all posts
async function getAllPosts(){
    const response = await fetch(url);

    console.log(response);

    const data = await response.json();

    loadingElement.classList.add('hide');

    data.map((post) => {
        const div = document.createElement("div");
        const title = document.createElement("h2");
        const body = document.createElement("p");
        const link = document.createElement("a");

        title.innerText = post.title;
        body.innerText = post.body;
        link.innerText = "Ler";
        link.setAttribute("href", `/post.html?id=${post.id}`);

        div.appendChild(title);
        div.appendChild(body);
        div.appendChild(link);

        postsContainer.appendChild(div);
    })
}

// Get individual post
async function getPost(id) {
    const [responsePost, responseComments] = await Promise.all ([
        fetch(`${url}/${id}`),
        fetch(`${url}/${id}/comments`)
    ])

    const dataPost = await responsePost.json();
    const dataComments = await responseComments.json();

    console.log(dataComments)

    loadingElement.classList.add("hide");
    postPage.classList.remove("hide");

    const title = document.createElement("h1");
    const body = document.createElement("p");

    title.innerText = dataPost.title;
    body.innerText = dataPost.body;

    postsContainer.appendChild(title);
    postsContainer.appendChild(body);

    //Comments section
    dataComments.map((comment) => {
        createComment(comment);
    });
}

function createComment(comment) {
    const div = document.createElement("div");
    const name = document.createElement("h2");
    const email = document.createElement("h3");
    const body = document.createElement("p");

    name.innerText = comment.name;
    email.innerText = comment.email;
    body.innerText = comment.body;

    div.appendChild(name);
    div.appendChild(email);
    div.appendChild(body);

    commentscontainer.appendChild(div);
}

//Post a comment
async function postComment(comment) {
    const response = await fetch(`${url}/${postId}/comments`, {
        method: "POST",
        body: comment,
        headers: {
            "Content-type": "application/json",
        },
    });

    const data = await response.json();

    createComment(data);
}

if (!postId) {
    getAllPosts();
} else {
    getPost(postId);

    //Add event to coment form
    commentForm.addEventListener("submit", (e) => {
        e.preventDefault();

        let comment = {
            email: emailInput.value,
            body: bodyInput.value,
        };

        comment = JSON.stringify(comment);

        postComment(comment);
    })
}