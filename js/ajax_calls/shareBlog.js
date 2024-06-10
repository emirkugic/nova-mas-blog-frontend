$(document).ready(function () {
	const urlParams = new URLSearchParams(window.location.search);
	const blogId = urlParams.get("id");

	if (!blogId) {
		console.error("No blog ID provided in the URL.");
		return;
	}

	const link = encodeURIComponent(window.location.href);
	const msg = encodeURIComponent("Hey, I found this article");
	const title = encodeURIComponent(document.querySelector("title").textContent);

	const fb = document.querySelector(".button-facebook");
	fb.href = `https://www.facebook.com/sharer/sharer.php?u=${link}&quote=${msg}`;

	const twitter = document.querySelector(".button-twitter");
	twitter.href = `https://twitter.com/intent/tweet?text=${msg} ${title} ${link}`;

	const instagram = document.querySelector(".button-instagram");
	instagram.href = `https://www.instagram.com/?url=${link}`;

	// Open links in a new tab
	$(".button-facebook, .button-twitter, .button-instagram").attr(
		"target",
		"_blank"
	);
});
