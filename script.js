/**
 * ABDUL MANAN — PORTFOLIO JAVASCRIPT
 * Inspired by uzairmanan.com
 * High-performance, vanilla JS with zero external dependencies.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. Opening Preloader Curtain Animation
     -------------------------------------------------------------------------- */
  const preloader = document.getElementById('preloader');
  
  // Sequence preloader reveal
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (preloader) {
        preloader.classList.add('loaded');
        // Trigger initial hero reveals
        triggerHeroReveal();
      }
    }, 1200);
  });

  // Fallback if window load already completed or takes too long
  setTimeout(() => {
    if (preloader && !preloader.classList.contains('loaded')) {
      preloader.classList.add('loaded');
      triggerHeroReveal();
    }
  }, 2200);

  function triggerHeroReveal() {
    const heroReveals = document.querySelectorAll('#home .reveal-fade, #home .reveal-clip');
    heroReveals.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('revealed');
      }, index * 100);
    });
  }


  /* --------------------------------------------------------------------------
     2. Custom Magnetic & Trailing Cursor
     -------------------------------------------------------------------------- */
  const cursorDot = document.getElementById('cursor-dot');
  const cursorFollower = document.getElementById('cursor-follower');
  const viewMoreBadge = document.getElementById('view-more-badge');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let followerX = mouseX;
  let followerY = mouseY;
  let isHoveringProject = false;

  if (cursorDot && cursorFollower) {
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;

      if (viewMoreBadge) {
        viewMoreBadge.style.left = `${mouseX}px`;
        viewMoreBadge.style.top = `${mouseY}px`;
      }
    });

    // Smooth Lerp Follower loop
    function renderCursor() {
      followerX += (mouseX - followerX) * 0.18;
      followerY += (mouseY - followerY) * 0.18;

      cursorFollower.style.left = `${followerX}px`;
      cursorFollower.style.top = `${followerY}px`;

      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Interactive link hover expansion
    const interactives = document.querySelectorAll('a, button, .skill-cell, input, [role="button"]');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (!isHoveringProject) {
          cursorFollower.style.width = '54px';
          cursorFollower.style.height = '54px';
          cursorFollower.style.borderColor = 'rgba(13, 13, 13, 0.6)';
        }
      });
      el.addEventListener('mouseleave', () => {
        if (!isHoveringProject) {
          cursorFollower.style.width = '32px';
          cursorFollower.style.height = '32px';
          cursorFollower.style.borderColor = 'rgba(13, 13, 13, 0.35)';
        }
      });
    });

    // Project row "View More" badge trigger
    const projectRows = document.querySelectorAll('.project-row');
    projectRows.forEach(row => {
      row.addEventListener('mouseenter', () => {
        isHoveringProject = true;
        cursorFollower.style.opacity = '0';
        cursorDot.style.opacity = '0';
        if (viewMoreBadge) viewMoreBadge.classList.add('active');
      });
      row.addEventListener('mouseleave', () => {
        isHoveringProject = false;
        cursorFollower.style.opacity = '1';
        cursorDot.style.opacity = '1';
        if (viewMoreBadge) viewMoreBadge.classList.remove('active');
      });
    });

    // Window boundary cursor visibility
    document.addEventListener('mouseleave', () => {
      cursorDot.style.opacity = '0';
      cursorFollower.style.opacity = '0';
      if (viewMoreBadge) viewMoreBadge.classList.remove('active');
    });

    document.addEventListener('mouseenter', () => {
      if (!isHoveringProject) {
        cursorDot.style.opacity = '1';
        cursorFollower.style.opacity = '1';
      }
    });
  }


  /* --------------------------------------------------------------------------
     3. Dynamic Sticky Header on Scroll
     -------------------------------------------------------------------------- */
  const siteHeader = document.querySelector('header.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }
  }, { passive: true });


  /* --------------------------------------------------------------------------
     4. IntersectionObserver Scroll Reveals
     -------------------------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal-fade:not(#home *), .reveal-clip:not(#home *)');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('revealed'));
  }


  /* --------------------------------------------------------------------------
     5. Project Data & Fullscreen Slide-Up Modal Controller
     -------------------------------------------------------------------------- */
  let projectsData = [
    // --- SHOPIFY DEVELOPMENT (5 Projects) ---
    {
      id: '01',
      title: 'toylicious.pk',
      category: 'Shopify Development',
      catKey: 'shopify',
      year: '2026',
      summary: 'High-conversion Shopify e-commerce store for premium toys and kids lifestyle.',
      tech: ['Shopify', 'Liquid', 'Custom Theme', 'Payment Gateway', 'Conversion UI'],
      description: 'A bespoke Shopify e-commerce storefront created for Toylicious Pakistan. Features customized Liquid templating, frictionless mobile-first checkout, dynamic product bundles, automated inventory tracking, and localized cash on delivery and online payment gateways.',
      liveUrl: 'https://toylicious.pk',
      githubUrl: 'https://github.com/Handsomemalik',
      isClientProject: true
    },
    {
      id: '02',
      title: 'bunaaz.com',
      category: 'Shopify Development',
      catKey: 'shopify',
      year: '2025',
      summary: 'Designer luxury apparel and eastern fashion boutique online store.',
      tech: ['Shopify Plus', 'Custom CSS', 'Speed Optimization', 'Klaviyo', 'Lookbook UI'],
      description: 'High-end fashion e-commerce platform built for Bunaaz. Crafted with editorial luxury aesthetics, high-resolution lookbook galleries, real-time size guides, quick-cart slideout drawer, and ultra-fast page load times.',
      liveUrl: 'https://bunaaz.com',
      githubUrl: 'https://github.com/Handsomemalik',
      isClientProject: true
    },
    {
      id: '03',
      title: 'tfgpak.com',
      category: 'Shopify Development',
      catKey: 'shopify',
      year: '2025',
      summary: 'Handcrafted leather goods, footwear & accessories e-commerce store.',
      tech: ['Shopify', 'Liquid', 'Custom UI/UX', 'SEO Optimization', 'Multi-Currency'],
      description: 'E-commerce platform for TFG Pakistan featuring intuitive footwear sizing guides, collection filters, international multi-currency pricing, and responsive mobile architecture.',
      liveUrl: 'https://tfgpak.com',
      githubUrl: 'https://github.com/Handsomemalik',
      isClientProject: true
    },
    {
      id: '04',
      title: 'amilya.pk',
      category: 'Shopify Development',
      catKey: 'shopify',
      year: '2025',
      summary: 'Women’s designer pret, festive collections & eastern wear brand store.',
      tech: ['Shopify', 'Responsive Web', 'Fast Checkout', 'Analytics', 'Custom Liquid'],
      description: 'Comprehensive Shopify store engineered for Amilya, emphasizing rapid mobile navigation, seasonal collection drops, promotional banner popups, and automated order notifications.',
      liveUrl: 'https://amilya.pk',
      githubUrl: 'https://github.com/Handsomemalik',
      isClientProject: true
    },
    {
      id: '05',
      title: 'palakandmehak.com',
      category: 'Shopify Development',
      catKey: 'shopify',
      year: '2024',
      summary: 'Exclusive couture pret & handcrafted designer jewelry boutique.',
      tech: ['Shopify', 'Custom Theme', 'Liquid', 'Social Commerce', 'International Shipping'],
      description: 'Luxury digital boutique for Palak & Mehak. Engineered with custom grid layouts, high-fashion typography, social proof feeds, custom order inquiry forms, and worldwide shipping calculation.',
      liveUrl: 'https://palakandmehak.com',
      githubUrl: 'https://github.com/Handsomemalik',
      isClientProject: true
    },

    // --- AI PROJECTS (3 Projects) ---
    {
      id: '06',
      title: 'AI Email Writer',
      category: 'AI Projects',
      catKey: 'ai',
      year: '2026',
      summary: '3D animated site for an AI email-writing & smart copy generator.',
      tech: ['HTML', 'CSS', 'JavaScript', '3D Motion', 'REST APIs', 'LLM Prompting'],
      description: 'An AI-powered communication assistant featuring interactive 3D product visualizers and fluid physics. Generates executive proposals, client follow-ups, and sales outreach with customizable tone and real-time composition preview.',
      liveUrl: '#',
      githubUrl: 'https://github.com/Handsomemalik',
      isClientProject: false
    },
    {
      id: '07',
      title: 'AI Finance Registrar Agent',
      category: 'AI Projects',
      catKey: 'ai',
      year: '2025',
      summary: 'Autonomous financial ledger entry, invoice parsing & tax classification agent.',
      tech: ['Python', 'Node.js', 'LLM Agent', 'Antigravity IDE', 'Financial Analytics'],
      description: 'Autonomous financial bookkeeping agent engineered with Antigravity IDE. Automatically digests incoming invoice receipts, classifies transactions into double-entry accounting records, reconciles bank records, and detects recurring anomalies.',
      liveUrl: '#',
      githubUrl: 'https://github.com/Handsomemalik',
      isClientProject: true
    },
    {
      id: '08',
      title: 'AI Interviewer Agent',
      category: 'AI Projects',
      catKey: 'ai',
      year: '2025',
      summary: 'Interactive automated candidate assessment, mock interview & evaluation agent.',
      tech: ['AI/LLM', 'React', 'Voice/Speech Analysis', 'Antigravity IDE', 'WebRTC'],
      description: 'Autonomous conversational agent designed for technical and behavioral candidate assessments. Features real-time voice and transcript analysis, contextual follow-up questioning, objective scoring rubrics, and automated candidate summaries.',
      liveUrl: '#',
      githubUrl: 'https://github.com/Handsomemalik',
      isClientProject: false
    },

    // --- WORDPRESS DEVELOPMENT (8 Projects) ---
    {
      id: '09',
      title: 'ecotech.pk',
      category: 'WordPress Development',
      catKey: 'wordpress',
      year: '2025',
      summary: 'Green energy, solar technology & sustainable engineering corporate website.',
      tech: ['WordPress', 'Elementor Pro', 'Custom ROI Calculator', 'SEO Optimization'],
      description: 'Corporate business website for Ecotech Pakistan. Includes an interactive solar savings calculator, technical product datasheets, installation portfolio galleries, and direct WhatsApp lead generation.',
      liveUrl: 'https://ecotech.pk',
      githubUrl: 'https://github.com/Handsomemalik',
      isClientProject: true
    },
    {
      id: '10',
      title: 'moseyparis.com',
      category: 'WordPress Development',
      catKey: 'wordpress',
      year: '2025',
      summary: 'Luxury fragrance & European lifestyle brand portal and e-commerce experience.',
      tech: ['WordPress', 'WooCommerce', 'Bespoke Theme', 'Stripe', 'Perfume Visualizer'],
      description: 'Editorial luxury e-commerce experience built for Mosey Paris. Features custom typography, interactive fragrance pyramid diagrams (top, heart, and base notes), and multi-currency international billing.',
      liveUrl: 'https://moseyparis.com',
      githubUrl: 'https://github.com/Handsomemalik',
      isClientProject: true
    },
    {
      id: '11',
      title: 'royalwrist.pk',
      category: 'WordPress Development',
      catKey: 'wordpress',
      year: '2024',
      summary: 'High-end timepiece & luxury watch collection retailer website.',
      tech: ['WordPress', 'WooCommerce', 'Custom Brand Filters', 'High-Speed CDN'],
      description: 'Luxury watch retail platform with brand catalogs, serial authenticity inquiry forms, advanced facet filtering, and automated customer order notifications.',
      liveUrl: 'https://royalwrist.pk',
      githubUrl: 'https://github.com/Handsomemalik',
      isClientProject: true
    },
    {
      id: '12',
      title: 'luxstyle.pk',
      category: 'WordPress Development',
      catKey: 'wordpress',
      year: '2024',
      summary: 'Modern beauty, cosmetic & lifestyle store with optimized checkout.',
      tech: ['WordPress', 'Elementor', 'WooCommerce', 'Speed Optimization', 'Review System'],
      description: 'Fast, mobile-optimized WordPress store for LuxStyle. Features customer review visualizers, bundle promotions, upselling drawers, and smooth one-page checkout.',
      liveUrl: 'https://luxstyle.pk',
      githubUrl: 'https://github.com/Handsomemalik',
      isClientProject: true
    },
    {
      id: '13',
      title: 'ebone.net.pk',
      category: 'WordPress Development',
      catKey: 'wordpress',
      year: '2024',
      summary: 'Corporate telecommunications, fiber & ISP infrastructure platform.',
      tech: ['WordPress', 'Corporate Portal', 'Interactive Coverage Map', 'Ticket System'],
      description: 'Enterprise ISP portal built for E-Bone Networks. Includes interactive network coverage checking, broadband package comparisons, corporate SLA inquiry forms, and customer support integration.',
      liveUrl: 'https://ebone.net.pk',
      githubUrl: 'https://github.com/Handsomemalik',
      isClientProject: true
    },
    {
      id: '14',
      title: 'apnagharapnizameen.com',
      category: 'WordPress Development',
      catKey: 'wordpress',
      year: '2023',
      summary: 'Real estate, plot development & property listings marketplace platform.',
      tech: ['WordPress', 'Advanced Custom Fields', 'Map Integration', 'WhatsApp Leads'],
      description: 'Comprehensive property portal for Apna Ghar Apni Zameen. Built with custom post types for residential and commercial listings, installment schedule calculators, and direct WhatsApp agent routing.',
      liveUrl: 'https://apnagharapnizameen.com',
      githubUrl: 'https://github.com/Handsomemalik',
      isClientProject: true
    },
    {
      id: '15',
      title: 'pakref.com',
      category: 'WordPress Development',
      catKey: 'wordpress',
      year: '2023',
      summary: 'Industrial refrigeration, HVAC & cooling technology commercial catalog.',
      tech: ['WordPress', 'B2B Product Catalog', 'RFQ System', 'Technical Documentation'],
      description: 'Commercial refrigeration platform built for PakRef. Includes technical downloadable specifications, compressor parts catalogs, quotation request modules, and multi-category filtering.',
      liveUrl: 'https://pakref.com',
      githubUrl: 'https://github.com/Handsomemalik',
      isClientProject: true
    },
    {
      id: '16',
      title: 'alternativemedicinestore.com',
      category: 'WordPress Development',
      catKey: 'wordpress',
      year: '2023',
      summary: 'Natural health, organic supplements & herbal wellness online store.',
      tech: ['WordPress', 'WooCommerce', 'Prescription Upload', 'SSL Security', 'Filter System'],
      description: 'Holistic health e-commerce portal for Alternative Medicine Store. Features herbal category taxonomy, ailment-based searching, doctor appointment forms, and secure digital payments.',
      liveUrl: 'https://alternativemedicinestore.com',
      githubUrl: 'https://github.com/Handsomemalik',
      isClientProject: true
    }
  ];

  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalIndexTag = document.getElementById('modalIndexTag');
  const modalCategoryTag = document.getElementById('modalCategoryTag');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const modalTechTags = document.getElementById('modalTechTags');
  const modalLiveBtn = document.getElementById('modalLiveBtn');
  const modalGithubBtn = document.getElementById('modalGithubBtn');

  // Open modal with specific project index
  function openProjectModal(index) {
    const project = projectsData[index];
    if (!project || !projectModal) return;

    modalIndexTag.textContent = `${project.id} / ${String(projectsData.length).padStart(2, '0')}`;
    modalCategoryTag.textContent = project.category;
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;

    // Clear and fill tech badges
    modalTechTags.innerHTML = '';
    project.tech.forEach(techItem => {
      const pill = document.createElement('span');
      pill.className = 'modal-tech-pill';
      pill.textContent = techItem;
      modalTechTags.appendChild(pill);
    });

    // Update buttons
    modalLiveBtn.href = project.liveUrl;
    modalGithubBtn.href = project.githubUrl;

    projectModal.classList.add('open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Hide custom view-more badge if active
    if (viewMoreBadge) viewMoreBadge.classList.remove('active');
  }

  // Close modal
  function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.remove('open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Attach click to each project row
  let rows = document.querySelectorAll('.project-row');
  rows.forEach((row) => {
    row.addEventListener('click', () => {
      const idx = parseInt(row.getAttribute('data-project-index'), 10);
      if (!isNaN(idx)) openProjectModal(idx);
    });
  });

  // Close triggers
  modalCloseBtn?.addEventListener('click', closeProjectModal);
  
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal?.classList.contains('open')) {
      closeProjectModal();
    }
  });

  // Clicking outside modal content
  projectModal?.addEventListener('click', (e) => {
    if (e.target === projectModal) {
      closeProjectModal();
    }
  });


  /* --------------------------------------------------------------------------
     5b. Interactive Resume / CV Lightbox Modal Controller
     -------------------------------------------------------------------------- */
  const resumeModal = document.getElementById('resumeModal');
  const resumeModalCloseBtn = document.getElementById('resumeModalCloseBtn');
  const resumeTriggers = document.querySelectorAll('.resume-open-trigger');

  function openResumeModal(e) {
    if (e) {
      // Allow users to open in new tab natively using middle-click or Ctrl/Cmd-click
      if (e.metaKey || e.ctrlKey || e.button === 1) return;
      e.preventDefault();
    }
    if (!resumeModal) return;
    resumeModal.classList.add('open');
    resumeModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeResumeModal() {
    if (!resumeModal) return;
    resumeModal.classList.remove('open');
    resumeModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  resumeTriggers.forEach((trigger) => {
    trigger.addEventListener('click', openResumeModal);
  });

  resumeModalCloseBtn?.addEventListener('click', closeResumeModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal?.classList.contains('open')) {
      closeResumeModal();
    }
  });

  resumeModal?.addEventListener('click', (e) => {
    if (e.target === resumeModal) {
      closeResumeModal();
    }
  });

  // CV Print Functionality
  const resumePrintBtn = document.getElementById('resumePrintBtn');

  function triggerCvPrint() {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      window.print();
      return;
    }
    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Abdul Manan — Curriculum Vitae</title>
        <style>
          @page { size: letter portrait; margin: 0; }
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { background: #fff; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
          img { width: 100%; height: auto; max-width: 100%; display: block; }
        </style>
      </head>
      <body>
        <img src="Abdul_Manan_CV_High_Quality.png" alt="Abdul Manan CV" onload="window.focus(); window.print(); window.close();" />
      </body>
      </html>
    `);
    printWindow.document.close();
  }

  resumePrintBtn?.addEventListener('click', triggerCvPrint);

  // Copy Direct CV Link
  const copyCvLinkBtn = document.getElementById('copyCvLinkBtn');
  copyCvLinkBtn?.addEventListener('click', () => {
    const cvUrl = new URL('Abdul_Manan_CV_High_Quality.png', window.location.href).href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(cvUrl).then(() => {
        showToast('CV Direct link copied to clipboard!');
      }).catch(() => {
        showToast(cvUrl);
      });
    } else {
      showToast(cvUrl);
    }
  });


  /* --------------------------------------------------------------------------
     5c. Interactive Project Category Tabs & Staggered Animations
     -------------------------------------------------------------------------- */
  const categoryTabBtns = document.querySelectorAll('.category-tab-btn');
  let categoryBanners = document.querySelectorAll('.category-group-banner');

  function filterProjectsByCategory(selectedCat) {
    // Update active tab button
    categoryTabBtns.forEach(btn => {
      if (btn.getAttribute('data-category') === selectedCat) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Filter group banners
    categoryBanners.forEach(banner => {
      const bannerCat = banner.getAttribute('data-category');
      if (selectedCat === 'all' || bannerCat === selectedCat) {
        banner.classList.remove('filter-hidden');
      } else {
        banner.classList.add('filter-hidden');
      }
    });

    // Filter and animate project rows
    let visibleCount = 0;
    rows.forEach(row => {
      const rowCat = row.getAttribute('data-category');
      if (selectedCat === 'all' || rowCat === selectedCat) {
        row.classList.remove('filter-hidden');
        row.classList.add('filter-animated');
        row.style.animationDelay = `${visibleCount * 35}ms`;
        visibleCount++;
      } else {
        row.classList.add('filter-hidden');
        row.classList.remove('filter-animated');
      }
    });

    // Clean up animation class after animation completes
    setTimeout(() => {
      rows.forEach(r => r.classList.remove('filter-animated'));
    }, 600);
  }

  categoryTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-category');
      filterProjectsByCategory(cat);
    });
  });

  // Clicking group banners directly filters to that category
  categoryBanners.forEach(banner => {
    banner.addEventListener('click', () => {
      const cat = banner.getAttribute('data-category');
      filterProjectsByCategory(cat);
    });
  });

  /* --------------------------------------------------------------------------
     5d. Dynamic Hydration from CMS (portfolio-data.json / localStorage)
     -------------------------------------------------------------------------- */
  async function hydratePortfolioFromCMS() {
    let cmsData = null;
    const local = localStorage.getItem('abdulmanan_portfolio_cms_data');
    if (local) {
      try { cmsData = JSON.parse(local); } catch (e) {}
    }
    if (!cmsData) {
      try {
        const res = await fetch('data/portfolio-data.json');
        if (res.ok) cmsData = await res.json();
      } catch (e) {}
    }

    if (!cmsData) return;

    // 1. Update Profile text
    if (cmsData.profile) {
      const p = cmsData.profile;
      if (p.title) {
        document.querySelectorAll('.hero-tag:first-child').forEach(el => el.textContent = p.title);
      }
      if (p.location) {
        document.querySelectorAll('.hero-tag:nth-child(3)').forEach(el => el.textContent = p.location);
      }
      if (p.experienceYears) {
        document.querySelectorAll('.hero-tag:nth-child(5)').forEach(el => el.textContent = p.experienceYears);
      }
      if (p.projectsCompleted) {
        document.querySelectorAll('.hero-tag:nth-child(7)').forEach(el => el.textContent = p.projectsCompleted);
      }
      if (p.tagline) {
        const taglineEl = document.querySelector('.hero-tagline');
        if (taglineEl) taglineEl.textContent = p.tagline;
      }
    }

    // 2. Update Projects and Case Studies
    if (Array.isArray(cmsData.projects) && cmsData.projects.length > 0) {
      projectsData.length = 0;
      cmsData.projects.forEach(item => projectsData.push(item));

      const projectsTable = document.querySelector('.projects-table');
      if (projectsTable) {
        const shopifyProjects = projectsData.filter(p => p.catKey === 'shopify');
        const aiProjects = projectsData.filter(p => p.catKey === 'ai');
        const wpProjects = projectsData.filter(p => p.catKey === 'wordpress');
        const otherProjects = projectsData.filter(p => !['shopify', 'ai', 'wordpress'].includes(p.catKey));

        function safeHtml(str) {
          if (!str) return '';
          return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        }

        function renderGroup(catTitle, catKey, items) {
          if (items.length === 0) return '';
          let g = `
            <div class="category-group-banner reveal-fade revealed" data-category="${catKey}" role="button" title="Click to filter ${catTitle}">
              <span class="category-group-title">
                <span class="category-group-indicator"></span>
                ${catTitle}
              </span>
              <span class="category-group-count">${items.length} Projects Delivered</span>
            </div>
          `;
          items.forEach(proj => {
            const globalIdx = projectsData.indexOf(proj);
            const numStr = String(globalIdx + 1).padStart(2, '0');
            const techStr = Array.isArray(proj.tech) ? proj.tech.join(' · ') : (proj.tech || '');
            g += `
              <div class="project-row reveal-fade revealed" data-category="${proj.catKey || catKey}" data-project-index="${globalIdx}" role="button" tabindex="0">
                <span class="project-row-year-bg">${(proj.catKey || 'PROJECT').toUpperCase()}</span>
                <span class="project-row-index">${numStr}</span>
                <div class="project-row-content">
                  <div class="project-row-title-bar">
                    <span class="project-row-title">${safeHtml(proj.title)}</span>
                    <span class="project-row-badge">${safeHtml(proj.category || '')}</span>
                  </div>
                  <span class="project-row-summary">${safeHtml(proj.summary || '')}</span>
                  <span class="project-row-tech">${safeHtml(techStr)}</span>
                </div>
                <span class="project-row-year">${safeHtml(proj.year || '')}</span>
                <span class="project-row-arrow" aria-hidden="true">→</span>
              </div>
            `;
          });
          return g;
        }

        let newHtml = '';
        newHtml += renderGroup('Shopify Development', 'shopify', shopifyProjects);
        newHtml += renderGroup('AI Projects', 'ai', aiProjects);
        newHtml += renderGroup('WordPress Development', 'wordpress', wpProjects);
        if (otherProjects.length > 0) {
          newHtml += renderGroup('Custom Web Apps', 'custom', otherProjects);
        }

        projectsTable.innerHTML = newHtml;

        // Update counts in tabs
        const countAll = document.querySelector('.category-tab-btn[data-category="all"] .category-tab-count');
        if (countAll) countAll.textContent = projectsData.length;
        const countShopify = document.querySelector('.category-tab-btn[data-category="shopify"] .category-tab-count');
        if (countShopify) countShopify.textContent = shopifyProjects.length;
        const countAi = document.querySelector('.category-tab-btn[data-category="ai"] .category-tab-count');
        if (countAi) countAi.textContent = aiProjects.length;
        const countWp = document.querySelector('.category-tab-btn[data-category="wordpress"] .category-tab-count');
        if (countWp) countWp.textContent = wpProjects.length;

        // Rebind click listeners to new project rows
        rows = document.querySelectorAll('.project-row');
        rows.forEach((row) => {
          row.addEventListener('click', () => {
            const idx = parseInt(row.getAttribute('data-project-index'), 10);
            if (!isNaN(idx)) openProjectModal(idx);
          });
        });

        // Rebind group banners
        categoryBanners = document.querySelectorAll('.category-group-banner');
        categoryBanners.forEach(banner => {
          banner.addEventListener('click', () => {
            const cat = banner.getAttribute('data-category');
            filterProjectsByCategory(cat);
          });
        });
      }
    }
  }

  // Hydrate immediately
  hydratePortfolioFromCMS();


  /* --------------------------------------------------------------------------
     6. Quick Copy Email & Feedback Toast
     -------------------------------------------------------------------------- */
  const emailTriggers = document.querySelectorAll('.copy-email-btn');
  const toastNotice = document.getElementById('toastNotice');

  emailTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'manan.dev9@gmail.com';
      
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied to clipboard!');
      }).catch(() => {
        showToast('manan.dev9@gmail.com');
      });
    });
  });

  function showToast(msg) {
    if (!toastNotice) return;
    toastNotice.textContent = msg;
    toastNotice.classList.add('show');
    setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 2800);
  }


  /* --------------------------------------------------------------------------
     7. Top Scroll Reading Progress Indicator
     -------------------------------------------------------------------------- */
  const scrollProgress = document.getElementById('scroll-progress');
  function updateScrollProgress() {
    if (!scrollProgress) return;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      const scrollPercent = (window.scrollY / docHeight) * 100;
      scrollProgress.style.width = `${Math.min(Math.max(scrollPercent, 0), 100)}%`;
    }
  }
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();


  /* --------------------------------------------------------------------------
     8. Dynamic Animated Stat Number Counters (About Section)
     -------------------------------------------------------------------------- */
  const statsContainer = document.querySelector('.about-stats-grid');
  let statsCounted = false;

  function runCounterAnimation() {
    if (statsCounted) return;
    statsCounted = true;

    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(el => {
      const target = parseInt(el.getAttribute('data-target'), 10) || 0;
      const suffix = el.getAttribute('data-suffix') || '';
      let startTime = null;
      const duration = 1600;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.floor(easeOut * target);
        el.textContent = `${currentVal}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = `${target}${suffix}`;
        }
      }
      requestAnimationFrame(step);
    });
  }

  if (statsContainer && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runCounterAnimation();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });
    statsObserver.observe(statsContainer);
  } else if (statsContainer) {
    runCounterAnimation();
  }


  /* --------------------------------------------------------------------------
     9. Interactive 3D Perspective Card Tilt (Contact Cards, Stats, Portrait, Skills)
     -------------------------------------------------------------------------- */
  const tiltElements = document.querySelectorAll('.contact-card-box, .stat-card, .about-portrait-frame, .skill-cell');

  tiltElements.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Subtle tilt: max ~6.5 degrees
      const rotX = -(y / (rect.height / 2)) * 6.5;
      const rotY = (x / (rect.width / 2)) * 6.5;

      card.style.transform = `perspective(750px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });


  /* --------------------------------------------------------------------------
     10. Magnetic Button Attraction Effect
     -------------------------------------------------------------------------- */
  const magneticButtons = document.querySelectorAll('.btn-cta-primary, .btn-cta-outline, .btn-pill, .category-tab-btn');

  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });


  /* --------------------------------------------------------------------------
     11. Hero Mouse Parallax Effect
     -------------------------------------------------------------------------- */
  const heroSection = document.getElementById('home');
  const heroPortrait = document.querySelector('.hero-portrait-thumb');
  const heroBgImg = document.querySelector('.hero-background-img');
  const heroStar = document.querySelector('.hero-star-icon');
  const heroFirst = document.querySelector('.hero-first-name');
  const heroLast = document.querySelector('.hero-last-name');

  if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const deltaX = (clientX - centerX) / centerX;
      const deltaY = (clientY - centerY) / centerY;

      if (heroBgImg) {
        heroBgImg.style.transform = `scale(1.03) translate(${deltaX * -8}px, ${deltaY * -5}px)`;
      }
      if (heroPortrait) {
        heroPortrait.style.transform = `translate(${deltaX * 10}px, ${deltaY * 8}px)`;
      }
      if (heroStar) {
        heroStar.style.transform = `translate(${deltaX * -14}px, ${deltaY * -10}px)`;
      }
      if (heroFirst) {
        heroFirst.style.transform = `translate(${deltaX * -4}px, ${deltaY * -3}px)`;
      }
      if (heroLast) {
        heroLast.style.transform = `translate(${deltaX * -6}px, ${deltaY * -4}px)`;
      }
    });

    heroSection.addEventListener('mouseleave', () => {
      if (heroBgImg) heroBgImg.style.transform = '';
      if (heroPortrait) heroPortrait.style.transform = '';
      if (heroStar) heroStar.style.transform = '';
      if (heroFirst) heroFirst.style.transform = '';
      if (heroLast) heroLast.style.transform = '';
    });
  }


  /* --------------------------------------------------------------------------
     12. Interactive Technical Expertise (Skill Cells) Click & Ripple Animation
     -------------------------------------------------------------------------- */
  const skillCells = document.querySelectorAll('.skill-cell');

  skillCells.forEach(cell => {
    // Click handler for interactive ripple and details expansion
    cell.addEventListener('click', (e) => {
      const rect = cell.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Spawn tactile click ripple
      const ripple = document.createElement('span');
      ripple.className = 'skill-ripple';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      cell.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 700);

      // Toggle active expansion
      const isAlreadyActive = cell.classList.contains('skill-active');
      
      // Close any other active skill cells for clean presentation
      skillCells.forEach(c => c.classList.remove('skill-active'));

      if (!isAlreadyActive) {
        cell.classList.add('skill-active');

        // Dynamic toast notification highlighting skill
        const skillName = cell.getAttribute('data-skill') || '';
        const skillExp = cell.getAttribute('data-exp') || '';
        const skillTag = cell.querySelector('.skill-detail-tag')?.textContent || '';
        if (skillName) {
          showToast(`⚡ ${skillName} (${skillExp}) — ${skillTag}`);
        }
      }
    });

    // Keyboard accessibility for Enter / Space
    cell.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        cell.click();
      }
    });
  });


  /* --------------------------------------------------------------------------
     13. Geometric Constellation Plexus Background Engine (60fps Smooth Canvas)
     Matches the minimalist dark node & hairline polygon network in user reference
     -------------------------------------------------------------------------- */
  const canvas = document.getElementById('constellation-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    let particles = [];
    let mouse = { x: -1000, y: -1000, active: false };
    let animationFrameId = null;

    function resizeCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
      ctx.scale(dpr, dpr);

      initParticles();
    }

    class PlexusParticle {
      constructor(isInitial = true) {
        this.reset(isInitial);
      }

      reset(isInitial = false) {
        this.x = isInitial ? Math.random() * width : (Math.random() > 0.5 ? (Math.random() > 0.5 ? -10 : width + 10) : Math.random() * width);
        this.y = isInitial ? Math.random() * height : (Math.random() > 0.5 ? (Math.random() > 0.5 ? -10 : height + 10) : Math.random() * height);

        // Node hierarchy: ~14% large focal nodes, ~40% medium nodes, ~46% fine dust nodes
        const rand = Math.random();
        if (rand < 0.14) {
          // Major focal node
          this.radius = 3.6 + Math.random() * 1.8;
          this.baseAlpha = 0.85 + Math.random() * 0.15;
          this.isMajor = true;
        } else if (rand < 0.54) {
          // Medium connection node
          this.radius = 2.0 + Math.random() * 1.2;
          this.baseAlpha = 0.55 + Math.random() * 0.25;
          this.isMajor = false;
        } else {
          // Fine ambient dust node
          this.radius = 1.0 + Math.random() * 0.8;
          this.baseAlpha = 0.25 + Math.random() * 0.25;
          this.isMajor = false;
        }

        // Smooth subtle drift speed
        const speed = 0.25 + Math.random() * 0.35;
        const angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;

        // Subtle breathing / organic pulsation
        this.pulseAngle = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.02 + Math.random() * 0.025;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.pulseAngle += this.pulseSpeed;

        // Interactive mouse soft repulsion and gravitational deflection
        if (mouse.active) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const repelRadius = 110;

          if (dist < repelRadius && dist > 0) {
            const force = (repelRadius - dist) / repelRadius;
            const pushX = (dx / dist) * force * 1.2;
            const pushY = (dy / dist) * force * 1.2;
            this.x += pushX;
            this.y += pushY;
          }
        }

        // Seamless screen edge wrap with margin
        const pad = 25;
        if (this.x < -pad) this.x = width + pad;
        else if (this.x > width + pad) this.x = -pad;
        if (this.y < -pad) this.y = height + pad;
        else if (this.y > height + pad) this.y = -pad;
      }

      draw() {
        const pulse = Math.sin(this.pulseAngle) * 0.25;
        const currentRadius = Math.max(0.8, this.radius + pulse);

        if (this.isMajor) {
          // Glassy outer halo ring for depth-of-field glass refraction
          ctx.beginPath();
          ctx.arc(this.x, this.y, currentRadius * 2.4, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(13, 13, 13, 0.04)';
          ctx.fill();

          // Anchor node with subtle ambient shadow blur
          ctx.save();
          ctx.shadowColor = 'rgba(0, 0, 0, 0.22)';
          ctx.shadowBlur = 8;
          ctx.fillStyle = `rgba(13, 13, 13, ${this.baseAlpha})`;
          ctx.beginPath();
          ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(20, 20, 20, ${this.baseAlpha})`;
          ctx.fill();
        }
      }
    }

    function initParticles() {
      // Density tuned for smooth 60fps across screen resolutions
      const isMobile = width < 768;
      const count = isMobile
        ? Math.min(42, Math.max(24, Math.floor((width * height) / 24000)))
        : Math.min(85, Math.max(48, Math.floor((width * height) / 16000)));

      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(new PlexusParticle(true));
      }
    }

    function animatePlexus() {
      ctx.clearRect(0, 0, width, height);

      const isMobile = width < 768;
      const connectDist = isMobile ? 95 : 135;
      const connectDistSq = connectDist * connectDist;
      const facetDist = isMobile ? 65 : 85;
      const facetDistSq = facetDist * facetDist;
      const mouseDist = 145;
      const mouseDistSq = mouseDist * mouseDist;

      const pLen = particles.length;

      // 1. Draw geometric connection lines and polygonal facet triangles
      for (let i = 0; i < pLen; i++) {
        const p1 = particles[i];

        // Draw connections between particle pairs
        for (let j = i + 1; j < pLen; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < connectDistSq) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / connectDist) * 0.28;

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(13, 13, 13, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();

            // Check triplet for subtle translucent triangular polygon facets
            if (distSq < facetDistSq) {
              for (let k = j + 1; k < pLen; k++) {
                const p3 = particles[k];
                const dx2 = p1.x - p3.x;
                const dy2 = p1.y - p3.y;
                const dist2Sq = dx2 * dx2 + dy2 * dy2;

                if (dist2Sq < facetDistSq) {
                  const dx3 = p2.x - p3.x;
                  const dy3 = p2.y - p3.y;
                  const dist3Sq = dx3 * dx3 + dy3 * dy3;

                  if (dist3Sq < facetDistSq) {
                    const avgDist = (dist + Math.sqrt(dist2Sq) + Math.sqrt(dist3Sq)) / 3;
                    const facetAlpha = (1 - avgDist / facetDist) * 0.025;

                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.lineTo(p3.x, p3.y);
                    ctx.closePath();
                    ctx.fillStyle = `rgba(13, 13, 13, ${facetAlpha})`;
                    ctx.fill();
                  }
                }
              }
            }
          }
        }

        // Draw interactive line to mouse cursor
        if (mouse.active) {
          const mdx = p1.x - mouse.x;
          const mdy = p1.y - mouse.y;
          const mDistSq = mdx * mdx + mdy * mdy;

          if (mDistSq < mouseDistSq) {
            const mDist = Math.sqrt(mDistSq);
            const mAlpha = (1 - mDist / mouseDist) * 0.38;

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(13, 13, 13, ${mAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // 2. Update and draw nodes
      for (let i = 0; i < pLen; i++) {
        particles[i].update();
        particles[i].draw();
      }

      animationFrameId = requestAnimationFrame(animatePlexus);
    }

    // Mouse listeners for interactive canvas dynamics
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    });

    window.addEventListener('mouseleave', () => {
      mouse.active = false;
    });

    window.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        mouse.active = true;
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        mouse.active = true;
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      mouse.active = false;
    });

    // Resize listener with debouncing
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resizeCanvas();
      }, 150);
    });

    // Page visibility management for optimal battery & CPU performance
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      } else {
        if (!animationFrameId) {
          animationFrameId = requestAnimationFrame(animatePlexus);
        }
      }
    });

    // Initialize and kick off 60fps animation
    resizeCanvas();
    animationFrameId = requestAnimationFrame(animatePlexus);
  }

});
