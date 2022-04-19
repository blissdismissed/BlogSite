const loadCommentsButtonElement = document.getElementById("load-comments-btn");
const commentsSectionElement = document.getElementById("comments");
const commentsFormElement = document.querySelector('#comments-form form');
const commentTitleElement = document.getElementById('title');
const commentTextElement = document.getElementById('text ');

function createCommentsList(comments) {
  const commentListElement = document.createElement('ol');

  for (const comment of comments) {
    const commentElement = document.createElement('li');
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
  const response = await fetch(`/posts/${postId}/comments`);
  const responseData = await response.json();
  // console.log(responseData);

  const commentListElement = createCommentsList(responseData);
  commentsSectionElement.innerHTML = '';
  commentsSectionElement.appendChild(commentListElement);

};

function saveComment(event) {
  event.preventDefault();

  const enteredTitle = commentTitleElement;
  const enteredText = commentTextElement;

  console.log(enteredTitle, enteredText);
}


loadCommentsButtonElement.addEventListener('click', fetchCommentsForPost);
console.log(commentsFormElement);
commentsFormElement.addEventListener('submit', saveComment);