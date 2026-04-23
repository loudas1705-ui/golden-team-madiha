
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
        
        // Get blog ID from URL parameter
        function getBlogIdFromUrl() {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get('id');
        }
        
        // Increment blog view
        function incrementBlogView(blogId) {
            const storedBlogs = localStorage.getItem('golden_team_blogs');
            if (storedBlogs) {
                let blogs = JSON.parse(storedBlogs);
                const blogIndex = blogs.findIndex(b => b.id == blogId);
                if (blogIndex !== -1) {
                    blogs[blogIndex].views = (blogs[blogIndex].views || 0) + 1;
                    localStorage.setItem('golden_team_blogs', JSON.stringify(blogs));
                }
            }
        }
        
        // Load blog details
        // في blog-detail.html، استبدل دالة loadBlogDetail بهذه:
function loadBlogDetail() {
    const blogData = sessionStorage.getItem('current_blog');
    
    if (!blogData) {
        showError();
        return;
    }
    
    const blog = JSON.parse(blogData);
    displayBlog(blog);
}
        
        function displayBlog(blog) {
            // Hide loading, show content
            document.getElementById('loadingState').style.display = 'none';
            document.getElementById('errorState').style.display = 'none';
            document.getElementById('blogDetailContent').style.display = 'block';
            
            // Set blog data
            document.getElementById('blogTitle').textContent = blog.title;
            document.getElementById('blogAuthorText').textContent = blog.author;
            document.getElementById('blogDateText').textContent = blog.date;
            
            // Format content with paragraphs
            const contentHtml = blog.content
                .split('\n')
                .filter(para => para.trim().length > 0)
                .map(para => `<p>${para}</p>`)
                .join('');
            document.getElementById('blogContent').innerHTML = contentHtml;
            
            // Set image if exists
            const blogImage = document.getElementById('blogImage');
            if (blog.image && blog.image.startsWith('data:image')) {
                blogImage.src = blog.image;
                blogImage.style.display = 'block';
            } else {
                blogImage.style.display = 'none';
            }
            
            // Update page title
            document.title = `${blog.title} | الفريق الذهبي`;
            
            // Setup share buttons
            setupShareButtons(blog.title);
        }
        
        function setupShareButtons(title) {
            const currentUrl = encodeURIComponent(window.location.href);
            const encodedTitle = encodeURIComponent(title);
            
            document.getElementById('shareFacebook').href = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
            document.getElementById('shareTwitter').href = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${currentUrl}`;
            document.getElementById('shareWhatsapp').href = `https://wa.me/?text=${encodedTitle}%20${currentUrl}`;
            document.getElementById('shareLinkedin').href = `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`;
        }
        
        // Copy link to clipboard
        document.getElementById('copyLink').addEventListener('click', function() {
            const url = window.location.href;
            navigator.clipboard.writeText(url).then(() => {
                showToast('✅ تم نسخ رابط المقال بنجاح');
            }).catch(() => {
                showToast('❌ فشل نسخ الرابط', 'error');
            });
        });
        
        function showError() {
            document.getElementById('loadingState').style.display = 'none';
            document.getElementById('errorState').style.display = 'block';
            document.getElementById('blogDetailContent').style.display = 'none';
        }
        
        function showToast(message, type = 'success') {
            const toast = document.createElement('div');
            toast.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 30px;
                background: ${type === 'error' ? '#ef4444' : '#10b981'};
                color: white;
                padding: 12px 24px;
                border-radius: 50px;
                z-index: 1000;
                font-weight: 600;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                animation: slideIn 0.3s ease;
            `;
            toast.innerHTML = message;
            document.body.appendChild(toast);
            
            // Add animation style if not exists
            if (!document.querySelector('#toastAnimation')) {
                const style = document.createElement('style');
                style.id = 'toastAnimation';
                style.textContent = `
                    @keyframes slideIn {
                        from {
                            transform: translateX(100px);
                            opacity: 0;
                        }
                        to {
                            transform: translateX(0);
                            opacity: 1;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
            
            setTimeout(() => toast.remove(), 3000);
        }
        
        // Initialize
        loadBlogDetail();