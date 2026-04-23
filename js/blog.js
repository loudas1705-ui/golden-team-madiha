// Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobileMenu');
        const navMenu = document.getElementById('navMenu');
        
        if (mobileMenuBtn && navMenu) {
            mobileMenuBtn.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (navMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        }
        
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileMenuBtn?.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
        
        // Load Blogs
        // في blog.html، استبدل دوال loadBlogs و loadGallery بهذا:

function loadBlogs() {
    const container = document.getElementById('blogContainer');
    if (!container) return;
    
    const storedBlogs = localStorage.getItem('golden_team_blogs');
    let blogs = [];
    
    if (storedBlogs) {
        blogs = JSON.parse(storedBlogs);
    }
    
    if (blogs.length === 0) {
        container.innerHTML = `<div class="empty-state"><i class="fas fa-newspaper"></i><p>لا توجد مقالات حالياً</p></div>`;
        return;
    }
    
    container.innerHTML = blogs.map(blog => `
        <div class="blog-card">
            ${blog.image ? `<img src="${blog.image}" alt="${blog.title}">` : ''}
            <div class="blog-content">
                <div class="blog-meta">
                    <span class="blog-date"><i class="far fa-calendar-alt"></i> ${blog.date}</span>
                    <span class="blog-author"><i class="far fa-user"></i> ${blog.author}</span>
                </div>
                <h3 class="blog-title">${blog.title}</h3>
                <p class="blog-excerpt">${blog.content.substring(0, 200)}${blog.content.length > 200 ? '...' : ''}</p>
                <div class="blog-footer">
                    <span class="blog-team"><i class="fas fa-star"></i> الفريق الذهبي</span>
                    <a href="#" class="blog-read-more" onclick="viewBlog(${blog.id})">اقرأ المزيد <i class="fas fa-arrow-left"></i></a>
                </div>
            </div>
        </div>
    `).join('');
}

function loadGallery() {
    const container = document.getElementById('galleryContainer');
    if (!container) return;
    
    const storedGallery = localStorage.getItem('golden_team_gallery');
    let gallery = [];
    
    if (storedGallery) {
        gallery = JSON.parse(storedGallery);
    }
    
    if (gallery.length === 0) {
        container.innerHTML = `<div class="empty-gallery"><i class="fas fa-images"></i><p>📭 لا توجد صور حالياً</p></div>`;
        return;
    }
    
    container.innerHTML = gallery.map(item => `
        <div class="gallery-item">
            <img src="${item.image}" alt="${item.caption}">
            ${item.caption ? `<div class="gallery-caption">${item.caption}</div>` : ''}
        </div>
    `).join('');
}
// أضف هذه الدالة في ملف blog.js بعد loadGallery()

function viewBlog(blogId) {
    const storedBlogs = localStorage.getItem('golden_team_blogs');
    let blogs = [];
    
    if (storedBlogs) {
        blogs = JSON.parse(storedBlogs);
    }
    
    const blog = blogs.find(b => b.id === blogId);
    if (blog) {
        sessionStorage.setItem('current_blog', JSON.stringify(blog));
        // استخدم window.location.href بدلاً من window.open
        window.location.href = 'blog-detail.html';
    }
}
        
        // Initialize
        loadBlogs();
        loadGallery();