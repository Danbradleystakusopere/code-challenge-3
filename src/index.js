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
        postItem.className = "post-item";
        postItem.innerHTML = `
          <h3>${post.title}</h3>
          <p><strong>Author:</strong> ${post.author}</p>
          <button onclick="viewPost(${post.id})">View</button>
          <button onclick="editPost(${post.id})">Edit</button>
          <button onclick="deletePost(${post.id})">Delete</button>
        `;
        postList.appendChild(postItem);
      });
    })
    .catch((err) => console.error("Error loading posts:", err));
}

function viewPost(postId) {
  fetch(`http://localhost:3000/posts/${postId}`)
    .then((res) => res.json())
    .then((post) => {
      const detail = document.getElementById("post-detail");
      detail.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.content}</p>
        <p><strong>Author:</strong> ${post.author}</p>
      `;
    })
    .catch((err) => console.error("Error loading post detail:", err));
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

    const newPost = { title, content, author };

    fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newPost)
    })
      .then((res) => res.json())
      .then(() => {
        displayPosts();
        form.reset();
      })
      .catch((err) => console.error("Error creating post:", err));
  });
}

function deletePost(postId) {
  if (!confirm("Are you sure you want to delete this post?")) return;

  fetch(`http://localhost:3000/posts/${postId}`, {
    method: "DELETE"
  })
    .then(() => displayPosts())
    .catch((err) => console.error("Error deleting post:", err));
}

function editPost(postId) {
  fetch(`http://localhost:3000/posts/${postId}`)
    .then((res) => res.json())
    .then((post) => {
      const newTitle = prompt("Enter new title:", post.title);
      if (newTitle === null) return;

      const newContent = prompt("Enter new content:", post.content);
      if (newContent === null) return;

      const newAuthor = prompt("Enter new author:", post.author);
      if (newAuthor === null) return;

      const updatedPost = {
        title: newTitle,
        content: newContent,
        author: newAuthor
      };

      fetch(`http://localhost:3000/posts/${postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedPost)
      })
        .then(() => displayPosts())
        .catch((err) => console.error("Error updating post:", err));
    })
    .catch((err) => console.error("Error fetching post for edit:", err));
}
