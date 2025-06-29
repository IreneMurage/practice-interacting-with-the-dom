document.addEventListener("DOMContentLoaded", function () {
  let counter = document.getElementById("counter");
  let count = parseInt(counter.textContent);
  let isPaused = false;
  let timer;

  const plusBtn = document.getElementById("plus");
  const minusBtn = document.getElementById("minus");
  const heartBtn = document.getElementById("heart");
  const pauseBtn = document.getElementById("pause");
  const likesList = document.querySelector(".likes");
  const commentForm = document.getElementById("comment-form");
  const commentInput = document.getElementById("comment-input");
  const commentList = document.getElementById("list");

  function startTimer() {
    timer = setInterval(() => {
      count++;
      counter.textContent = count;
    }, 1000);
  }

  startTimer(); 

  plusBtn.addEventListener("click", () => {
    count++;
    counter.textContent = count;
  });

  minusBtn.addEventListener("click", () => {
    count--;
    counter.textContent = count;
  });

  heartBtn.addEventListener("click", () => {
    let existingLike = document.querySelector(`[data-num="${count}"]`);
    if (existingLike) {
      let currentLikes = parseInt(existingLike.dataset.likes);
      currentLikes++;
      existingLike.dataset.likes = currentLikes;
      existingLike.textContent = `${count} has been liked ${currentLikes} time${currentLikes > 1 ? "s" : ""}`;
    } else {
      let newLike = document.createElement("li");
      newLike.dataset.num = count;
      newLike.dataset.likes = 1;
      newLike.textContent = `${count} has been liked 1 time`;
      likesList.appendChild(newLike);
    }
  });

  pauseBtn.addEventListener("click", () => {
    if (!isPaused) {
      clearInterval(timer);
      isPaused = true;
      pauseBtn.textContent = "resume";
      plusBtn.disabled = true;
      minusBtn.disabled = true;
      heartBtn.disabled = true;
    } else {
      startTimer();
      isPaused = false;
      pauseBtn.textContent = "pause";
      plusBtn.disabled = false;
      minusBtn.disabled = false;
      heartBtn.disabled = false;
    }
  });

  commentForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const commentText = commentInput.value.trim();
    if (commentText !== "") {
      const newComment = document.createElement("p");
      newComment.textContent = commentText;
      commentList.appendChild(newComment);
      commentInput.value = "";
    }
  });
});
