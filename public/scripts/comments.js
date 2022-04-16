const loadCommentsButtonElement = document.getElementById("load-comments-btn");


async function fetchCommentsForPost() {
  const postId = loadCommentsButtonElement.dataset.postid;
  const response = await fetch(`/posts/${postId}/comments`);
  const responseData = await response.json();
  console.log(responseData);
};

loadCommentsButtonElement.addEventListener('click', fetchCommentsForPost);