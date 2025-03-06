// Họ & Tên : Nguyễn Văn Phong
// MSSV     : 2180607874

const SERVER = "http://localhost:3000";

//--------------------------------------------------CREATE--------------------------------------------------//

// Create a new POST
async function createPOST(title, author, isPublished, views) {
   const response = await fetch(SERVER + "/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author, isPublished, views }),
   });
   await updateAuthorPostCount(author, 1);
   return response;
}

// Create a new AUTHOR
async function createAUTHOR(name) {
   const response = await fetch(SERVER + "/authors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, postCount: 0 }),
   });
   return response;
}

//--------------------------------------------------READ--------------------------------------------------//

// Get POSTS list
async function getPOSTS() {
   const response = await fetch(SERVER + "/posts");
   const data = (await response.json()).filter(
      (post) => post.isDeleted !== true
   );
   displayPOSTS(data);
   return data;
}

// Get AUTHORS list
async function getAUTHORS() {
   const response = await fetch(SERVER + "/authors");
   const data = (await response.json()).filter(
      (post) => post.isDeleted !== true
   );
   getNameOfAUTHORS(data);
   displayAUTHORS(data);
   return data;
}

//--------------------------------------------------UPDATE--------------------------------------------------//

// Update AUTHOR post count
async function updateAuthorPostCount(authorName, updateValue) {
   const authorResponse = await fetch(`${SERVER}/authors`);
   const authors = await authorResponse.json();
   const author = authors.find((a) => a.name === authorName && !a.isDeleted);

   const updatedPostCount = (author.postCount || 0) + updateValue;
   return await fetch(`${SERVER}/authors/${author.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postCount: updatedPostCount }),
   });
}

// Update a POST
async function updatePOST(postId, updatedData) {
   const currentPostResponse = await fetch(`${SERVER}/posts/${postId}`);
   const currentPost = await currentPostResponse.json();

   if (updatedData.author && updatedData.author !== currentPost.author) {
      await updateAuthorPostCount(currentPost.author, -1);
      await updateAuthorPostCount(updatedData.author, 1);
   }

   const response = await fetch(`${SERVER}/posts/${postId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
   });

   await getPOSTS();
   return response;
}

// Update an AUTHOR
async function updateAUTHOR(authorId, newName) {
   const authors = await (await fetch(SERVER + "/authors")).json();
   const author = authors.find((a) => a.id === authorId && !a.isDeleted);

   if (author) {
      const oldName = author.name;
      await fetch(`${SERVER}/authors/${authorId}`, {
         method: "PATCH",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ name: newName }),
      });

      // Update author name in all POSTS
      const posts = await (await fetch(SERVER + "/posts")).json();
      const authorPosts = posts.filter(
         (post) => post.author === oldName && !post.isDeleted
      );

      for (const post of authorPosts) {
         await fetch(`${SERVER}/posts/${post.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ author: newName }),
         });
      }
   }
}

//--------------------------------------------------DELETE--------------------------------------------------//

// Delete a POST
async function deletePOST(postId) {
   const posts = await (await fetch(SERVER + "/posts")).json();
   const post = posts.find((p) => p.id === postId && !p.isDeleted);

   if (post) {
      await fetch(`${SERVER}/posts/${postId}`, {
         method: "PATCH",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ isDeleted: true }),
      });
      await updateAuthorPostCount(post.author, -1);
   }
}

// Delete an AUTHOR
async function deleteAUTHOR(authorId) {
   const authors = await (await fetch(SERVER + "/authors")).json();
   const author = authors.find((a) => a.id === authorId && !a.isDeleted);

   if (author) {
      await fetch(`${SERVER}/authors/${authorId}`, {
         method: "PATCH",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ isDeleted: true }),
      });

      // Delete all POSTS of the author
      const posts = await (await fetch(SERVER + "/posts")).json();
      const authorPosts = posts.filter(
         (p) => p.author === author.name && !p.isDeleted
      );
      for (const post of authorPosts) {
         await fetch(`${SERVER}/posts/${post.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isDeleted: true }),
         });
      }
   }
}

//--------------------------------------------------ACTION--------------------------------------------------//

// Display POSTS list
function displayPOSTS(posts) {
   const tbody = document.getElementById("post-table");
   const template = document.getElementById("post-template");
   tbody.innerHTML = "";
   posts.forEach((post) => {
      const row = template.content.cloneNode(true);
      row.querySelector(".post-id").textContent = post.id;
      row.querySelector(".post-title").textContent = post.title;
      row.querySelector(".post-views").textContent = post.views;
      row.querySelector(".post-author").textContent = post.author;
      row.querySelector(".post-published").textContent = post.isPublished
         ? "Yes"
         : "No";
      const deleteBtn = row.querySelector(".delete-btn");
      if (deleteBtn) {
         deleteBtn.setAttribute("data-id", post.id);
      }

      const editBtn = row.querySelector(".edit-btn");
      if (editBtn) {
         editBtn.setAttribute("data-id", post.id);
         editBtn.addEventListener("click", editPOSTHandler);
      }
      tbody.appendChild(row);
   });
}

// Display AUTHORS list
function displayAUTHORS(authors) {
   const tbody = document.getElementById("author-table");
   const template = document.getElementById("author-template");
   tbody.innerHTML = "";
   authors.forEach((author) => {
      const row = template.content.cloneNode(true);
      row.querySelector(".author-id").textContent = author.id;
      row.querySelector(".author-name").textContent = author.name;
      row.querySelector(".author-post-count").textContent = author.postCount;
      const deleteBtn = row.querySelector(".delete-btn");
      if (deleteBtn) {
         deleteBtn.setAttribute("data-id", author.id);
      }
      const editBtn = row.querySelector(".edit-btn");
      if (editBtn) {
         editBtn.addEventListener("click", editAUTHORHandler);
      }
      tbody.appendChild(row);
   });
}

// Create a new AUTHOR
function handleCreateAUTHOR(event) {
   event.preventDefault();
   const authorName = document.getElementById("authorName").value.trim();
   if (authorName) {
      createAUTHOR(authorName).then(() => {
         document.getElementById("authorName").value = "";
      });
   }
}

// Get AUTHORS name
function getNameOfAUTHORS(authors) {
   const select = document.getElementById("authorSelect");
   select.innerHTML = '<option value="">Select an author</option>';
   authors.forEach((author) => {
      const option = document.createElement("option");
      option.value = author.name;
      option.textContent = author.name;
      select.appendChild(option);
   });
}

// Create a new POST
function handleCreatePOST(event) {
   event.preventDefault();

   const title = document.getElementById("title").value.trim();
   const views = parseInt(document.getElementById("views").value);
   const author = document.getElementById("authorSelect").value;
   const isPublished = document.getElementById("isPublished").checked;

   if (title && author) {
      createPOST(title, author, isPublished, views)
         .then(() => {
            document.getElementById("postForm").reset();
            document.getElementById("authorSelect").value = "";
         })
         .catch((error) => console.error("Error creating post:", error));
   }
}

// Delete a POST
function deletePOSTHandler(event) {
   const postId = event.target.getAttribute("data-id");
   if (postId && confirm("Are you sure you want to delete this post?")) {
      deletePOST(postId);
   }
}

// Delete an AUTHOR
function deleteAUTHORHandler(event) {
   const authorId = event.target.getAttribute("data-id");
   if (authorId && confirm("Are you sure you want to delete this author?")) {
      deleteAUTHOR(authorId).catch((error) =>
         console.error("Error deleting author:", error)
      );
   }
}

// Edit an AUTHOR
function editAUTHORHandler(event) {
   const authorRow = event.target.closest("tr");
   const authorId = authorRow.querySelector(".author-id").textContent;
   const authorName = authorRow.querySelector(".author-name").textContent;

   const newName = prompt("Nhập tên mới cho tác giả:", authorName);
   if (newName && newName.trim() !== "") {
      updateAUTHOR(authorId, newName).then(() => getAUTHORS());
   }
}

// Edit a POST
function editPOSTHandler(event) {
   const postRow = event.target.closest("tr");
   const postId = postRow.querySelector(".post-id").textContent;

   const updatedData = {
      title: prompt(
         "Enter new title:",
         postRow.querySelector(".post-title").textContent
      )?.trim(),
      views: parseInt(
         prompt(
            "Enter new views:",
            postRow.querySelector(".post-views").textContent
         )
      ),
      author: prompt(
         "Enter new author:",
         postRow.querySelector(".post-author").textContent
      )?.trim(),
      isPublished: confirm("Is this post published?"),
   };

   updatePOST(postId, updatedData);
}

document.addEventListener("DOMContentLoaded", () => {
   getPOSTS();
   getAUTHORS();
});
