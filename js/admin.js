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
    
    // Data storage keys
    const STORAGE_KEYS = {
        BLOGS: 'golden_team_blogs',
        GALLERY: 'golden_team_gallery'
    };
    
    let blogs = [];
    let gallery = [];
    
    function loadData() {
        const storedBlogs = localStorage.getItem(STORAGE_KEYS.BLOGS);
        const storedGallery = localStorage.getItem(STORAGE_KEYS.GALLERY);
        
        if (storedBlogs) {
            blogs = JSON.parse(storedBlogs);
        } else {
            blogs = [{
                id: Date.now(),
                title: "قيمة الشراكة والاختيار الصحيح هي طريق النجاح",
                author: "مديحة زغيب",
                content: "النجاح في أي مجال و خاصة في «النيتورك ماركيتينغ» لا يعتمد فقط على جودة الفرصة أو رأس المال بل على الأشخاص الذين نعمل معهم لأن الفريق هو الأساس في تحقيق النتائج. إن هناك من يفشل لأن اختياره كان خاطئا و هناك من ينجح لأنه تعلم من الأخطاء وبنى فريقا متعاونا ومؤمنا بالهدف. وفي النهاية تؤكد أن هذا المبدأ لا يخص هذا المجال فقط بل هو قاعدة عامة في كل مجالات الحياة النجاح لا يصنع وحدك بل مع من تختار أن تسير معهم في الطريق.",
                date: new Date().toLocaleDateString('ar-EG')
            }];
            saveBlogs();
        }
        
        if (storedGallery) {
            gallery = JSON.parse(storedGallery);
        } else {
            gallery = [];
            saveGallery();
        }
        
        updateStorageInfo();
    }
    
    function saveBlogs() {
        localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(blogs));
        updateStorageInfo();
    }
    
    function saveGallery() {
        localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(gallery));
        updateStorageInfo();
    }
    
    function updateStats() {
        document.getElementById('blogCount').textContent = blogs.length;
        document.getElementById('galleryCount').textContent = gallery.length;
    }
    
    function updateStorageInfo() {
        try {
            let total = 0;
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                const value = localStorage.getItem(key);
                total += (key.length + (value ? value.length : 0)) * 2;
            }
            const usedMB = (total / (1024 * 1024)).toFixed(2);
            const percent = Math.min((total / (5 * 1024 * 1024)) * 100, 100);
            
            document.getElementById('storageUsed').textContent = usedMB + ' MB';
            document.getElementById('storageBar').style.width = percent + '%';
            
            const warning = document.getElementById('storageWarning');
            if (percent > 80) {
                warning.classList.add('show');
            } else {
                warning.classList.remove('show');
            }
        } catch(e) {
            console.log('Storage info error:', e);
        }
    }
    
    function renderBlogsList() {
        const container = document.getElementById('blogsList');
        if (blogs.length === 0) {
            container.innerHTML = `<div class="empty-state"><i class="fas fa-newspaper"></i><p>لا توجد مقالات حالياً</p><small>أضف مقالك الأول من الأعلى</small></div>`;
            return;
        }
        
        container.innerHTML = blogs.map((blog) => `
            <div class="item-row">
                <div style="font-weight:600;">${blog.title.substring(0, 50)}${blog.title.length > 50 ? '...' : ''}</div>
                <div>${blog.author}</div>
                <div class="actions">
                    <button class="btn-edit" onclick="editBlog(${blog.id})"><i class="fas fa-edit"></i> تعديل</button>
                    <button class="btn-danger" onclick="deleteBlog(${blog.id})"><i class="fas fa-trash"></i> حذف</button>
                </div>
            </div>
        `).join('');
    }
    
    function renderGalleryList() {
        const container = document.getElementById('galleryList');
        if (gallery.length === 0) {
            container.innerHTML = `<div class="empty-state" style="grid-column:1/-1;"><i class="fas fa-images"></i><p>لا توجد صور في المعرض</p><small>أضف صورك الأولى من الأعلى</small></div>`;
            return;
        }
        
        container.innerHTML = gallery.map(item => `
            <div class="admin-gallery-item">
                <img src="${item.image}" alt="${item.caption || 'صورة في المعرض'}">
                <div class="gallery-item-info">
                    <p><i class="fas fa-camera"></i> ${item.caption || 'بدون وصف'}</p>
                    <button class="btn-danger" onclick="deleteGalleryItem(${item.id})"><i class="fas fa-trash"></i> حذف</button>
                </div>
            </div>
        `).join('');
    }
    
    // ضغط الصورة قبل التخزين
    function compressImage(file, maxWidth = 800, maxHeight = 800, quality = 0.7) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                const img = new Image();
                img.src = e.target.result;
                img.onload = () => {
                    let width = img.width;
                    let height = img.height;
                    
                    if (width > maxWidth) {
                        height = (height * maxWidth) / width;
                        width = maxWidth;
                    }
                    if (height > maxHeight) {
                        width = (width * maxHeight) / height;
                        height = maxHeight;
                    }
                    
                    const canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    
                    canvas.toBlob((blob) => {
                        const compressedReader = new FileReader();
                        compressedReader.readAsDataURL(blob);
                        compressedReader.onload = () => {
                            resolve(compressedReader.result);
                        };
                    }, 'image/jpeg', quality);
                };
                img.onerror = reject;
            };
            reader.onerror = reject;
        });
    }
    
    // Add Blog
    document.getElementById('blogForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('blogTitle').value;
        const author = document.getElementById('blogAuthor').value;
        const content = document.getElementById('blogContent').value;
        
        const newBlog = {
            id: Date.now(),
            title,
            author,
            content,
            date: new Date().toLocaleDateString('ar-EG')
        };
        
        blogs.unshift(newBlog);
        saveBlogs();
        renderBlogsList();
        updateStats();
        showToast('✅ تم نشر المقال بنجاح');
        
        document.getElementById('blogForm').reset();
    });
    
    // Add Gallery with compression
    const uploadBtn = document.getElementById('uploadBtn');
    const galleryForm = document.getElementById('galleryForm');
    
    galleryForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const caption = document.getElementById('galleryCaption').value;
        const imageFile = document.getElementById('galleryImage').files[0];
        
        if (!imageFile) {
            showToast('❌ الرجاء اختيار صورة', 'error');
            return;
        }
        
        // Check file size
        if (imageFile.size > 2 * 1024 * 1024) {
            showToast('⚠️ الصورة كبيرة جداً (أكثر من 2MB). يرجى اختيار صورة أصغر.', 'error');
            return;
        }
        
        uploadBtn.disabled = true;
        uploadBtn.innerHTML = '<div class="spinner"></div> جاري الضغط والمعالجة...';
        
        try {
            // Compress image
            const compressedImage = await compressImage(imageFile, 800, 800, 0.6);
            
            const newItem = {
                id: Date.now(),
                caption: caption || '',
                image: compressedImage
            };
            
            gallery.unshift(newItem);
            saveGallery();
            renderGalleryList();
            updateStats();
            showToast('✅ تم إضافة الصورة بنجاح');
            
            galleryForm.reset();
            document.getElementById('galleryImagePreview').innerHTML = '';
            
        } catch (error) {
            console.error('Error:', error);
            showToast('❌ حدث خطأ أثناء معالجة الصورة', 'error');
        } finally {
            uploadBtn.disabled = false;
            uploadBtn.innerHTML = '<i class="fas fa-upload"></i> رفع الصورة';
        }
    });
    
    window.deleteBlog = (id) => {
        if (confirm('⚠️ هل أنت متأكد من حذف هذا المقال؟')) {
            blogs = blogs.filter(blog => blog.id !== id);
            saveBlogs();
            renderBlogsList();
            updateStats();
            showToast('🗑️ تم حذف المقال بنجاح');
        }
    };
    
    window.deleteGalleryItem = (id) => {
        if (confirm('⚠️ هل أنت متأكد من حذف هذه الصورة؟')) {
            gallery = gallery.filter(item => item.id !== id);
            saveGallery();
            renderGalleryList();
            updateStats();
            showToast('🗑️ تم حذف الصورة بنجاح');
        }
    };
    
    window.editBlog = (id) => {
        const blog = blogs.find(b => b.id === id);
        if (blog) {
            document.getElementById('editId').value = blog.id;
            document.getElementById('editTitle').value = blog.title;
            document.getElementById('editAuthor').value = blog.author;
            document.getElementById('editContent').value = blog.content;
            document.getElementById('editModal').classList.add('active');
        }
    };
    
    document.getElementById('editForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const id = parseInt(document.getElementById('editId').value);
        const index = blogs.findIndex(b => b.id === id);
        
        if (index !== -1) {
            blogs[index] = {
                ...blogs[index],
                title: document.getElementById('editTitle').value,
                author: document.getElementById('editAuthor').value,
                content: document.getElementById('editContent').value
            };
            saveBlogs();
            renderBlogsList();
            closeEditModal();
            showToast('✅ تم تعديل المقال بنجاح');
        }
    });
    
    window.closeEditModal = () => {
        document.getElementById('editModal').classList.remove('active');
    };
    
    window.clearAllData = () => {
        if (confirm('⚠️ تحذير خطير: سيتم حذف جميع المقالات والصور بشكل نهائي. هل أنت متأكد؟')) {
            blogs = [];
            gallery = [];
            saveBlogs();
            saveGallery();
            renderBlogsList();
            renderGalleryList();
            updateStats();
            showToast('🗑️ تم حذف جميع البيانات');
        }
    };
    
    window.exportData = () => {
        const data = { blogs, gallery };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `golden_team_backup_${new Date().toISOString().slice(0,19)}.json`;
        a.click();
        URL.revokeObjectURL(url);
        showToast('📥 تم تصدير البيانات بنجاح');
    };
    
    window.importData = (input) => {
        const file = input.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    if (data.blogs) blogs = data.blogs;
                    if (data.gallery) gallery = data.gallery;
                    saveBlogs();
                    saveGallery();
                    renderBlogsList();
                    renderGalleryList();
                    updateStats();
                    showToast('📤 تم استيراد البيانات بنجاح');
                } catch (err) {
                    showToast('❌ خطأ في ملف الاستيراد', 'error');
                }
            };
            reader.readAsText(file);
        }
    };
    
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = 'toast';
        if (type === 'error') toast.classList.add('error');
        toast.innerHTML = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }
    
    // Image preview for gallery only
    const galleryImageInput = document.getElementById('galleryImage');
    if (galleryImageInput) {
        galleryImageInput.addEventListener('change', (e) => {
            const preview = document.getElementById('galleryImagePreview');
            preview.innerHTML = '';
            if (e.target.files && e.target.files[0]) {
                const img = document.createElement('img');
                img.src = URL.createObjectURL(e.target.files[0]);
                img.className = 'preview-img';
                preview.appendChild(img);
                
                // Show file size warning
                const fileSize = e.target.files[0].size;
                if (fileSize > 1024 * 1024) {
                    const warning = document.createElement('small');
                    warning.style.color = '#ef4444';
                    warning.style.display = 'block';
                    warning.style.marginTop = '8px';
                    warning.innerHTML = '⚠️ حجم الصورة كبير (' + (fileSize / (1024 * 1024)).toFixed(1) + 'MB). سيتم ضغطها تلقائياً.';
                    preview.appendChild(warning);
                }
            }
        });
    }
    
    // Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            const panel = document.getElementById(`${tabId}Panel`);
            if (panel) {
                panel.classList.add('active');
            }
        });
    });
    
    // Initialize
    loadData();
    renderBlogsList();
    renderGalleryList();
    updateStats();
    
    window.onclick = (e) => {
        const modal = document.getElementById('editModal');
        if (e.target === modal) {
            closeEditModal();
        }
    };