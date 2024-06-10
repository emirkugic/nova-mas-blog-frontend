$(document).ready(function () {
	function fetchNewestBlogs() {
		$.ajax({
			url: "http://localhost:5077/api/Blogs/search?sortBy=date&isAscending=false&page=1&pageSize=4",
			type: "GET",
			dataType: "json",
			success: function (data) {
				displayNewestBlogs(data);
			},
			error: function (error) {
				console.error("Error fetching newest blogs:", error);
			},
		});
	}

	function displayNewestBlogs(blogs) {
		const blogContainer = $(".range.range-30.range-center").last(); // assuming the last range container is for newest blogs
		blogContainer.empty(); // Clear existing content

		blogs.forEach((blog) => {
			const blogContentText = $(blog.content).text();
			const trimmedContent =
				blogContentText.length > 180
					? blogContentText.substring(0, 180) + "..."
					: blogContentText;

			const blogHTML = `
                <div class="cell-lg-3 cell-md-4 cell-sm-6 cell-xs-10 order-md-first wow fadeInUp" data-wow-duration=".88s" data-wow-offset="30">
                    <div class="post post-var-2" data-blog-id="${blog.id}">
                        <div class="unit unit-spacing-0">
                            <div class="unit__left"><a href="single-post.html"><img src="images/home2-1-421x241.jpg" alt="" width="421" height="241" /></a></div>
                            <div class="unit__body">
                                <div class="post-content">
                                    <div class="post-content-wrap">
                                        <div class="post-tags-wrap"><a class="post-tags" href="#">${
																					blog.category
																				}</a></div>
                                        <h5><a href="single-post.html">${
																					blog.title
																				}</a></h5>
                                        <p>${trimmedContent}</p>
                                        <div class="post-panel-between">
                                            <span class="post-panel"><span class="mdi mdi-sm mdi-clock"></span>
                                            <time datetime="${
																							blog.dateCreated
																						}">${new Date(
				blog.dateCreated
			).toLocaleDateString()}</time></span>
                                            <span class="post-panel"><span class="fl-justicons-visible6"></span><span>${
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
			blogContainer.append(blogHTML);
		});
	}

	fetchNewestBlogs();
});
