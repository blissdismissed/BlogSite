const loadCommentsButtonElement = document.getElementById("load-comments-btn");
const commentsSectionElement = document.getElementById("comments");
const commentsFormElement = document.querySelector("#comments-form form");
const commentTitleElement = document.getElementById("title");
const commentTextElement = document.getElementById("text");

function createCommentsList(comments) {
  const commentListElement = document.createElement("ol");

  for (const comment of comments) {
    const commentElement = document.createElement("li");
    commentElement.innerHTML = `
      <article class="comment-item">
        <h2>${comment.title}</h2>
        <p>${comment.text}</p>
      </article>
      `;
    commentListElement.appendChild(commentElement);
  }
  return commentListElement;
}

async function fetchCommentsForPost() {
  const postId = loadCommentsButtonElement.dataset.postid;
  try {
    const response = await fetch(`/posts/${postId}/comments`);
    if (!response.ok) {
      alert('Fetching comments failed!');
      return;
    }
    const responseData = await response.json();
  
    if (responseData && responseData.length > 0) {
      const commentListElement = createCommentsList(responseData);
      commentsSectionElement.innerHTML = "";
      commentsSectionElement.appendChild(commentListElement);
    } else {
      commentsSectionElement.firstElementChild.textContent =
        "We could not find any comments. Maybe add one?";
    }
  } catch(error) {
    alert('Getting comments failed.');
  }
}

async function saveComment(event) {
  event.preventDefault();
  const postId = commentsFormElement.dataset.postid;

  const enteredTitle = commentTitleElement.value;
  const enteredText = commentTextElement.value;
  // console.log(enteredTitle, enteredText);
  const comment = { title: enteredTitle, text: enteredText };

  try {
    const response = await fetch(`/posts/${postId}/comments`, {
      method: "POST",
      body: JSON.stringify(comment),
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.ok) {
      fetchCommentsForPost();
    } else {
      alert('Could not fetch comments.');
    }
  } catch(error) {
    alert('Could not send this request. Please try again');
  }

}

loadCommentsButtonElement.addEventListener("click", fetchCommentsForPost);
// console.log(commentsFormElement);
commentsFormElement.addEventListener("submit", saveComment);
