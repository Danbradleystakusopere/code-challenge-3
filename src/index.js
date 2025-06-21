
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

