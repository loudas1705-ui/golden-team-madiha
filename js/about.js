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
        function loadBlogs() {
            const container = document.getElementById('blogContainer');
            if (!container) return;
            
            const blogHTML = `
                <div class="blog-card">
                    <img src="https://via.placeholder.com/800x400/fef3c7/db2777?text=Golden+Team" alt="قيمة الشراكة">
                    <div class="blog-content">
                        <div class="blog-meta">
                            <span class="blog-date"><i class="far fa-calendar-alt"></i> 12 أبريل 2026</span>
                            <span class="blog-author"><i class="far fa-user"></i> مديحة زغيب</span>
                        </div>
                        <h3 class="blog-title">قيمة الشراكة والاختيار الصحيح هي طريق النجاح</h3>
                        <p class="blog-excerpt">النجاح في أي مجال و خاصة في «النيتورك ماركيتينغ» لا يعتمد فقط على جودة الفرصة أو رأس المال بل على الأشخاص الذين نعمل معهم لأن الفريق هو الأساس في تحقيق النتائج. إن هناك من يفشل لأن اختياره كان خاطئا و هناك من ينجح لأنه تعلم من الأخطاء وبنى فريقا متعاونا ومؤمنا بالهدف. وفي النهاية تؤكد أن هذا المبدأ لا يخص هذا المجال فقط بل هو قاعدة عامة في كل مجالات الحياة النجاح لا يصنع وحدك بل مع من تختار أن تسير معهم في الطريق.</p>
                        <div class="blog-footer">
                            <span class="blog-team"><i class="fas fa-star"></i> الفريق الذهبي</span>
                            <a href="#" class="blog-read-more" onclick="return false;">اقرأ المزيد <i class="fas fa-arrow-left"></i></a>
                        </div>
                    </div>
                </div>
            `;
            
            container.innerHTML = blogHTML;
        }
        
        // Load Gallery
        function loadGallery() {
            const container = document.getElementById('galleryContainer');
            if (!container) return;
            
            container.innerHTML = `
                <div class="empty-gallery">
                    <i class="fas fa-images"></i>
                    <p>📭 لا توجد صور حالياً</p>
                    <small style="color: #9ca3af;">قم بإضافة صور من لوحة التحكم</small>
                </div>
            `;
        }
        
        // Initialize
        loadBlogs();
        loadGallery();
