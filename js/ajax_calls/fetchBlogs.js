$(document).ready(function () {
	let currentCategory = null;
	let currentPage = 1;
	const pageSize = 12;

	// Initial load: fetch all blogs
	fetchBlogs(currentCategory, "date", false, currentPage);

	// Event listener for category buttons
	$(".nav-custom a").click(function (event) {
		event.preventDefault();
		$(".nav-custom a").removeClass("active"); // Remove active class from all
		$(this).addClass("active"); // Add active class to the clicked one

		currentCategory = $(this).data("category");
		currentPage = 1; // Reset to first page
		fetchBlogs(currentCategory, "date", false, currentPage);
	});

	// Event listener for pagination
	$(document).on("click", ".pagination-custom a", function (event) {
		event.preventDefault();
		currentPage = $(this).data("page");
		fetchBlogs(currentCategory, "date", false, currentPage);
	});

	function fetchBlogs(category, sortBy, isAscending, page) {
		// Construct the API URL
		let baseUrl = `http://localhost:5077/api/Blogs/search?sortBy=${sortBy}&isAscending=${isAscending}&page=${page}&pageSize=${pageSize}`;
		if (category && category !== "null") {
			baseUrl += `&category=${category}`;
		}

		$.ajax({
			url: baseUrl,
			type: "GET",
			dataType: "json",
			success: function (response) {
				displayBlogs(response.blogs);
				updatePagination(response.totalPages, page);
			},
			error: function (error) {
				console.error("Error fetching blogs:", error);
			},
		});
	}

	function displayBlogs(blogs) {
		const blogContainer = $(".isotope[data-isotope-group='gallery']");
		blogContainer.empty(); // Clear existing content

		blogs.forEach((blog) => {
			const contentText = $(blog.content).text();
			const trimmedContent =
				contentText.length > 180
					? contentText.substring(0, 180) + "..."
					: contentText;
			const blogHTML = `
                <div class="col-md-4 col-sm-12 col-xs-12 isotope-item" data-filter="${
									blog.category
								}">
                    <div class="post post-var-1 post-custom-1">
                        <div class="unit unit-spacing-0 unit-sm-horizontal unit-md-vertical">
                            <div class="unit__left"><a href="single-post.html"><img src="${
															/*blog.imageUrls[0] || */ "images/default.png"
														}" alt="" width="347" height="241" /></a></div>
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

	function updatePagination(totalPages, currentPage) {
		const paginationContainer = $(".pagination-custom");
		paginationContainer.empty(); // Clear existing pagination

		for (let i = 1; i <= totalPages; i++) {
			const activeClass = i === currentPage ? "active" : "";
			paginationContainer.append(
				`<li class="${activeClass}"><a href="#" data-page="${i}">${i}</a></li>`
			);
		}
	}
});
