// script.js
document.addEventListener("DOMContentLoaded", () => {
  const DOUBLE_TAP_DELAY = 300; // ms

  document.querySelectorAll(".post").forEach((post) => {
    const img = post.querySelector(".post-img");
    const bigHeart = post.querySelector(".big-heart");

    const likeBtn = post.querySelector(".like-btn");
    const likeIcon = post.querySelector(".like-icon");
    const likeCountEl = post.querySelector(".like-count");

    const saveBtn = post.querySelector(".save-btn");
    const saveIcon = saveBtn ? saveBtn.querySelector("i") : null;

    // ensure initial count is integer
    const parseCount = (el) => {
      if (!el) return 0;
      const n = parseInt(el.textContent.trim().replace(/,/g, ""), 10);
      return Number.isFinite(n) ? n : 0;
    };

    let liked = likeIcon.classList.contains("liked");
    let lastTap = 0;

    // helper to set like visuals and count
    const setLiked = (value) => {
      const current = parseCount(likeCountEl);
      if (value === liked) return; // no change

      if (value) {
        // like
        likeIcon.classList.add("liked", "ri-thumb-up-fill");
        likeIcon.classList.remove("ri-thumb-up-line");
        likeCountEl.textContent = current + 1;
        likeCountEl.classList.add("liked");

        // small pop
        likeBtn.classList.add("pop");
        setTimeout(() => likeBtn.classList.remove("pop"), 200);
      } else {
        // unlike
        likeIcon.classList.remove("liked", "ri-thumb-up-fill");
        likeIcon.classList.add("ri-thumb-up-line");
        likeCountEl.textContent = Math.max(0, current - 1);
        likeCountEl.classList.remove("liked");
      }
      liked = value;
    };

    // toggle function
    const toggleLike = () => setLiked(!liked);

    // like button click
    if (likeBtn) {
      likeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        toggleLike();
      });
    }

    // double-tap detection on image
    if (img) {
      img.addEventListener("click", (e) => {
        const now = Date.now();
        const delta = now - lastTap;

        if (delta < DOUBLE_TAP_DELAY) {
          // double-tap detected
          if (!liked) setLiked(true);

          if (bigHeart) {
            bigHeart.classList.add("show");
            // remove after animation
            setTimeout(() => bigHeart.classList.remove("show"), 650);
          }
        }

        lastTap = now;
      });

      // prevent image dragging selecting text which can break double-tap
      img.addEventListener("dragstart", (ev) => ev.preventDefault());
    }

    // save toggle
    if (saveBtn && saveIcon) {
      saveBtn.addEventListener("click", (e) => {
        e.preventDefault();
        saveBtn.classList.toggle("active");

        // swap icon classes if remixicon naming available
        // many icon sets use -line and -fill pattern
        if (saveIcon.classList.contains("ri-save-line")) {
          saveIcon.classList.remove("ri-save-line");
          saveIcon.classList.add("ri-save-fill");
        } else if (saveIcon.classList.contains("ri-save-fill")) {
          saveIcon.classList.remove("ri-save-fill");
          saveIcon.classList.add("ri-save-line");
        } else {
          // fallback: toggle active color
          saveIcon.classList.toggle("active");
        }
      });
    }
  });
});
