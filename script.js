/* =================================================================
   INTERACTIVE LOGIC: PREMIUM BUGIS DIGITAL WEDDING INVITATION
   ================================================================= */

// 1. CONFIGURATION BLOCK (EASY TO CUSTOMIZE)
const CONST_GROOM_NICKNAME = "Aznur";

const WEDDING_CONFIG = {
    weddingDate: "2026-07-12T09:30:00+08:00", // Format: YYYY-MM-DDTHH:mm:ss+timezone
    couple: {
        groom: {
            nickname: "Aznur",
            fullName: "Moh Aznur, S.H",
            father: "Bapak Abd Asis Ngatta/Andu (Almarhum)",
            mother: "Ibu Matang Nasir, S.Pd/Tang (Almarhuma)",
            instagram: "Moh_ennur",
            photo: "groom.webp"
        },
        bride: {
            nickname: "Masna",
            fullName: "Masna Abd Fattah, S.M",
            father: "Bapak Abd Fattah Hs. Hi. Hamson",
            mother: "Ibu Matahari Hj. Dolla",
            instagram: "Masna_abd_fattah",
            photo: "bride.webp"
        }
    },
    events: {
        akad: {
            date: "Minggu, 12 Juli 2026",
            time: "09.30 WITA - Selesai",
            locationName: "Jl. Bandar Udara",
            address: "Desa Kalangkangan, Samping SDN 2 Kalangkangan",
            mapUrl: "https://maps.app.goo.gl/i6n5ymG64McpqtK39?g_st=atm",
            calendarTitle: "Akad Nikah Aznur & Masna",
            calendarStart: "2026-07-12T09:30:00"
        },
        mapparola: {
            date: "Minggu, 12 Juli 2026",
            time: "11.30 WITA - Selesai",
            locationName: "Kediaman Mempelai Pria",
            address: "Kediaman Moh Aznur, S.H",
            mapUrl: "https://maps.app.goo.gl/c4DxL1ZQvpiqfYqJ6?g_st=atm",
            calendarTitle: "Acara Mapparola Aznur & Masna",
            calendarStart: "2026-07-12T11:30:00"
        },
        resepsi: {
            date: "Minggu, 12 Juli 2026",
            time: "19.30 WITA - Selesai",
            locationName: "Kediaman Mempelai Wanita",
            address: "Kediaman Masna Abd Fattah, S.M",
            mapUrl: "https://maps.app.goo.gl/i6n5ymG64McpqtK39?g_st=atm",
            calendarTitle: "Resepsi Pernikahan Aznur & Masna",
            calendarStart: "2026-07-12T19:30:00"
        }
    },
    gifts: [
        {
            bankName: "BANK MANDIRI",
            accountNumber: "1510015048876",
            accountHolder: "a.n. Moh Aznur",
            id: "bank-acc-1"
        },
        {
            bankName: "BANK BSI",
            accountNumber: "7245280089",
            accountHolder: "a.n. Masna Abd Fattah",
            id: "bank-acc-2"
        }
    ],
    // Array of 12 gallery images
    gallery: [
        { src: "g1.jpg", caption: "Kebersamaan Aznur & Masna" },
        { src: "g2.jpg", caption: "Senyuman Hangat Hari Bahagia" },
        { src: "g3.jpg", caption: "Momen Akad Nikah yang Sakral" },
        { src: "g4.jpg", caption: "Adat Bugis yang Agung" },
        { src: "g5.jpg", caption: "Pandangan Penuh Kasih" },
        { src: "g6.jpg", caption: "Langkah Pertama Bersama" },
        { src: "g7.jpg", caption: "Dalam Balutan Busana Tradisional" },
        { src: "g8.jpg", caption: "Kehangatan Cinta & Keluarga" },
        { src: "g9.jpg", caption: "Janji Suci di Masjid Raya" },
        { src: "g10.jpg", caption: "Senyum Manis Pengantin" },
        { src: "g11.jpg", caption: "Melangkah Menuju Masa Depan" },
        { src: "g12.jpg", caption: "Terima Kasih Atas Doa Restu Anda" }
    ]
};

document.addEventListener("DOMContentLoaded", () => {
    
    // =================================================================
    // 2. PARSE GUEST NAME FROM URL (SHOWN ON COVER 2)
    // =================================================================
    const parseGuestName = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const guestParam = urlParams.get("to") || urlParams.get("u") || urlParams.get("nama");
        const guestNameEl = document.getElementById("guest-name-cover2");
        
        if (guestNameEl) {
            if (guestParam) {
                // Replace pluses or clean string
                const cleanedName = guestParam.replace(/\+/g, " ").trim();
                guestNameEl.textContent = cleanedName;
            } else {
                guestNameEl.textContent = "Tamu Undangan";
            }
        }
    };
    parseGuestName();

    // =================================================================
    // 3. CONTINUOUS DRAWING REVEAL FOR "UNDANGAN" (NO TYPING CURSOR)
    // =================================================================
    const initTypewriter = () => {
        const textContainer = document.getElementById("typewriter-text");
        const ovalFrame = document.getElementById("oval-frame");
        
        if (textContainer) {
            // Set the full text directly
            textContainer.textContent = "Undangan";
            
            // Trigger the continuous smooth left-to-right carving/drawing animation
            setTimeout(() => {
                textContainer.classList.add("reveal-active");
            }, 500);
        }
        
        // Gently and slowly fade in the oval frame as the text finishes drawing
        setTimeout(() => {
            if (ovalFrame) {
                ovalFrame.classList.add("show");
            }
        }, 2000);
    };
    initTypewriter();

    // =================================================================
    // 4. SLIDE TO UNLOCK LOGIC (REVEALS COVER 2)
    // =================================================================
    let slideshowInterval; // Variable to hold slideshow timer
    
    const initSlider = () => {
        const slider = document.getElementById("lock-slider");
        const handle = document.getElementById("slider-handle");
        const progress = document.getElementById("slider-progress");
        const coverScreen = document.getElementById("cover-screen");
        const coverScreen2 = document.getElementById("cover-screen-2");
        
        let isDragging = false;
        let startX = 0;
        let currentX = 0;
        let maxDrag = slider.clientWidth - handle.clientWidth - 6; // Subtract padding/border
        
        // Recalculate max drag on resize
        window.addEventListener("resize", () => {
            maxDrag = slider.clientWidth - handle.clientWidth - 6;
        });

        // Touch Events (Mobile)
        handle.addEventListener("touchstart", (e) => {
            isDragging = true;
            startX = e.touches[0].clientX - currentX;
            handle.style.transition = "none";
            progress.style.transition = "none";
        }, { passive: true });

        window.addEventListener("touchmove", (e) => {
            if (!isDragging) return;
            let touchX = e.touches[0].clientX - startX;
            
            // Constrain within bounds
            if (touchX < 0) touchX = 0;
            if (touchX > maxDrag) touchX = maxDrag;
            
            currentX = touchX;
            handle.style.transform = `translateX(${currentX}px)`;
            
            // Set width of gold progress overlay
            progress.style.width = `${currentX + handle.clientWidth / 2}px`;
            
            // Check if unlocked (at least 92% of the slider path)
            if (currentX >= maxDrag * 0.92) {
                isDragging = false;
                unlockInvitation();
            }
        }, { passive: true });

        window.addEventListener("touchend", () => {
            if (!isDragging) return;
            isDragging = false;
            resetSlider();
        });

        // Mouse Events (Desktop)
        handle.addEventListener("mousedown", (e) => {
            isDragging = true;
            startX = e.clientX - currentX;
            handle.style.transition = "none";
            progress.style.transition = "none";
            e.preventDefault();
        });

        window.addEventListener("mousemove", (e) => {
            if (!isDragging) return;
            let mouseX = e.clientX - startX;
            
            if (mouseX < 0) mouseX = 0;
            if (mouseX > maxDrag) mouseX = maxDrag;
            
            currentX = mouseX;
            handle.style.transform = `translateX(${currentX}px)`;
            progress.style.width = `${currentX + handle.clientWidth / 2}px`;
            
            if (currentX >= maxDrag * 0.92) {
                isDragging = false;
                unlockInvitation();
            }
        });

        window.addEventListener("mouseup", () => {
            if (!isDragging) return;
            isDragging = false;
            resetSlider();
        });

        const resetSlider = () => {
            currentX = 0;
            handle.style.transition = "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
            progress.style.transition = "width 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
            handle.style.transform = "translateX(0px)";
            progress.style.width = "0px";
        };

        const unlockInvitation = () => {
            // Lock handles & full progress bar representation
            handle.style.transform = `translateX(${maxDrag}px)`;
            progress.style.width = "100%";
            
            // Animate Cover 1 out
            coverScreen.classList.add("unlocked");
            
            // Reveal Cover 2
            if (coverScreen2) {
                coverScreen2.classList.remove("hidden");
                // Start Cover 2 image slideshow
                startSlideshow();
            }
        };
    };
    initSlider();

    // =================================================================
    // 4B. COVER 2 IMAGE SLIDESHOW LOGIC
    // =================================================================
    const startSlideshow = () => {
        const slides = document.querySelectorAll("#cover-screen-2 .slide");
        if (slides.length <= 1) return;
        
        let activeIndex = 0;
        slideshowInterval = setInterval(() => {
            slides[activeIndex].classList.remove("active");
            activeIndex = (activeIndex + 1) % slides.length;
            slides[activeIndex].classList.add("active");
        }, 3500); // Cross-fade every 3.5 seconds
    };

    // =================================================================
    // 4C. COVER 2 "BUKA UNDANGAN" BUTTON LOGIC (REVEALS MAIN PAGE & PLAYS MUSIC)
    // =================================================================
    const playBackgroundMusic = () => {
        const bgMusic = document.getElementById("bg-music");
        const audioBtn = document.getElementById("audio-toggle-btn");
        
        if (bgMusic) {
            bgMusic.volume = 0.5; // Moderate pleasant volume
            bgMusic.play().then(() => {
                audioBtn.classList.add("playing");
            }).catch(err => {
                console.log("Audio autoplay blocked by browser, waiting for user toggle:", err);
            });
        }
    };

    const initOpenInvitationButton = () => {
        const btnOpen = document.getElementById("btn-open-invitation");
        const coverScreen2 = document.getElementById("cover-screen-2");
        const mainContent = document.getElementById("main-content");
        const audioControl = document.getElementById("audio-control");
        
        if (btnOpen) {
            btnOpen.addEventListener("click", () => {
                // Stop Cover 2 slideshow interval to optimize memory & performance
                if (slideshowInterval) {
                    clearInterval(slideshowInterval);
                }
                
                // Animate Cover 2 out
                if (coverScreen2) {
                    coverScreen2.classList.add("unlocked");
                }
                
                // Reveal main page & floating audio controls
                if (mainContent) {
                    mainContent.classList.remove("hidden");
                    setTimeout(() => {
                        mainContent.classList.add("show");
                        if (audioControl) {
                            audioControl.classList.remove("hidden");
                        }
                        // Start playing the background music
                        playBackgroundMusic();
                        
                        // Force add 'revealed' to all hero elements immediately for instant display
                        const heroElements = document.querySelectorAll("#hero .scroll-reveal, #hero .scroll-reveal-left, #hero .scroll-reveal-right");
                        heroElements.forEach(el => {
                            el.classList.add("revealed");
                        });
                        
                        // Start tracking elements for scroll reveal animations
                        initScrollReveal();
                    }, 100);
                }
            });
        }
    };
    initOpenInvitationButton();

    // =================================================================
    // 5. FLOATING MUSIC TOGGLE
    // =================================================================
    const initAudioToggle = () => {
        const audioBtn = document.getElementById("audio-toggle-btn");
        const bgMusic = document.getElementById("bg-music");
        
        audioBtn.addEventListener("click", () => {
            if (bgMusic.paused) {
                bgMusic.play();
                audioBtn.classList.add("playing");
                audioBtn.innerHTML = '<i class="fas fa-music"></i>';
            } else {
                bgMusic.pause();
                audioBtn.classList.remove("playing");
                audioBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            }
        });
    };
    initAudioToggle();

    // =================================================================
    // 6. WEDDING COUNTDOWN TIMER (WITH ROLLING DIGITS EFFECT)
    // =================================================================
    const initCountdown = () => {
        const targetDate = new Date(WEDDING_CONFIG.weddingDate).getTime();
        
        // Helper to scroll a single digit strip (0-9)
        const updateRollingDigit = (stripId, digitValue) => {
            const strip = document.getElementById(stripId);
            if (strip) {
                // Since the strip has 10 digits (0-9), each digit takes exactly 10% of height.
                // We multiply the digit value by 10 to get the scroll percentage.
                const percentage = digitValue * 10;
                strip.style.transform = `translateY(-${percentage}%)`;
            }
        };
        
        // Helper to update a 2-digit rolling box
        const updateRollingNumber = (numberPrefix, value) => {
            const safeValue = Math.max(0, Math.floor(value));
            const tens = Math.floor(safeValue / 10);
            const units = safeValue % 10;
            updateRollingDigit(`${numberPrefix}-tens`, tens);
            updateRollingDigit(`${numberPrefix}-units`, units);
        };

        const updateTimer = () => {
            const now = new Date().getTime();
            const distance = targetDate - now;
            
            if (distance < 0) {
                clearInterval(countdownInterval);
                updateRollingNumber("days", 0);
                updateRollingNumber("hours", 0);
                updateRollingNumber("minutes", 0);
                updateRollingNumber("seconds", 0);
                return;
            }
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Call our rolling updates
            updateRollingNumber("days", days);
            updateRollingNumber("hours", hours);
            updateRollingNumber("minutes", minutes);
            updateRollingNumber("seconds", seconds);
        };
        
        // Run once immediately on load
        updateTimer();
        
        // Run every second
        const countdownInterval = setInterval(updateTimer, 1000);
    };
    initCountdown();

    // =================================================================
    // 7. LIGHTBOX GALLERY LOGIC
    // =================================================================
    const initLightbox = () => {
        const modal = document.getElementById("lightbox-modal");
        const modalImg = document.getElementById("lightbox-img");
        const captionText = document.getElementById("lightbox-caption");
        const closeBtn = document.querySelector(".lightbox-close");
        const prevBtn = document.querySelector(".lightbox-prev");
        const nextBtn = document.querySelector(".lightbox-next");
        const galleryItems = document.querySelectorAll(".gallery-item");
        
        let activeIndex = 0;
        const totalImages = WEDDING_CONFIG.gallery.length;

        // Open modal
        galleryItems.forEach(item => {
            item.addEventListener("click", () => {
                const index = parseInt(item.getAttribute("data-index"));
                openImage(index);
            });
        });

        const openImage = (index) => {
            activeIndex = index;
            const imgData = WEDDING_CONFIG.gallery[index];
            
            modal.classList.add("show");
            modalImg.src = imgData.src;
            captionText.textContent = imgData.caption;
            
            // Lock body scroll
            document.body.style.overflow = "hidden";
        };

        // Close modal
        const closeModal = () => {
            modal.classList.remove("show");
            document.body.style.overflow = "auto";
        };

        closeBtn.addEventListener("click", closeModal);
        modal.addEventListener("click", (e) => {
            if (e.target === modal || e.target === document.querySelector(".lightbox-content-wrapper")) {
                closeModal();
            }
        });

        // Navigation
        const showNext = () => {
            activeIndex = (activeIndex + 1) % totalImages;
            updateLightboxContent();
        };

        const showPrev = () => {
            activeIndex = (activeIndex - 1 + totalImages) % totalImages;
            updateLightboxContent();
        };

        const updateLightboxContent = () => {
            // CSS slide transition trigger helper
            modalImg.style.opacity = 0;
            setTimeout(() => {
                const imgData = WEDDING_CONFIG.gallery[activeIndex];
                modalImg.src = imgData.src;
                captionText.textContent = imgData.caption;
                modalImg.style.opacity = 1;
            }, 200);
        };

        nextBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            showNext();
        });
        
        prevBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            showPrev();
        });

        // Keyboard navigation
        document.addEventListener("keydown", (e) => {
            if (!modal.classList.contains("show")) return;
            
            if (e.key === "Escape") closeModal();
            if (e.key === "ArrowRight") showNext();
            if (e.key === "ArrowLeft") showPrev();
        });
    };
    initLightbox();

    // =================================================================
    // 8. RSVP & GUESTBOOK SYSTEM (LOCALSTORAGE INTEGRATION)
    // =================================================================
    const initGuestbook = () => {
        const rsvpForm = document.getElementById("rsvp-form");
        const commentsList = document.getElementById("comments-list");
        
        // Load existing wishes from localStorage or set default
        let wishes = JSON.parse(localStorage.getItem("wedding_wishes")) || [
            {
                name: "Daeng Malewa",
                status: "Hadir",
                message: "Salama' ki napada salama', Aznur dan Masna. Semoga bahtera rumah tangga kalian dipenuhi berkah (*barakka*) dari Allah SWT, dilimpahi sakinah, mawaddah, warahmah. Amin.",
                time: "2 jam yang lalu"
            },
            {
                name: "Hj. Andi Bau",
                status: "Hadir",
                message: "Selamat menempuh hidup baru anakku. Semoga pernikahan ini menyatukan dua keluarga besar dengan penuh cinta dan kedamaian.",
                time: "4 jam yang lalu"
            },
            {
                name: "Irwan Saputra",
                status: "Masih Ragu",
                message: "Selamat Aznur & Masna! Doa terbaik dari kami sekeluarga di Makassar, semoga dimudahkan segalanya sampai hari H nanti.",
                time: "1 hari yang lalu"
            }
        ];

        const renderComments = () => {
            // Clear current list except placeholder if list empty
            commentsList.innerHTML = "";
            
            if (wishes.length === 0) {
                commentsList.innerHTML = '<p class="text-muted text-center py-4">Belum ada ucapan. Jadilah yang pertama!</p>';
                return;
            }

            // Render wishes in reverse chronological order
            wishes.slice().reverse().forEach(wish => {
                const commentItem = document.createElement("div");
                commentItem.className = "comment-item";
                
                // Set badge color based on status
                let badgeClass = "status-hadir";
                if (wish.status === "Masih Ragu") badgeClass = "status-ragu";
                if (wish.status === "Tidak Hadir") badgeClass = "status-tidak";

                commentItem.innerHTML = `
                    <div class="comment-header">
                        <span class="comment-author">${escapeHTML(wish.name)}</span>
                        <span class="badge ${badgeClass}">${wish.status}</span>
                    </div>
                    <p class="comment-text">${escapeHTML(wish.message)}</p>
                    <span class="comment-time">${wish.time}</span>
                `;
                commentsList.appendChild(commentItem);
            });
        };

        const escapeHTML = (str) => {
            return str.replace(/[&<>'"]/g, 
                tag => ({
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    "'": '&#39;',
                    '"': '&quot;'
                }[tag] || tag)
            );
        };

        // Form Submission
        rsvpForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const nameInput = document.getElementById("form-name").value.trim();
            const statusSelect = document.getElementById("form-status").value;
            const messageInput = document.getElementById("form-message").value.trim();
            
            if (!nameInput || !statusSelect || !messageInput) return;

            const newWish = {
                name: nameInput,
                status: statusSelect,
                message: messageInput,
                time: "Baru saja"
            };

            // Add to wishes array & save
            wishes.push(newWish);
            localStorage.setItem("wedding_wishes", JSON.stringify(wishes));
            
            // Re-render comments with a sweet typing sound or visual feedback
            renderComments();
            
            // Reset form fields
            rsvpForm.reset();
            
            // Show toast notification
            showToast("Ucapan & RSVP berhasil dikirim!");
        });

        // Initial render
        renderComments();
    };
    initGuestbook();

    // =================================================================
    // 9. COPY BANK ACCOUNT TO CLIPBOARD
    // =================================================================
    const initCopyGifts = () => {
        const copyBtns = document.querySelectorAll(".btn-copy");
        
        copyBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const targetId = btn.getAttribute("data-target");
                const accountText = document.getElementById(targetId).textContent;
                
                // Clean the separators (optional, we copy exactly what is shown)
                const cleanAccount = accountText.replace(/-/g, "").trim();
                
                navigator.clipboard.writeText(cleanAccount).then(() => {
                    showToast("Nomor rekening berhasil disalin!");
                    
                    // Add temporary visual feedback on button
                    const originalHTML = btn.innerHTML;
                    btn.innerHTML = '<i class="fas fa-check"></i> Tersalin!';
                    btn.classList.add("copied");
                    
                    setTimeout(() => {
                        btn.innerHTML = originalHTML;
                        btn.classList.remove("copied");
                    }, 2000);
                }).catch(err => {
                    console.error("Failed to copy text: ", err);
                    // Fallback using older execCommand method
                    const tempInput = document.createElement("input");
                    tempInput.value = cleanAccount;
                    document.body.appendChild(tempInput);
                    tempInput.select();
                    document.execCommand("copy");
                    document.body.removeChild(tempInput);
                    showToast("Nomor rekening berhasil disalin!");
                });
            });
        });
    };
    initCopyGifts();

    // Helper to display floating Toast
    const showToast = (message) => {
        const toast = document.getElementById("toast");
        toast.textContent = message;
        toast.classList.add("show");
        
        setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    };

    // =================================================================
    // 10. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
    // =================================================================
    const initScrollReveal = () => {
        const revealElements = document.querySelectorAll(".scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-fade");
        
        const observerOptions = {
            root: null, // viewport
            threshold: 0.01, // trigger immediately when any part is visible
            rootMargin: "0px" // no margin crop, guarantees 100% visibility when on screen
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");
                } else {
                    // Safeguard: Do not hide hero elements if the user is still at the top of the page
                    const isHeroElement = entry.target.closest("#hero");
                    if (isHeroElement && window.scrollY < 50) {
                        entry.target.classList.add("revealed");
                    } else {
                        entry.target.classList.remove("revealed");
                    }
                }
            });
        }, observerOptions);
        
        revealElements.forEach(el => {
            observer.observe(el);
        });
    };

    // =================================================================
    // 11. ADD TO CALENDAR LINK LOGIC
    // =================================================================
    const initCalendarLinks = () => {
        const calBtns = document.querySelectorAll(".btn-add-calendar");
        
        calBtns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                const title = btn.getAttribute("data-title");
                const startStr = btn.getAttribute("data-start");
                const loc = btn.getAttribute("data-loc");
                
                // Formulate simple Google Calendar URL
                // Format: YYYYMMDDTHHMMSSZ
                const startDate = new Date(startStr);
                const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // add 2 hours
                
                const formatCalendarDate = (date) => {
                    return date.toISOString().replace(/-|:|\.\d\d\d/g, "");
                };
                
                const datesParam = `${formatCalendarDate(startDate)}/${formatCalendarDate(endDate)}`;
                
                const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${datesParam}&details=${encodeURIComponent("Pernikahan Suci Aznur & Masna - Mohon doa restu Anda.")}&location=${encodeURIComponent(loc)}&sf=true&output=xml`;
                
                window.open(googleCalUrl, "_blank");
            });
        });
    };
    initCalendarLinks();

    // =================================================================
    // 12. SMOOTH PARALLAX SCROLL FOR COUPLE IMAGES (WALKING MOTION)
    // =================================================================
    const initCoupleParallax = () => {
        const coupleImages = document.querySelectorAll(".couple-img");
        
        const updateParallax = () => {
            coupleImages.forEach(img => {
                const rect = img.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                
                // Check if the image is visible in the viewport
                if (rect.top < viewportHeight && rect.bottom > 0) {
                    const totalPath = viewportHeight + rect.height;
                    const currentPos = viewportHeight - rect.top;
                    const percent = currentPos / totalPath; // 0 to 1
                    
                    // Translate vertically from -18px to +18px as we scroll
                    const maxTravel = 18;
                    const translateY = (percent * maxTravel * 2) - maxTravel; // -18px to +18px
                    
                    img.style.transform = `scale(1.05) translateY(${translateY}px)`;
                }
            });
        };
        
        window.addEventListener("scroll", updateParallax, { passive: true });
        // Initial run
        updateParallax();
    };
    initCoupleParallax();

    // =================================================================
    // 13. VIDEO BACKGROUND START-TIME & LOOP CONTROL
    // =================================================================
    const initVideoSeek = () => {
        const bgVideo = document.getElementById("bg-video");
        if (bgVideo) {
            // Force seek to 4 seconds immediately on play or when it loops back to 0
            bgVideo.addEventListener("timeupdate", () => {
                if (bgVideo.currentTime < 4) {
                    bgVideo.currentTime = 4;
                }
            });
        }
    };
    initVideoSeek();

});
