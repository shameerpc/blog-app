// src/public/js/blog.js

document.addEventListener('DOMContentLoaded', async () => {
    const blogId = new URLSearchParams(window.location.search).get('id');

    if (!blogId) {
        alert('No blog ID provided');
        return;
    }

    // Fetch and display the blog post details
    const response = await fetch(`/api/blogs/${blogId}`);
    const blog = await response.json();

    document.getElementById('blog-title').textContent = blog.title;
    document.getElementById('blog-author').textContent = `Author: ${blog.author.username}`;
    document.getElementById('blog-date').textContent = `Published on: ${new Date(blog.createdAt).toLocaleDateString()}`;
    document.getElementById('blog-text').textContent = blog.content;

    const token = localStorage.getItem('token');

    if (token && blog.author._id === getUserIdFromToken(token)) {
        document.getElementById('edit-delete').style.display = 'block';
    } else {
        document.getElementById('edit-delete').style.display = 'none';
    }

    // Edit button event listener
    document.getElementById('edit-button').addEventListener('click', () => {
        document.getElementById('edit-title').value = blog.title;
        document.getElementById('edit-content').value = blog.content;
        document.getElementById('edit-section').style.display = 'block';
    });

    // Handle blog post update
    document.getElementById('edit-form').addEventListener('submit', async (e) => {
        e.preventDefault();

        const updatedTitle = document.getElementById('edit-title').value;
        const updatedContent = document.getElementById('edit-content').value;

        const updateResponse = await fetch(`/api/blogs/${blogId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title: updatedTitle, content: updatedContent })
        });

        if (updateResponse.ok) {
            alert('Blog post updated successfully!');
            window.location.reload();
        } else {
            const errorData = await updateResponse.json();
            alert(errorData.message || 'Failed to update blog post');
        }
    });

    // Delete button event listener
    document.getElementById('delete-button').addEventListener('click', async () => {
        if (confirm('Are you sure you want to delete this blog post?')) {
            const deleteResponse = await fetch(`/api/blogs/${blogId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (deleteResponse.ok) {
                alert('Blog post deleted successfully!');
                window.location.href = 'index.html';
            } else {
                const errorData = await deleteResponse.json();
                alert(errorData.message || 'Failed to delete blog post');
            }
        }
    });
});

function getUserIdFromToken(token) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id;
}
