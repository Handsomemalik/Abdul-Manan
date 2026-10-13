/**
 * ABDUL MANAN — PORTFOLIO JAVASCRIPT
 * Inspired by uzairmanan.com
 * High-performance, vanilla JS with zero external dependencies.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     0. Interactive Theme Switcher (Dark / Light Theme with Persistence)
     -------------------------------------------------------------------------- */
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');

  function updateThemeUI(isDark) {
    themeToggleBtns.forEach(btn => {
      const textEl = btn.querySelector('.theme-toggle-text');
      if (textEl) {
        textEl.textContent = isDark ? 'Light' : 'Dark';
      }
      btn.setAttribute('aria-label', isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme');
      btn.setAttribute('title', isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme');
    });
  }

  function initTheme() {
    const savedTheme = localStorage.getItem('portfolio_theme');
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme ? (savedTheme === 'dark') : systemPrefersDark;

    if (isDark) {
      document.body.classList.add('dark-theme');
      document.documentElement.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
      document.documentElement.classList.remove('dark-theme');
    }
    updateThemeUI(isDark);
  }

  function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-theme');
    document.documentElement.classList.toggle('dark-theme', isDark);
    localStorage.setItem('portfolio_theme', isDark ? 'dark' : 'light');
    updateThemeUI(isDark);
    showToast(isDark ? 'Dark Theme Activated' : 'Light Theme Activated');
  }

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });

  // Listen for system theme changes if user hasn't explicitly set a preference
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('portfolio_theme')) {
        const newIsDark = e.matches;
        document.body.classList.toggle('dark-theme', newIsDark);
        document.documentElement.classList.toggle('dark-theme', newIsDark);
        updateThemeUI(newIsDark);
      }
    });
  }

  // Initialize theme immediately on DOM load
  initTheme();

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
     2. Standard Native OS Cursor (Simple, Default, Zero-Lag)
     -------------------------------------------------------------------------- */


  /* --------------------------------------------------------------------------
     3. Unified RAF-Throttled Scroll Handler (Sticky Header & Progress Bar)
     -------------------------------------------------------------------------- */
  const siteHeader = document.querySelector('header.site-header');
  const scrollProgressBar = document.getElementById('scroll-progress');
  let isScrollThrottled = false;
  let cachedDocHeight = document.documentElement.scrollHeight - window.innerHeight;

  window.addEventListener('resize', () => {
    cachedDocHeight = document.documentElement.scrollHeight - window.innerHeight;
  }, { passive: true });

  function handleUnifiedScroll() {
    if (!isScrollThrottled) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        // Sticky Header Toggle
        if (scrollY > 30) {
          siteHeader?.classList.add('scrolled');
        } else {
          siteHeader?.classList.remove('scrolled');
        }

        // Reading Progress Bar (GPU Composited scaleX)
        if (scrollProgressBar && cachedDocHeight > 0) {
          const ratio = Math.min(Math.max(scrollY / cachedDocHeight, 0), 1);
          scrollProgressBar.style.transform = `scaleX(${ratio})`;
        }

        isScrollThrottled = false;
      });
      isScrollThrottled = true;
    }
  }

  window.addEventListener('scroll', handleUnifiedScroll, { passive: true });
  handleUnifiedScroll();


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
    {
      id: '01',
      title: 'toylicious.pk',
      category: 'Shopify Development',
      catKey: 'shopify',
      year: '2026',
      isFeatured: true,
      projectType: 'Client E-Commerce Project',
      role: 'UI/UX Design & Shopify Development',
      summary: 'High-conversion Shopify e-commerce store for premium toys and kids lifestyle.',
      tech: ['Shopify', 'Liquid', 'Custom Theme', 'Payment Gateway', 'Conversion UI'],
      description: 'A bespoke Shopify e-commerce storefront created for Toylicious Pakistan. Features customized Liquid templating, frictionless mobile-first checkout, dynamic product bundles, and localized payment gateways.',
      caseStudy: {
        overview: 'A dedicated Shopify storefront for Toylicious Pakistan designed to present kids lifestyle and toy collections with joyful visual appeal and fast mobile purchasing.',
        myRole: 'UI/UX design of storefront layouts, custom Liquid theme implementation, product catalog structuring, and localized checkout integration.',
        problemGoal: 'Provide parents and shoppers with a friction-free mobile shopping experience with clean categorization, rapid product filtering, and trusted payment flows.',
        designDev: 'Developed a custom theme built on Shopify\'s latest architecture, utilizing responsive grid layouts, custom slideout mini-cart, and optimized image delivery.',
        keyFeatures: [
          'Frictionless mobile navigation and instant product filtering',
          'Dynamic bundle builder and product recommendation widgets',
          'Slideout cart drawer with free-shipping threshold bar',
          'Localized Cash-on-Delivery and online gateway integration'
        ],
        technology: 'Shopify Liquid, HTML5, CSS3, Vanilla JavaScript',
        finalResult: 'A fast, fully responsive e-commerce storefront operating live with smooth checkout and intuitive catalog discovery.'
      },
      liveUrl: 'https://toylicious.pk',
      githubUrl: 'https://github.com/Handsomemalik'
    },
    {
      id: '02',
      title: 'bunaaz.com',
      category: 'Shopify Development',
      catKey: 'shopify',
      year: '2025',
      isFeatured: true,
      projectType: 'Client E-Commerce Project',
      role: 'UI/UX & Frontend Development',
      summary: 'Designer luxury apparel and eastern fashion boutique online store.',
      tech: ['Shopify Plus', 'Liquid', 'Lookbook UI', 'Custom CSS', 'Speed Optimization'],
      description: 'High-end fashion e-commerce platform built for Bunaaz. Crafted with editorial luxury aesthetics, high-resolution lookbook galleries, real-time size guides, and ultra-fast page load times.',
      caseStudy: {
        overview: 'An editorial luxury fashion portal for designer pret and formal wear, combining high-fashion visual storytelling with a streamlined shopping flow.',
        myRole: 'End-to-end UI design, custom theme customization, lookbook grid development, and mobile responsiveness tuning.',
        problemGoal: 'Convey brand elegance and artisanal fabric detailing while maintaining rapid browsing speeds across cellular mobile connections.',
        designDev: 'Structured an editorial aesthetic using refined typography, spacious layout grids, sticky Add-to-Bag interactions, and responsive lookbook carousels.',
        keyFeatures: [
          'Interactive collection lookbook with direct product tagging',
          'Custom size guide modal with tailored measurements',
          'Smooth collection filtering by fabric, cut, and occasion',
          'Instant slideout cart with integrated currency selection'
        ],
        technology: 'Shopify Plus, Liquid, CSS Grid/Flexbox, JavaScript',
        finalResult: 'An elegant fashion destination with editorial visual hierarchy and streamlined mobile checkout.'
      },
      liveUrl: 'https://bunaaz.com',
      githubUrl: 'https://github.com/Handsomemalik'
    },
    {
      id: '03',
      title: 'AI Email Writer',
      category: 'AI Projects',
      catKey: 'ai',
      year: '2026',
      isFeatured: true,
      projectType: 'Concept / Personal Project',
      role: 'Interface Design & Web Development',
      summary: 'Interactive modern web application for AI email-writing and smart copy generation.',
      tech: ['UI/UX Design', 'JavaScript', 'HTML/CSS', 'REST APIs', 'AI Prompting'],
      description: 'An AI-powered communication assistant interface featuring responsive composition tools, customized tone selection, and instant real-time draft generation.',
      caseStudy: {
        overview: 'A web interface built to explore how professionals can generate structured, tone-adjusted emails and proposals through a clean, distraction-free workflow.',
        myRole: 'Concept formulation, UX wireframing, dark modern visual design, and interactive frontend implementation.',
        problemGoal: 'Streamline email drafting by replacing blank text areas with guided prompts, tone toggles, and instant previewing.',
        designDev: 'Designed a sleek dark UI with focused typography, micro-interactions, responsive form controls, and simulated real-time generation previews.',
        keyFeatures: [
          'Multi-tone selection (Formal, Concise, Sales Outreach, Executive)',
          'Real-time preview pane with instant one-click copy',
          'Responsive dark interface tailored for rapid desktop and mobile use',
          'Customizable prompt parameter controls'
        ],
        technology: 'Vanilla JavaScript, HTML5, Modern CSS, REST API integration architecture',
        finalResult: 'A focused, functional web application interface demonstrating clean UX for AI-assisted writing tools.'
      },
      liveUrl: '#',
      githubUrl: 'https://github.com/Handsomemalik'
    },
    {
      id: '04',
      title: 'ecotech.pk',
      category: 'WordPress Development',
      catKey: 'wordpress',
      year: '2025',
      isFeatured: true,
      projectType: 'Client Web Project',
      role: 'Web Development & UI Design',
      summary: 'Green energy, solar technology & sustainable engineering corporate website.',
      tech: ['WordPress', 'Elementor Pro', 'Custom ROI Calculator', 'Responsive UI'],
      description: 'Corporate business website for Ecotech Pakistan. Includes an interactive solar savings calculator, technical product datasheets, installation portfolio galleries, and direct lead generation.',
      caseStudy: {
        overview: 'A modern corporate platform for a renewable energy company, built to educate commercial and residential clients on solar solutions.',
        myRole: 'Corporate web design, WordPress theme development, solar ROI calculation logic, and responsive optimization.',
        problemGoal: 'Make complex solar technical specifications clear and accessible while generating qualified installation leads.',
        designDev: 'Engineered clear visual sections for residential, commercial, and industrial tiers, alongside an intuitive savings estimator tool.',
        keyFeatures: [
          'Interactive solar ROI and estimated energy savings calculator',
          'Downloadable technical datasheets for tier-1 inverters and panels',
          'Completed project showcase gallery with location filters',
          'Direct WhatsApp and quotation inquiry routing'
        ],
        technology: 'WordPress, Elementor, Custom JavaScript, CSS3',
        finalResult: 'A credible corporate presence establishing brand authority and generating direct inquiries.'
      },
      liveUrl: 'https://ecotech.pk',
      githubUrl: 'https://github.com/Handsomemalik'
    },
    {
      id: '05',
      title: 'AI Interviewer Agent',
      category: 'AI Projects',
      catKey: 'ai',
      year: '2025',
      isFeatured: true,
      projectType: 'Experimental Project',
      role: 'UI/UX Concept & AI Integration',
      summary: 'Interactive automated candidate assessment, mock interview & evaluation interface.',
      tech: ['AI/LLM', 'React', 'Voice/Text UI', 'Prompt Engineering'],
      description: 'Conversational interface designed for technical candidate assessments. Features guided questioning, structured prompt chains, and automated candidate performance rubrics.',
      caseStudy: {
        overview: 'An experimental web interface exploring automated mock interviews with contextual follow-up questions and standardized evaluation criteria.',
        myRole: 'UX flow architecture, conversational UI design, and interactive prototype implementation.',
        problemGoal: 'Design an objective, low-anxiety interview experience that guides candidates through structured evaluation prompts.',
        designDev: 'Built a clean, distraction-free conversational screen with real-time timers, question status indicators, and structured evaluation rubrics.',
        keyFeatures: [
          'Context-aware follow-up question sequence',
          'Structured scoring rubric display across technical competencies',
          'Accessible audio/text interface layout',
          'Concise candidate summary report generation'
        ],
        technology: 'React, JavaScript, Web APIs, CSS3',
        finalResult: 'A clear, working prototype demonstrating intuitive interaction design for conversational assessment tools.'
      },
      liveUrl: '#',
      githubUrl: 'https://github.com/Handsomemalik'
    },
    {
      id: '06',
      title: 'moseyparis.com',
      category: 'WordPress Development',
      catKey: 'wordpress',
      year: '2025',
      isFeatured: true,
      projectType: 'Client Web Project',
      role: 'Web Development & Theme Customization',
      summary: 'Luxury fragrance & European lifestyle brand portal and e-commerce experience.',
      tech: ['WordPress', 'WooCommerce', 'Bespoke Theme', 'Perfume Visualizer'],
      description: 'Editorial luxury e-commerce experience built for Mosey Paris. Features custom typography, interactive fragrance pyramid diagrams, and multi-currency billing.',
      caseStudy: {
        overview: 'A brand portal and boutique online store for luxury fragrances, blending editorial European aesthetics with an intuitive shopping experience.',
        myRole: 'Theme customization, WooCommerce store setup, fragrance notes visualizer styling, and responsive QA.',
        problemGoal: 'Communicate the olfactory character of artisanal perfumes digitally through immersive visuals and clear ingredient hierarchies.',
        designDev: 'Designed high-contrast editorial layouts with bespoke typography and interactive fragrance note diagrams (top, heart, base).',
        keyFeatures: [
          'Interactive fragrance pyramid breakdown',
          'Minimalist product presentation with ingredient stories',
          'Seamless WooCommerce checkout with currency switching',
          'Refined mobile navigation and product zoom'
        ],
        technology: 'WordPress, WooCommerce, Custom CSS, JavaScript',
        finalResult: 'A distinctive digital storefront reflecting luxury perfumery standards.'
      },
      liveUrl: 'https://moseyparis.com',
      githubUrl: 'https://github.com/Handsomemalik'
    },
    {
      id: '07',
      title: 'tfgpak.com',
      category: 'Shopify Development',
      catKey: 'shopify',
      year: '2025',
      isFeatured: false,
      projectType: 'Client E-Commerce Project',
      role: 'Shopify Storefront Developer',
      summary: 'Handcrafted leather goods, footwear & accessories e-commerce store.',
      tech: ['Shopify', 'Liquid', 'Custom UI/UX', 'Multi-Currency'],
      description: 'E-commerce platform for TFG Pakistan featuring intuitive footwear sizing guides, collection filters, and responsive mobile architecture.',
      caseStudy: {
        overview: 'Storefront for artisanal leather goods and footwear.',
        myRole: 'Shopify development, collection filters, sizing guide UI.',
        problemGoal: 'Streamline customer product selection and international ordering.',
        designDev: 'Structured around product craftsmanship photography with responsive grid layouts.',
        keyFeatures: ['Footwear sizing guide modal', 'Collection filters', 'Multi-currency checkout'],
        technology: 'Shopify, Liquid, CSS3, JavaScript',
        finalResult: 'A reliable, responsive leather goods online store.'
      },
      liveUrl: 'https://tfgpak.com',
      githubUrl: 'https://github.com/Handsomemalik'
    },
    {
      id: '08',
      title: 'amilya.pk',
      category: 'Shopify Development',
      catKey: 'shopify',
      year: '2025',
      isFeatured: false,
      projectType: 'Client E-Commerce Project',
      role: 'Shopify Theme Developer',
      summary: 'Women’s designer pret, festive collections & eastern wear brand store.',
      tech: ['Shopify', 'Responsive Web', 'Fast Checkout', 'Custom Liquid'],
      description: 'Comprehensive Shopify store engineered for Amilya, emphasizing rapid mobile navigation, seasonal collection drops, and automated order notifications.',
      caseStudy: {
        overview: 'Fashion store tailored for rapid seasonal pret releases.',
        myRole: 'Theme development, mobile layout optimization, cart drawer.',
        problemGoal: 'Enable quick browsing and single-tap checkout on mobile devices.',
        designDev: 'Applied high-density product cards and sticky cart interactions.',
        keyFeatures: ['Mobile sticky checkout', 'Collection tabs', 'Order notifications'],
        technology: 'Shopify, Liquid, JavaScript',
        finalResult: 'Fast, accessible mobile fashion store.'
      },
      liveUrl: 'https://amilya.pk',
      githubUrl: 'https://github.com/Handsomemalik'
    },
    {
      id: '09',
      title: 'palakandmehak.com',
      category: 'Shopify Development',
      catKey: 'shopify',
      year: '2024',
      isFeatured: false,
      projectType: 'Client E-Commerce Project',
      role: 'Shopify Theme Customizer',
      summary: 'Exclusive couture pret & handcrafted designer jewelry boutique.',
      tech: ['Shopify', 'Custom Theme', 'Liquid', 'International Shipping'],
      description: 'Luxury digital boutique for Palak & Mehak. Engineered with custom grid layouts, high-fashion typography, and custom order inquiry forms.',
      caseStudy: {
        overview: 'Luxury couture and designer jewelry boutique.',
        myRole: 'Layout design, custom inquiries form, theme customization.',
        problemGoal: 'Showcase high-value jewelry and bespoke apparel with clarity.',
        designDev: 'Clean gallery grids with zoom inspection and direct consultation links.',
        keyFeatures: ['Jewelry detail zoom', 'Bespoke order consultation modal', 'Worldwide shipping support'],
        technology: 'Shopify, Liquid, CSS3',
        finalResult: 'A sophisticated digital storefront for bespoke couture.'
      },
      liveUrl: 'https://palakandmehak.com',
      githubUrl: 'https://github.com/Handsomemalik'
    },
    {
      id: '10',
      title: 'royalwrist.pk',
      category: 'WordPress Development',
      catKey: 'wordpress',
      year: '2024',
      isFeatured: false,
      projectType: 'Client Web Project',
      role: 'WordPress Developer',
      summary: 'High-end timepiece & luxury watch collection retailer website.',
      tech: ['WordPress', 'WooCommerce', 'Custom Brand Filters'],
      description: 'Luxury watch retail platform with brand catalogs, serial authenticity inquiry forms, and advanced facet filtering.',
      caseStudy: {
        overview: 'Watch catalog and retail portal for curated timepieces.',
        myRole: 'WordPress architecture, catalog filters, serial verification forms.',
        problemGoal: 'Provide confidence and effortless browsing for luxury watch enthusiasts.',
        designDev: 'High-contrast dark watch displays with technical specification panels.',
        keyFeatures: ['Facet filtering by movement and brand', 'Serial authenticity inquiry', 'Fast search'],
        technology: 'WordPress, WooCommerce, CSS3, JavaScript',
        finalResult: 'A polished timepiece catalog with structured inquiry workflows.'
      },
      liveUrl: 'https://royalwrist.pk',
      githubUrl: 'https://github.com/Handsomemalik'
    },
    {
      id: '11',
      title: 'luxstyle.pk',
      category: 'WordPress Development',
      catKey: 'wordpress',
      year: '2024',
      isFeatured: false,
      projectType: 'Client Web Project',
      role: 'WordPress & WooCommerce Developer',
      summary: 'Modern beauty, cosmetic & lifestyle store with optimized checkout.',
      tech: ['WordPress', 'Elementor', 'WooCommerce', 'Speed Optimization'],
      description: 'Fast, mobile-optimized WordPress store for LuxStyle. Features customer review visualizers, bundle promotions, and smooth one-page checkout.',
      caseStudy: {
        overview: 'Cosmetic and beauty e-commerce store with high mobile traffic.',
        myRole: 'Store design, checkout speed optimization, review integrations.',
        problemGoal: 'Reduce cart abandonment through an intuitive one-page checkout flow.',
        designDev: 'Clean, light-themed product pages with responsive swatch selectors.',
        keyFeatures: ['One-page checkout', 'Product reviews system', 'Bundle promos'],
        technology: 'WordPress, WooCommerce, Elementor',
        finalResult: 'A functional beauty store with fast loading and streamlined purchases.'
      },
      liveUrl: 'https://luxstyle.pk',
      githubUrl: 'https://github.com/Handsomemalik'
    },
    {
      id: '12',
      title: 'ebone.net.pk',
      category: 'WordPress Development',
      catKey: 'wordpress',
      year: '2024',
      isFeatured: false,
      projectType: 'Client Web Project',
      role: 'Corporate Web Developer',
      summary: 'Corporate telecommunications, fiber & ISP infrastructure platform.',
      tech: ['WordPress', 'Corporate Portal', 'Coverage Map', 'Ticket System'],
      description: 'Enterprise ISP portal built for E-Bone Networks. Includes interactive network coverage checking, broadband package comparisons, and corporate SLA inquiry forms.',
      caseStudy: {
        overview: 'Corporate telecommunications portal for fiber and broadband services.',
        myRole: 'Corporate web layout, coverage map UI, package pricing comparison table.',
        problemGoal: 'Clearly display broadband packages and allow visitors to check coverage in their sector.',
        designDev: 'Structured B2B layout with corporate blue accents and clean comparison matrix.',
        keyFeatures: ['Package comparison matrix', 'Coverage inquiry form', 'Corporate SLA details'],
        technology: 'WordPress, Custom CSS, JavaScript',
        finalResult: 'A professional ISP portal serving corporate and residential inquiries.'
      },
      liveUrl: 'https://ebone.net.pk',
      githubUrl: 'https://github.com/Handsomemalik'
    },
    {
      id: '13',
      title: 'apnagharapnizameen.com',
      category: 'WordPress Development',
      catKey: 'wordpress',
      year: '2023',
      isFeatured: false,
      projectType: 'Client Web Project',
      role: 'WordPress Developer',
      summary: 'Real estate, plot development & property listings marketplace platform.',
      tech: ['WordPress', 'Advanced Custom Fields', 'Map Integration', 'WhatsApp Leads'],
      description: 'Comprehensive property portal for Apna Ghar Apni Zameen. Built with custom post types for residential and commercial listings, and installment schedule calculators.',
      caseStudy: {
        overview: 'Real estate listing platform for residential plots and developments.',
        myRole: 'Custom post types, property detail templates, installment schedule calculator.',
        problemGoal: 'Allow buyers to explore plot sizes, payment plans, and connect directly with agents.',
        designDev: 'Structured property cards with key specs (marla/sqft, location, price, payment schedule).',
        keyFeatures: ['Property search filters', 'Installment schedule breakdown', 'Direct agent WhatsApp link'],
        technology: 'WordPress, ACF, Custom PHP/CSS',
        finalResult: 'An organized real estate directory with direct lead generation.'
      },
      liveUrl: 'https://apnagharapnizameen.com',
      githubUrl: 'https://github.com/Handsomemalik'
    },
    {
      id: '14',
      title: 'pakref.com',
      category: 'WordPress Development',
      catKey: 'wordpress',
      year: '2023',
      isFeatured: false,
      projectType: 'Client Web Project',
      role: 'Web Developer',
      summary: 'Industrial refrigeration, HVAC & cooling technology commercial catalog.',
      tech: ['WordPress', 'B2B Product Catalog', 'RFQ System', 'Technical Documentation'],
      description: 'Commercial refrigeration platform built for PakRef. Includes technical downloadable specifications, compressor parts catalogs, and quotation request modules.',
      caseStudy: {
        overview: 'B2B industrial cooling equipment and refrigeration parts catalog.',
        myRole: 'Catalog structuring, Request-for-Quote (RFQ) forms, datasheet downloads.',
        problemGoal: 'Organize hundreds of industrial parts with exact technical model numbers.',
        designDev: 'Clean technical table views with model filtering and one-click RFQ submission.',
        keyFeatures: ['Model-based search', 'Downloadable technical PDF specs', 'Direct RFQ cart'],
        technology: 'WordPress, Custom Catalog Theme, CSS3',
        finalResult: 'A clear B2B procurement catalog for industrial equipment.'
      },
      liveUrl: 'https://pakref.com',
      githubUrl: 'https://github.com/Handsomemalik'
    },
    {
      id: '15',
      title: 'alternativemedicinestore.com',
      category: 'WordPress Development',
      catKey: 'wordpress',
      year: '2023',
      isFeatured: false,
      projectType: 'Client Web Project',
      role: 'WordPress & WooCommerce Developer',
      summary: 'Natural health, organic supplements & herbal wellness online store.',
      tech: ['WordPress', 'WooCommerce', 'Prescription Upload', 'Filter System'],
      description: 'Holistic health e-commerce portal for Alternative Medicine Store. Features herbal category taxonomy, ailment-based searching, and secure digital payments.',
      caseStudy: {
        overview: 'Herbal supplements and holistic healthcare online store.',
        myRole: 'Store setup, category taxonomy design, ailment-based search.',
        problemGoal: 'Help wellness customers find products corresponding to specific dietary or wellness needs.',
        designDev: 'Clean herbal-aesthetic storefront with categorized wellness collections.',
        keyFeatures: ['Ailment taxonomy filter', 'Prescription inquiry upload', 'Secure checkout'],
        technology: 'WordPress, WooCommerce, CSS3',
        finalResult: 'A trusted wellness store with clear category navigation.'
      },
      liveUrl: 'https://alternativemedicinestore.com',
      githubUrl: 'https://github.com/Handsomemalik'
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

  // Case Study Elements
  const modalRoleVal = document.getElementById('modalRoleVal');
  const modalProblemGoalVal = document.getElementById('modalProblemGoalVal');
  const modalDesignDevVal = document.getElementById('modalDesignDevVal');
  const modalKeyFeaturesList = document.getElementById('modalKeyFeaturesList');
  const modalFinalResultVal = document.getElementById('modalFinalResultVal');

  // Open modal with specific project index
  function openProjectModal(index) {
    const project = projectsData[index];
    if (!project || !projectModal) return;

    if (modalIndexTag) {
      modalIndexTag.textContent = `${String(index + 1).padStart(2, '0')} / ${String(projectsData.length).padStart(2, '0')}`;
    }
    if (modalCategoryTag) {
      const typeStr = project.projectType || (project.isClientProject ? 'Client Project' : 'Selected Project');
      modalCategoryTag.textContent = `${project.category} · ${typeStr}`;
    }
    if (modalTitle) modalTitle.textContent = project.title;
    if (modalDescription) modalDescription.textContent = project.description || project.summary || '';

    // Structured Case Study Content
    const cs = project.caseStudy || {};
    if (modalRoleVal) {
      modalRoleVal.textContent = cs.myRole || cs.role || project.role || 'UI/UX Designer & Web Developer';
    }
    if (modalProblemGoalVal) {
      modalProblemGoalVal.textContent = cs.problemGoal || cs.problem || 'Deliver a high-impact, modern digital experience with optimal usability.';
    }
    if (modalDesignDevVal) {
      modalDesignDevVal.textContent = cs.designDev || 'Engineered responsive interface and custom components with clean design patterns.';
    }
    if (modalKeyFeaturesList) {
      modalKeyFeaturesList.innerHTML = '';
      const feats = Array.isArray(cs.keyFeatures) && cs.keyFeatures.length > 0
        ? cs.keyFeatures
        : (project.summary ? [project.summary] : ['Responsive layout', 'Optimized performance']);
      feats.forEach(feat => {
        const li = document.createElement('li');
        li.textContent = feat;
        modalKeyFeaturesList.appendChild(li);
      });
    }
    if (modalFinalResultVal) {
      modalFinalResultVal.textContent = cs.finalResult || 'Successfully launched and deployed responsive web experience.';
    }

    // Clear and fill tech badges
    if (modalTechTags) {
      modalTechTags.innerHTML = '';
      const techItems = Array.isArray(project.tech) ? project.tech : (project.tech ? [project.tech] : []);
      techItems.forEach(techItem => {
        const pill = document.createElement('span');
        pill.className = 'modal-tech-pill';
        pill.textContent = techItem;
        modalTechTags.appendChild(pill);
      });
    }

    // Update Action Buttons
    if (modalLiveBtn) {
      if (project.liveUrl && project.liveUrl !== '#' && project.liveUrl.trim() !== '') {
        modalLiveBtn.style.display = 'inline-flex';
        modalLiveBtn.href = project.liveUrl;
      } else {
        modalLiveBtn.style.display = 'none';
      }
    }

    if (modalGithubBtn) {
      if (project.githubUrl && project.githubUrl !== '#' && project.githubUrl.trim() !== '') {
        modalGithubBtn.style.display = 'inline-flex';
        modalGithubBtn.href = project.githubUrl;
      } else {
        modalGithubBtn.style.display = 'none';
      }
    }

    projectModal.classList.add('open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

  }

  // Close modal
  function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.remove('open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Bind click triggers for project rows and featured selected cards
  let rows = document.querySelectorAll('.project-row');
  function bindModalTriggers() {
    rows = document.querySelectorAll('.project-row');
    rows.forEach((row) => {
      row.onclick = () => {
        const idx = parseInt(row.getAttribute('data-project-index'), 10);
        if (!isNaN(idx)) openProjectModal(idx);
      };
    });

    const selectedCards = document.querySelectorAll('.selected-card');
    selectedCards.forEach((card) => {
      card.onclick = () => {
        const idx = parseInt(card.getAttribute('data-project-index'), 10);
        if (!isNaN(idx)) openProjectModal(idx);
      };
    });
  }
  bindModalTriggers();

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
     5c. Interactive Project Category Accordions & Category Tabs
     -------------------------------------------------------------------------- */
  const categoryTabBtns = document.querySelectorAll('.category-tab-btn');

  function toggleCategoryAccordion(bannerEl, forceState = null) {
    const group = bannerEl.closest('.category-accordion-group');
    if (!group) return;
    const body = group.querySelector('.category-accordion-body');
    const badgeText = bannerEl.querySelector('.toggle-text');
    if (!body) return;

    const isCurrentlyCollapsed = body.classList.contains('is-collapsed');
    const shouldExpand = (forceState !== null) ? forceState : isCurrentlyCollapsed;

    if (shouldExpand) {
      body.classList.remove('is-collapsed');
      body.classList.add('is-expanded');
      bannerEl.classList.remove('is-collapsed');
      bannerEl.classList.add('is-expanded');
      bannerEl.setAttribute('aria-expanded', 'true');
      if (badgeText) badgeText.textContent = 'Hide Projects';

      // Animate project rows in with staggered entry
      const groupRows = body.querySelectorAll('.project-row');
      groupRows.forEach((row, idx) => {
        row.classList.remove('filter-animated');
        void row.offsetWidth; // Trigger reflow for animation restart
        row.classList.add('filter-animated');
        row.style.animationDelay = `${idx * 40}ms`;
      });
    } else {
      body.classList.remove('is-expanded');
      body.classList.add('is-collapsed');
      bannerEl.classList.remove('is-expanded');
      bannerEl.classList.add('is-collapsed');
      bannerEl.setAttribute('aria-expanded', 'false');
      if (badgeText) badgeText.textContent = 'Show Projects';
    }
  }

  function bindAccordionBanners() {
    const banners = document.querySelectorAll('.category-group-banner');
    banners.forEach(banner => {
      banner.onclick = (e) => {
        e.preventDefault();
        toggleCategoryAccordion(banner);
      };
      banner.onkeydown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleCategoryAccordion(banner);
        }
      };
    });
  }

  function filterProjectsByCategory(selectedCat) {
    // Update active tab button
    categoryTabBtns.forEach(btn => {
      if (btn.getAttribute('data-category') === selectedCat) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      }
    });

    // Filter category accordion groups
    const groups = document.querySelectorAll('.category-accordion-group');
    groups.forEach(group => {
      const groupCat = group.getAttribute('data-category');
      const banner = group.querySelector('.category-group-banner');
      if (selectedCat === 'all' || groupCat === selectedCat) {
        group.classList.remove('filter-hidden');
        if (selectedCat !== 'all' && banner) {
          // When a specific category tab is clicked, automatically expand it so projects are visible
          toggleCategoryAccordion(banner, true);
        }
      } else {
        group.classList.add('filter-hidden');
      }
    });
  }

  categoryTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-category');
      filterProjectsByCategory(cat);
    });
  });

  // Bind initial accordions
  bindAccordionBanners();

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
        const titleTag = document.querySelector('.hero-tags .hero-tag:first-child');
        if (titleTag) titleTag.textContent = p.title;
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

        function renderGroup(catTitle, catKey, items, defaultExpanded = false) {
          if (items.length === 0) return '';
          const isExpanded = defaultExpanded;
          const collapsedClass = isExpanded ? 'is-expanded' : 'is-collapsed';
          const bodyClass = isExpanded ? 'is-expanded' : 'is-collapsed';
          const toggleText = isExpanded ? 'Hide Projects' : 'Show Projects';
          const ariaExpanded = isExpanded ? 'true' : 'false';

          let countLabel = `${items.length} Projects Delivered`;
          if (catKey === 'ai') countLabel = `${items.length} Intelligent Systems`;
          if (catKey === 'wordpress') countLabel = `${items.length} Sites Delivered`;

          let g = `
            <div class="category-accordion-group" data-category="${catKey}">
              <div class="category-group-banner ${collapsedClass} reveal-fade revealed" data-category="${catKey}" role="button" tabindex="0" aria-expanded="${ariaExpanded}" aria-controls="accordion-${catKey}" aria-label="Toggle ${catTitle} Projects" title="Click to expand/collapse ${catTitle}">
                <span class="category-group-title">
                  <span class="category-group-indicator"></span>
                  ${catTitle}
                </span>
                <div class="category-group-right">
                  <span class="category-group-count">${countLabel}</span>
                  <span class="category-group-toggle-badge">
                    <span class="toggle-text">${toggleText}</span>
                    <svg class="category-group-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </div>
              </div>
              <div class="category-accordion-body ${bodyClass}" id="accordion-${catKey}">
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
          g += `
              </div>
            </div>
          `;
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

        // Rebind click listeners to project rows & selected featured cards
        bindModalTriggers();

        // Rebind accordion banners
        bindAccordionBanners();
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
  // Unified with Sticky Header in Section 3 for 60-120fps hardware-accelerated scaleX composite


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
     9. Interactive 3D Perspective Card Tilt (Contact Cards, Stats, Portrait)
     -------------------------------------------------------------------------- */
  const tiltElements = document.querySelectorAll('.contact-card-box, .stat-card, .about-portrait-frame');

  tiltElements.forEach(card => {
    let rect = null;
    let tiltRaf = null;

    card.addEventListener('mouseenter', () => {
      rect = card.getBoundingClientRect();
    }, { passive: true });

    card.addEventListener('mousemove', (e) => {
      if (!rect) rect = card.getBoundingClientRect();
      if (tiltRaf) return;

      tiltRaf = requestAnimationFrame(() => {
        tiltRaf = null;
        if (!rect) return;
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const rotX = -(y / (rect.height / 2)) * 5;
        const rotY = (x / (rect.width / 2)) * 5;

        card.style.transform = `perspective(750px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translate3d(0, -4px, 0)`;
      });
    }, { passive: true });

    card.addEventListener('mouseleave', () => {
      if (tiltRaf) {
        cancelAnimationFrame(tiltRaf);
        tiltRaf = null;
      }
      rect = null;
      card.style.transform = '';
    });
  });


  /* --------------------------------------------------------------------------
     10. Magnetic Button Attraction Effect (RAF Throttled, Zero Reflow)
     -------------------------------------------------------------------------- */
  const magneticButtons = document.querySelectorAll('.btn-cta-primary, .btn-cta-outline, .btn-pill, .category-tab-btn');

  magneticButtons.forEach(btn => {
    let btnRect = null;
    let magRaf = null;

    btn.addEventListener('mouseenter', () => {
      btnRect = btn.getBoundingClientRect();
    }, { passive: true });

    btn.addEventListener('mousemove', (e) => {
      if (!btnRect) btnRect = btn.getBoundingClientRect();
      if (magRaf) return;

      magRaf = requestAnimationFrame(() => {
        magRaf = null;
        if (!btnRect) return;
        const x = e.clientX - btnRect.left - btnRect.width / 2;
        const y = e.clientY - btnRect.top - btnRect.height / 2;

        btn.style.transform = `translate3d(${(x * 0.22).toFixed(1)}px, ${(y * 0.22).toFixed(1)}px, 0)`;
      });
    }, { passive: true });

    btn.addEventListener('mouseleave', () => {
      if (magRaf) {
        cancelAnimationFrame(magRaf);
        magRaf = null;
      }
      btnRect = null;
      btn.style.transform = '';
    });
  });


  /* --------------------------------------------------------------------------
     11. Hero Mouse Parallax Effect (RAF Throttled & Hardware-Accelerated)
     -------------------------------------------------------------------------- */
  const heroSection = document.getElementById('home');
  const heroPortrait = document.querySelector('.hero-portrait-thumb');
  const heroBgImg = document.querySelector('.hero-background-img');
  const heroStar = document.querySelector('.hero-star-icon');
  const heroFirst = document.querySelector('.hero-first-name');
  const heroLast = document.querySelector('.hero-last-name');

  if (heroSection) {
    let heroRaf = null;
    heroSection.addEventListener('mousemove', (e) => {
      if (heroRaf) return;
      heroRaf = requestAnimationFrame(() => {
        heroRaf = null;
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const deltaX = (clientX - centerX) / centerX;
        const deltaY = (clientY - centerY) / centerY;

        if (heroBgImg) {
          heroBgImg.style.transform = `scale(1.03) translate3d(${(deltaX * -8).toFixed(1)}px, ${(deltaY * -5).toFixed(1)}px, 0)`;
        }
        if (heroPortrait) {
          heroPortrait.style.transform = `translate3d(${(deltaX * 10).toFixed(1)}px, ${(deltaY * 8).toFixed(1)}px, 0)`;
        }
        if (heroStar) {
          heroStar.style.transform = `translate3d(${(deltaX * -14).toFixed(1)}px, ${(deltaY * -10).toFixed(1)}px, 0)`;
        }
        if (heroFirst) {
          heroFirst.style.transform = `translate3d(${(deltaX * -4).toFixed(1)}px, ${(deltaY * -3).toFixed(1)}px, 0)`;
        }
        if (heroLast) {
          heroLast.style.transform = `translate3d(${(deltaX * -6).toFixed(1)}px, ${(deltaY * -4).toFixed(1)}px, 0)`;
        }
      });
    }, { passive: true });

    heroSection.addEventListener('mouseleave', () => {
      if (heroRaf) {
        cancelAnimationFrame(heroRaf);
        heroRaf = null;
      }
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
     13. Geometric Constellation Plexus Background Engine (60-120fps Smooth Canvas)
     Matches the minimalist dark node & hairline polygon network in user reference
     -------------------------------------------------------------------------- */
  const canvas = document.getElementById('constellation-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 1.25);

    let particles = [];
    let mouse = { x: -1000, y: -1000, active: false };
    let animationFrameId = null;

    function resizeCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      ctx.setTransform(1, 0, 0, 1, 0, 0);
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
          this.radius = 3.4 + Math.random() * 1.6;
          this.baseAlpha = 0.85 + Math.random() * 0.15;
          this.isMajor = true;
        } else if (rand < 0.54) {
          // Medium connection node
          this.radius = 1.9 + Math.random() * 1.1;
          this.baseAlpha = 0.55 + Math.random() * 0.25;
          this.isMajor = false;
        } else {
          // Fine ambient dust node
          this.radius = 0.9 + Math.random() * 0.7;
          this.baseAlpha = 0.25 + Math.random() * 0.25;
          this.isMajor = false;
        }

        // Smooth subtle drift speed
        const speed = 0.25 + Math.random() * 0.35;
        const angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;

        // Subtle pulsation
        this.pulseAngle = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.02 + Math.random() * 0.025;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.pulseAngle += this.pulseSpeed;

        // Interactive mouse soft repulsion
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
        const isDark = document.body.classList.contains('dark-theme');
        const pulse = Math.sin(this.pulseAngle) * 0.25;
        const currentRadius = Math.max(0.8, this.radius + pulse);

        if (this.isMajor) {
          // Soft ambient outer halo (pure arc, ZERO expensive shadowBlur rasterization)
          ctx.beginPath();
          ctx.arc(this.x, this.y, currentRadius * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = isDark ? 'rgba(147, 197, 253, 0.14)' : 'rgba(13, 13, 13, 0.07)';
          ctx.fill();

          // Anchor core node
          ctx.beginPath();
          ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
          ctx.fillStyle = isDark ? `rgba(240, 244, 255, ${this.baseAlpha})` : `rgba(13, 13, 13, ${this.baseAlpha})`;
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
          ctx.fillStyle = isDark ? `rgba(220, 228, 255, ${this.baseAlpha * 1.15})` : `rgba(20, 20, 20, ${this.baseAlpha})`;
          ctx.fill();
        }
      }
    }

    function initParticles() {
      // Density tuned for smooth 60-120fps across all screens
      const isMobile = width < 768;
      const count = isMobile
        ? Math.min(24, Math.max(16, Math.floor((width * height) / 36000)))
        : Math.min(46, Math.max(28, Math.floor((width * height) / 26000)));

      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(new PlexusParticle(true));
      }
    }

    function animatePlexus() {
      ctx.clearRect(0, 0, width, height);
      const isDark = document.body.classList.contains('dark-theme');

      const isMobile = width < 768;
      const connectDist = isMobile ? 95 : 130;
      const connectDistSq = connectDist * connectDist;
      const mouseDist = 140;
      const mouseDistSq = mouseDist * mouseDist;

      const pLen = particles.length;

      // 1. Draw geometric connection lines (clean pairs, O(N^2) without O(N^3) facet loops)
      ctx.lineWidth = 0.7;
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
            ctx.strokeStyle = isDark ? `rgba(210, 225, 255, ${alpha * 0.75})` : `rgba(13, 13, 13, ${alpha})`;
            ctx.stroke();
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
            ctx.strokeStyle = isDark ? `rgba(165, 180, 252, ${mAlpha * 0.85})` : `rgba(13, 13, 13, ${mAlpha})`;
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
