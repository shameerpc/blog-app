// src/public/js/scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });

            const data = await response.json();
            if (response.ok) {
                alert('Registration successful!');
                window.location.href = 'login.html';
            } else {
                alert(data.message || 'Registration failed');
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                alert('Login successful!');
                window.location.href = 'index.html';
            } else {
                alert(data.message || 'Login failed');
            }
        });
    }

    if (document.getElementById('blog-posts')) {
        fetchBlogs();
    }
});

async function fetchBlogs() {
    const response = await fetch('/api/blogs');
    const blogs = await response.json();
    const blogPosts = document.getElementById('blog-posts');

    blogs.forEach(blog => {
        const blogItem = document.createElement('div');
        blogItem.innerHTML = `
            <h2>${blog.title}</h2>
            <p>${blog.content}</p>
            <p><strong>Author:</strong> ${blog.author.username}</p>
        `;
        blogPosts.appendChild(blogItem);
    });
}
