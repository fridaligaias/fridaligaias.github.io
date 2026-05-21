document.addEventListener('DOMContentLoaded', async () => {
    const postsContainer = document.getElementById('blogPosts');
    if (!postsContainer) {
        return;
    }

    try {
        const response = await fetch('posts.json');
        if (!response.ok) {
            throw new Error('Could not load posts.');
        }

        const posts = await response.json();
        if (!posts.length) {
            postsContainer.innerHTML = '<p class="empty-state">Nothing is here yet.</p>';
            return;
        }

        postsContainer.innerHTML = posts.map(post => `
            <article class="blog-post-card">
                <div class="blog-post-meta">
                    <span>${post.displayDate || post.date}</span>
                </div>
                <h2><a href="${post.url}">${post.title}</a></h2>
                <p>${post.summary}</p>
                <div class="blog-tags">
                    ${(post.tags || []).map(tag => `<span>${tag}</span>`).join('')}
                </div>
                <a href="${post.url}" class="btn btn-secondary btn-small blog-read-link">
                    <i class="fa-solid fa-arrow-right"></i> Read Post
                </a>
            </article>
        `).join('');
    } catch (error) {
        postsContainer.innerHTML = '<p class="empty-state">Posts could not be loaded right now.</p>';
    }
});
