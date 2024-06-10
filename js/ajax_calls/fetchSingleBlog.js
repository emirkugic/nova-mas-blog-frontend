$(document).ready(function () {
	// Get the blog ID from the URL
	const urlParams = new URLSearchParams(window.location.search);
	const blogId = urlParams.get("id");

	if (!blogId) {
		console.error("No blog ID provided in the URL.");
		return;
	}

	// Fetch the blog details
	$.ajax({
		url: `http://localhost:5077/api/Blogs/${blogId}`,
		type: "GET",
		dataType: "json",
		success: function (blog) {
			displayBlog(blog);
			fetchSimilarBlogs(blog.category, blogId);
		},
		error: function (error) {
			console.error("Error fetching blog details:", error);
		},
	});

	function displayBlog(blog) {
		$("#blog-date").text(new Date(blog.dateCreated).toLocaleDateString());
		$("#blog-viewCount").text(blog.viewCount);
		$("#blog-author").text(blog.fullName);
		$("#blog-title").text(blog.title);
		$("#blog-content").html(blog.content);
	}

	function fetchSimilarBlogs(category, currentBlogId) {
		$.ajax({
			url: `http://localhost:5077/api/Blogs/search?category=${category}&page=1&pageSize=4`,
			type: "GET",
			dataType: "json",
			success: function (data) {
				const filteredBlogs = data.blogs
					.filter((blog) => blog.id !== currentBlogId)
					.slice(0, 3);
				displaySimilarBlogs(filteredBlogs);
			},
			error: function (error) {
				console.error("Error fetching similar blogs:", error);
			},
		});
	}

	function displaySimilarBlogs(blogs) {
		const similarBlogContainer = $(".range.range-30.range-center").first();
		similarBlogContainer.empty();

		blogs.forEach((blog) => {
			const blogHTML = `
                <div class="cell-md-4 cell-sm-12 cell-xs-10">
                  <div class="post post-var-1 post-custom-1">
                    <div class="unit unit-spacing-0 unit-sm-horizontal unit-md-vertical">
                      <div class="unit__left"><a href="single-post.html?id=${
												blog.id
											}"><img src="${
				/*blog.imageUrls[0] || */ "images/default.png"
			}" alt="" width="347" height="241" /></a></div>
                      <div class="unit__body">
                        <div class="post-content">
                          <div class="post-content-wrap">
                            <div class="post-tags-wrap"><a class="post-tags" href="#">${
															blog.category
														}</a>
                            </div>
                            <h5><a href="single-post.html?id=${blog.id}">${
				blog.title
			}</a></h5>
                            <p>${
															$(blog.content).text().length > 180
																? $(blog.content).text().substring(0, 180) +
																  "..."
																: $(blog.content).text()
														}</p>
                            <div class="post-panel-between"><span class="post-panel"><span class="mdi mdi-sm mdi-clock"></span>
                                <time datetime="${blog.dateCreated}">${new Date(
				blog.dateCreated
			).toLocaleDateString()}</time></span><span class="post-panel"><span class="fl-justicons-visible6"></span><span>${
				blog.viewCount
			}</span></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            `;
			similarBlogContainer.append(blogHTML);
		});
	}
});
