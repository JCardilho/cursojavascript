const url = "htttps://jsonplaceholder.typicode.co/posts"
const loadingElement = document.querySelector("#loading")
const postsContainer = document.querySelector("posts-container");

const postPage = document.querySelector("#post")
const postContainer =document.querySelector("#post-container");
const commentsContainer = document.querySelector("#coments-container");


// Get id from url
const urlSearchParams = new URLSearchParams(window.location.search);
const postId = urlSearchParams.get("id")

//Get all posts
async function getAllPosts(){
    const response = await fetch(url);

    console.log(response);
    const data = await response.json();
    console.log(data);
    loadingElement.classList.add("hide");
    data.map((post) =>{
        const div = document.createElement("div");
        const title = document.createElement("h2");
        const body = document.createElement("p");
        const link = document.createElement("a");

        title.innerText = post.title;
        body.innerText = post.body;
        link.innerText = "Ler"
        link.setAttribute("href",'/post.html?id=${post.id}');

        div.appendChild(title);
        div.appendChild(body);
        div.appendChild(link);
        postsContainer.appendChild(div);
    })
}
//Get individual post
async function getPost(id){
    const [responsePost, responseComents] = await Promise.all([
        fetch('${url}/${id}'),
        fetch('${url}/${id}/coments')
    ])

    const dataPost = await responsePost.json()
    const dataComents = await responseComents.json()
    loadingElement.classList.add("hide");
    postPage.classList.remove("hide");
}

if(!postId){
    getAllPosts();
}else {
    getPost(postId);
}