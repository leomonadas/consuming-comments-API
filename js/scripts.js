const url = "https://jsonplaceholder.typicode.com/posts";
//Homepage
const loadingElement = document.getElementById("loading");
const postsContainer = document.getElementById("posts-container");

// Posts pages
const postPage = document.querySelector("#post");
const postContainer = document.querySelector("#post-container");
const commentscontainer = document.querySelector("#comments-container");

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
        const name = document.createElement("h2");
        const email = document.createElement("h3");
        const body = document.createElement("p");

        name.innerText = comment.name;
        email.innerText = comment.email;
        body.innerText = comment.body;

        commentscontainer.appendChild(name);
        commentscontainer.appendChild(email);
        commentscontainer.appendChild(body);
    })
}

if (!postId) {
    getAllPosts();
} else {
    getPost(postId);
}