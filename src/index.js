
function main() {
  console.log("Page loaded"); 
  displayPosts();
  addNewPostListener();
}

document.addEventListener("DOMContentLoaded", main);

function displayPosts() {
  fetch("http://localhost:3000/posts")
    .then((res) => res.json())
    .then((posts) => {
      const postList = document.getElementById("post-list");
      postList.innerHTML = ""; 

      posts.forEach((post) => {
        const postItem = document.createElement("div");
        postItem.textContent = post.title;
        postItem.style.cursor = "pointer";
        postItem.style.padding = "5px 0";
        postItem.addEventListener("click", () => handlePostClick(post.id));
        postList.appendChild(postItem);
      });
    })
    .catch((err) => console.error("Error loading posts:", err));
}

function addNewPostListener() {
  const form = document.getElementById("new-post-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = form.title.value.trim();
    const content = form.content.value.trim();
    const author = form.author.value.trim();

    if (!title || !content || !author) {
      alert("Please fill out all fields");
      return;
    }

    const newPost = {
      title,
      content,
      author
    };

    fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newPost)
    })
      .then((res) => res.json())
      .then((createdPost) => {
        
        displayPosts();
        form.reset();
      })
      .catch((err) => console.error("Error creating post:", err));
  });
}
