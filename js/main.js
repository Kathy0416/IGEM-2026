(function() {
  'use strict';

  // ── Mobile nav toggle ──
  const toggleBtn = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');
  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', function() {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navLinks.classList.remove('open');
      });
    });
  }

  // ── Active nav link based on current page ──
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function(link) {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  // ── Page fade-in on load ──
  document.body.classList.add('page-fade');

  // ═══════════════════════════════════════════════════
  // ENHANCED SCROLL-REVEAL (staggered children support)
  // ═══════════════════════════════════════════════════
  function initReveal() {
    const revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            var staggerContainer = entry.target.closest('.reveal-stagger');
            if (staggerContainer && entry.target.classList.contains('reveal-item')) {
              staggerContainer.classList.add('visible');
            } else {
              entry.target.classList.add('visible');
            }
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      });
      revealEls.forEach(function(el) {
        observer.observe(el);
      });
      document.querySelectorAll('.reveal-stagger .reveal-item').forEach(function(el) {
        observer.observe(el);
      });
    } else {
      revealEls.forEach(function(el) {
        el.classList.add('visible');
      });
      document.querySelectorAll('.reveal-stagger .reveal-item').forEach(function(el) {
        el.classList.add('visible');
      });
    }
  }

  // ═══════════════════════════════════════════════════
  // GRADIENT TEXT ANIMATION
  // ═══════════════════════════════════════════════════
  function initGradientText() {
    document.querySelectorAll('[data-gradient]').forEach(function(el) {
      el.classList.add('text-gradient');
      if (el.dataset.gradient === 'slow') {
        el.classList.add('text-gradient-slow');
      }
    });
  }

  // ═══════════════════════════════════════════════════
  // STEAM PARTICLE EFFECT — Hero Section Background
  // ═══════════════════════════════════════════════════
  function initHeroParticles3D() {
    var hero = document.getElementById('story-hero');
    if (!hero) return;

    if (document.getElementById('heroParticles')) return;

    var canvas = document.createElement('canvas');
    canvas.id = 'heroParticles';
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;display:block;';
    hero.insertBefore(canvas, hero.firstChild);

    var ctx = canvas.getContext('2d');
    var particles = [];
    var animFrame;
    var mouseX = 0.5;
    var mouseY = 0.5;
    var W, H;

    function resize() {
      var rect = hero.getBoundingClientRect();
      W = canvas.width = rect.width;
      H = canvas.height = rect.height;
    }
    resize();

    var resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 100);
    });

    hero.addEventListener('mousemove', function(e) {
      var rect = hero.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width;
      mouseY = (e.clientY - rect.top) / rect.height;
    });

    hero.addEventListener('mouseleave', function() {
      mouseX = 0.5;
      mouseY = 0.5;
    });

    var DEPTH = 600;
    var COUNT = Math.min(150, Math.floor(window.innerWidth / 8));

    for (var i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        z: Math.random() * DEPTH,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -(Math.random() * 0.5 + 0.2),
        vz: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 6 + 2,
        alpha: Math.random() * 0.25 + 0.05,
        phase: Math.random() * Math.PI * 2,
        swayAmp: Math.random() * 0.3 + 0.1,
        swayFreq: Math.random() * 0.003 + 0.002,
        originX: Math.random() * W,
        warmth: Math.random() > 0.5 ? 0 : Math.random() * 20
      });
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      particles.sort(function(a, b) { return a.z - b.z; });

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        for (var j = i + 1; j < particles.length; j++) {
          var q = particles[j];
          var dx = p.x - q.x;
          var dy = p.y - q.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            var lineAlpha = (1 - dist / 180) * 0.06 * (p.alpha + q.alpha);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = 'rgba(255, 255, 255, ' + lineAlpha + ')';
            ctx.lineWidth = 0.5 + (1 - dist / 180) * 1.5;
            ctx.stroke();
          }
        }
      }

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.phase += p.swayFreq;
        var swayOffset = Math.sin(p.phase) * p.swayAmp * 2;
        p.x += p.vx + swayOffset;
        p.y += p.vy;
        p.z += p.vz;

        if (p.y < -40 || p.x < -40 || p.x > W + 40 || p.z < 0 || p.z > DEPTH) {
          p.x = Math.random() * W;
          p.y = H + 20;
          p.z = Math.random() * DEPTH;
          p.originX = p.x;
          p.phase = Math.random() * Math.PI * 2;
          continue;
        }

        var depthFactor = p.z / DEPTH;
        var scale = 0.4 + depthFactor * 0.6;
        var alpha = p.alpha * (0.2 + depthFactor * 0.8);
        var drawSize = p.size * scale * 2;

        var parallaxX = (mouseX - 0.5) * 40 * (1 - depthFactor);
        var parallaxY = (mouseY - 0.5) * 40 * (1 - depthFactor);
        var drawX = p.x + parallaxX;
        var drawY = p.y + parallaxY;

        ctx.beginPath();
        ctx.arc(drawX, drawY, drawSize * 3, 0, Math.PI * 2);
        if (p.warmth > 0) {
          ctx.fillStyle = 'rgba(255, 200, 180, ' + (alpha * 0.08) + ')';
        } else {
          ctx.fillStyle = 'rgba(255, 255, 255, ' + (alpha * 0.06) + ')';
        }
        ctx.fill();

        ctx.beginPath();
        ctx.arc(drawX, drawY, drawSize * 1.5, 0, Math.PI * 2);
        if (p.warmth > 0) {
          ctx.fillStyle = 'rgba(255, 220, 200, ' + (alpha * 0.2) + ')';
        } else {
          ctx.fillStyle = 'rgba(255, 255, 255, ' + (alpha * 0.15) + ')';
        }
        ctx.fill();

        ctx.beginPath();
        ctx.arc(drawX, drawY, drawSize * 0.6, 0, Math.PI * 2);
        if (p.warmth > 0) {
          ctx.fillStyle = 'rgba(255, 235, 220, ' + (alpha * 0.5) + ')';
        } else {
          ctx.fillStyle = 'rgba(255, 255, 255, ' + (alpha * 0.4) + ')';
        }
        ctx.fill();
      }

      animFrame = requestAnimationFrame(draw);
    }

    document.addEventListener('visibilitychange', function() {
      if (document.hidden) {
        if (animFrame) cancelAnimationFrame(animFrame);
      } else {
        draw();
      }
    });

    draw();
  }

  // ═══════════════════════════════════════════════════
  // DNA HELIX – TEAM GENOME
  // ═══════════════════════════════════════════════════

  // ── Team member data ──
  const teamMembers = [
    {
      id: 0,
      name: 'Dr. Sarah Mitchell',
      initials: 'SM',
      role: 'Principal Investigator',
      bio: 'Dr. Mitchell brings 18 years of experience in molecular gerontology. She guides the team with deep expertise in muscle biology, protein homeostasis, and synthetic biology design.',
      base: 'A'
    },
    {
      id: 1,
      name: 'James Okafor',
      initials: 'JO',
      role: 'Wet Lab Lead',
      bio: 'James specializes in bacterial engineering and protein expression. He leads the construction and testing of our probiotic genetic circuits in the lab.',
      base: 'T'
    },
    {
      id: 2,
      name: 'Aisha Patel',
      initials: 'AP',
      role: 'Modeling & Dry Lab',
      bio: 'Aisha builds kinetic models of our genetic circuit and simulates gut-muscle axis signaling dynamics to predict therapeutic outcomes before wet-lab validation.',
      base: 'C'
    },
    {
      id: 3,
      name: 'Carlos Mendez',
      initials: 'CM',
      role: 'Human Practices Lead',
      bio: 'Carlos leads community engagement, interviewing clinicians, patients, and ethicists to ensure our project is socially responsible, inclusive, and responsive to real-world needs.',
      base: 'G'
    },
    {
      id: 4,
      name: 'Yuki Tanaka',
      initials: 'YT',
      role: 'Design & Wiki Lead',
      bio: 'Yuki crafts all visual materials, from presentation graphics to this very website. She ensures our science is communicated clearly and beautifully.',
      base: 'A'
    },
    {
      id: 5,
      name: 'Emily Chen',
      initials: 'EC',
      role: 'Policy & Safety',
      bio: 'Emily navigates the regulatory landscape, biosafety protocols, and ethical frameworks, ensuring our living therapeutic meets the highest standards of responsible innovation.',
      base: 'T'
    }
  ];


  // ── State ──
  let currentOrder = teamMembers.map(function(m) { return m.id; });
  let activeId = null;
  const dnaBases = ['A', 'T', 'C', 'G'];

  // Complementary base pairs
  const complement = { 'A': 'T', 'T': 'A', 'C': 'G', 'G': 'C' };

  // Hydrogen bonds per pair
  const hBonds = { 'A': 2, 'T': 2, 'C': 3, 'G': 3 };

  // DOM refs
  var dnaRungsEl        = document.getElementById('dnaRungs');
  var shuffleBtn        = document.getElementById('shuffleBtn');
  var drawBtn           = document.getElementById('drawBtn');
  var geneName          = document.getElementById('geneName');
  var geneRole          = document.getElementById('geneRole');
  var geneBio           = document.getElementById('geneBio');
  var geneAvatarEl      = document.getElementById('geneAvatar');
  var geneBaseLeft      = document.getElementById('geneBaseLeft');
  var geneBaseRight     = document.getElementById('geneBaseRight');
  var geneBondCount     = document.getElementById('geneBondCount');
  var geneBondSymbol    = document.getElementById('geneBondSymbol');
  var geneExpression    = document.getElementById('geneExpression');


  // ── Fisher-Yates shuffle ──
  function shuffleArray(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }

  // ── Avatar color palette (based on member id) ──
  const avatarColors = [
    '#e63946', // red (A)
    '#457b9d', // blue (T)
    '#2a9d8f', // teal (C)
    '#e9c46a', // gold (G)
    '#e76f51', // coral
    '#6a4c93'  // purple
  ];

  // ── 3D Helix configuration ──
  var helixAngle = 0;                    // global rotation offset (radians)
  var helixRotationSpeed = 0.003;        // radians per frame
  var helixRadius = 0.28;                // fraction of container width for lateral offset
  var rungsPerTurn = 5;                  // how many rungs per full 360° rotation
  var helixTiltX = 0;                    // mouse-driven tilt
  var helixTiltY = 0;
  var isRotating = true;
  var animFrameId = null;
  var helixEls = [];                     // stores { el, baseAngle, id }
  var backboneDots = [];                 // stores dot elements for cleanup
  var backboneLines = [];                // stores line elements for cleanup
  var helixContainer = document.getElementById('dnaHelixContainer');

  // ── Get rotate toggle button ──
  var rotateToggleBtn = document.getElementById('rotateToggleBtn');

  // ── Render the 3D DNA helix ──
  function renderHelix() {
    // Clear previous
    dnaRungsEl.innerHTML = '';
    // Remove old backbone elements
    document.querySelectorAll('.dna-backbone-dot, .dna-backbone-line').forEach(function(el) {
      el.remove();
    });
    helixEls = [];
    backboneDots = [];
    backboneLines = [];

    var total = currentOrder.length;
    var angleStep = (Math.PI * 2) / rungsPerTurn;

    // Create a mapping of idx to yPos for the sine-wave backbone
    var rungData = [];

    currentOrder.forEach(function(id, idx) {
      var m = teamMembers[id];
      var baseLetter = m.base;
      var compLetter = complement[baseLetter];
      var baseClass = 'base-' + baseLetter.toLowerCase();

      // Store base angle for this rung (its position on the cylinder)
      var baseAngle = idx * angleStep;

      var rung = document.createElement('div');
      rung.className = 'dna-rung ' + baseClass;
      rung.dataset.id = id;
      if (id === activeId) {
        rung.classList.add('active');
      }

      // Staggered entrance animation
      rung.style.animationDelay = (idx * 0.12) + 's';

      // ── Member card with DUAL base badges & hydrogen bonds ──
      var bondCount = hBonds[baseLetter];
      var bondHtml = '<div class="rung-h-bonds">';
      for (var b = 0; b < bondCount; b++) {
        bondHtml += '<span class="rung-h-bond-dot"></span>';
      }
      bondHtml += '</div>';

      var card = document.createElement('div');
      card.className = 'rung-member-card';
      card.innerHTML =
        '<div class="rung-avatar" style="background:' + avatarColors[id % avatarColors.length] + '">' + m.initials + '</div>' +
        '<div class="rung-info">' +
          '<div class="rung-name">' + m.name + '</div>' +
          '<span class="rung-role">' + m.role + '</span>' +
        '</div>' +
        '<div class="rung-base-pair-display">' +
          '<span class="rung-base-badge rung-base-left">' + baseLetter + '</span>' +
          bondHtml +
          '<span class="rung-base-badge rung-base-right">' + compLetter + '</span>' +
        '</div>';
      rung.appendChild(card);

      // ── Click event ──
      rung.addEventListener('click', function(e) {
        e.stopPropagation();
        selectMember(id);
      });

      dnaRungsEl.appendChild(rung);

      // Store for animation updates
      helixEls.push({
        el: rung,
        baseAngle: baseAngle,
        id: id
      });

      // Calculate approximate Y position for backbone dots
      var rungRect = rung.getBoundingClientRect();
      var containerRect = helixContainer.getBoundingClientRect();
      var yPercent = (idx + 0.5) / total;
      rungData.push({ yPercent: yPercent, baseAngle: baseAngle });
    });

    // Wait a frame for layout
    setTimeout(function() {
      updateHelixPositions();
      renderBackbones();
    }, 50);
  }

  // ── Update helix rung positions based on current angle ──
  function updateHelixPositions() {
    var total = helixEls.length;
    if (total === 0) return;

    helixEls.forEach(function(item) {
      var angle = item.baseAngle + helixAngle;
      var sinVal = Math.sin(angle);
      var cosVal = Math.cos(angle);

      // depth: -1 (back) to 1 (front)
      var depth = sinVal;

      // Horizontal offset: cos gives left-right position
      var xOffset = cosVal * helixRadius * 100; // percentage

      // Map depth to 0-3 range for CSS class
      var depthNorm = (depth + 1) / 2; // 0 (back) to 1 (front)
      var depthClass = Math.round(depthNorm * 3);
      depthClass = Math.max(0, Math.min(3, depthClass));

      // Apply transform: translateX for helix position
      // Also add a slight Y shift for the helix twist appearance
      var yShift = sinVal * 4; // subtle vertical wave

      var el = item.el;

      // Remove old depth classes
      el.classList.remove('depth-0', 'depth-1', 'depth-2', 'depth-3');

      // Add appropriate depth class
      el.classList.add('depth-' + depthClass);

      // Apply horizontal offset + subtle vertical wave
      el.style.transform = 'translateX(' + xOffset.toFixed(2) + '%) translateY(' + yShift.toFixed(1) + 'px)';

      // Make back rungs send events through to front rungs
      el.style.pointerEvents = depth < 0.2 ? 'auto' : 'auto';
    });
  }

  // ── Render dynamic backbone strands ──
  function renderBackbones() {
    // Remove old
    document.querySelectorAll('.dna-backbone-dot, .dna-backbone-line').forEach(function(el) {
      el.remove();
    });

    var total = helixEls.length;
    if (total < 2) return;

    // Get container dimensions
    var containerRect = helixContainer.getBoundingClientRect();
    var containerHeight = containerRect.height;
    var containerWidth = containerRect.width;
    var yStart = 60; // approximate starting Y from top padding
    var yEnd = containerHeight - 60;

    // Generate backbone points for strand A and B
    var pointsA = [];
    var pointsB = [];

    for (var i = 0; i < 60; i++) {
      var t = i / 59;
      var y = yStart + t * (yEnd - yStart);
      var angle = t * total * (Math.PI * 2 / rungsPerTurn) + helixAngle;
      var cosVal = Math.cos(angle);
      var sinVal = Math.sin(angle);

      // Strand A
      var xA = cosVal * helixRadius * containerWidth * 0.5 + containerWidth * 0.5;
      // Strand B: offset by 180 degrees
      var angleB = angle + Math.PI;
      var cosValB = Math.cos(angleB);
      var xB = cosValB * helixRadius * containerWidth * 0.5 + containerWidth * 0.5;

      // Depth determines size/opacity of dots
      var depthA = (sinVal + 1) / 2;
      var depthB = (Math.sin(angleB) + 1) / 2;

      pointsA.push({ x: xA, y: y, depth: depthA });
      pointsB.push({ x: xB, y: y, depth: depthB });
    }

    // Draw dots for backbone strands
    pointsA.forEach(function(p) {
      var dot = document.createElement('div');
      dot.className = 'dna-backbone-dot strand-a';
      dot.style.left = p.x + 'px';
      dot.style.top = p.y + 'px';
      dot.style.width = (4 + p.depth * 6) + 'px';
      dot.style.height = (4 + p.depth * 6) + 'px';
      dot.style.opacity = 0.3 + p.depth * 0.6;
      dot.style.transform = 'translate(-50%, -50%)';
      helixContainer.appendChild(dot);
    });

    pointsB.forEach(function(p) {
      var dot = document.createElement('div');
      dot.className = 'dna-backbone-dot strand-b';
      dot.style.left = p.x + 'px';
      dot.style.top = p.y + 'px';
      dot.style.width = (4 + p.depth * 6) + 'px';
      dot.style.height = (4 + p.depth * 6) + 'px';
      dot.style.opacity = 0.3 + p.depth * 0.6;
      dot.style.transform = 'translate(-50%, -50%)';
      helixContainer.appendChild(dot);
    });
  }

  // ── Animation loop ──
  function animateHelix() {
    if (isRotating) {
      helixAngle += helixRotationSpeed;
      updateHelixPositions();
      renderBackbones();
    }
    animFrameId = requestAnimationFrame(animateHelix);
  }

  // ── Toggle rotation ──
  function toggleRotation() {
    isRotating = !isRotating;
    if (rotateToggleBtn) {
      rotateToggleBtn.innerHTML = isRotating ? '⏸ Pause Rotation' : '▶ Play Rotation';
      rotateToggleBtn.style.background = isRotating ? '#457b9d' : '#2a9d8f';
    }
  }

  // ── Mouse parallax tilt ──
  var mouseX = 0.5;
  var mouseY = 0.5;
  var targetTiltX = 0;
  var targetTiltY = 0;

  if (helixContainer) {
    helixContainer.addEventListener('mousemove', function(e) {
      var rect = helixContainer.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width;
      mouseY = (e.clientY - rect.top) / rect.height;
      // Map to tilt angles (-10 to 10 degrees)
      targetTiltX = (mouseY - 0.5) * 16;
      targetTiltY = (mouseX - 0.5) * 16;
    });

    helixContainer.addEventListener('mouseleave', function() {
      targetTiltX = 0;
      targetTiltY = 0;
    });
  }

  // ── Apply smooth tilt in animation loop ──
  function applyTilt() {
    helixTiltX += (targetTiltX - helixTiltX) * 0.05;
    helixTiltY += (targetTiltY - helixTiltY) * 0.05;

    if (Math.abs(helixTiltX) > 0.01 || Math.abs(helixTiltY) > 0.01) {
      // Apply perspective tilt to the container
      helixContainer.style.transform = 'rotateX(' + helixTiltX.toFixed(2) + 'deg) rotateY(' + helixTiltY.toFixed(2) + 'deg)';
      helixContainer.style.transition = 'none';
    } else if (helixContainer.style.transform) {
      helixContainer.style.transform = 'rotateX(0deg) rotateY(0deg)';
    }
  }

  // ── Wrap the existing animate function to include tilt ──
  var origAnimate = animateHelix;
  animateHelix = function() {
    if (isRotating) {
      helixAngle += helixRotationSpeed;
      updateHelixPositions();
      renderBackbones();
    }
    applyTilt();
    animFrameId = requestAnimationFrame(animateHelix);
  };


  // ── Select a member (click on rung) ──
  function selectMember(id) {
    activeId = id;

    // Update active class on all rungs
    var allRungs = dnaRungsEl.querySelectorAll('.dna-rung');
    allRungs.forEach(function(rung) {
      if (parseInt(rung.dataset.id, 10) === id) {
        rung.classList.add('active');

        // Add pulse effect
        var pulse = document.createElement('div');
        pulse.className = 'rung-pulse';
        rung.appendChild(pulse);
        setTimeout(function() { pulse.remove(); }, 1200);
      } else {
        rung.classList.remove('active');
      }
    });

    showGeneExpression(id);
  }

  // ── Show gene expression panel ──
  function showGeneExpression(id) {
    var m = teamMembers[id];
    if (!m) return;

    var baseLetter = m.base;
    var compLetter = complement[baseLetter];
    var baseClass = 'base-' + baseLetter.toLowerCase();

    // Staggered reveal animation
    geneName.style.opacity = '0';
    geneName.style.transform = 'translateY(10px)';
    geneRole.style.opacity = '0';
    geneRole.style.transform = 'translateY(10px)';
    geneBio.style.opacity = '0';
    geneBio.style.transform = 'translateY(10px)';

    geneName.textContent = m.name;
    geneRole.textContent = m.role;
    geneBio.textContent  = m.bio;

    // Update initials avatar in gene panel
    geneAvatarEl.innerHTML = '<div class="gene-avatar-circle" style="background:' + avatarColors[id % avatarColors.length] + '">' + m.initials + '</div>';
    geneAvatarEl.querySelector('.gene-avatar-circle').style.background = avatarColors[id % avatarColors.length];

    geneBaseLeft.textContent = baseLetter;
    geneBaseLeft.className = 'gene-base gene-base-left ' + baseClass;
    geneBaseRight.textContent = compLetter;
    geneBaseRight.className = 'gene-base gene-base-right base-' + compLetter.toLowerCase();

    // Show bond count and symbol
    var bondCount = hBonds[baseLetter];
    var bondsStr = '';
    for (var i = 0; i < bondCount; i++) {
      bondsStr += '•';
    }
    geneBondCount.textContent = bondCount + ' H-bonds [' + bondsStr + ']';
    geneBondCount.className = 'gene-bond-count ' + (bondCount === 2 ? 'bond-count-2' : 'bond-count-3');
    // Set symbol: = for 2 bonds, ≡ for 3 bonds
    geneBondSymbol.textContent = bondCount === 2 ? '=' : '≡';
    geneBondSymbol.style.color = bondCount === 2 ? 'rgba(230,57,70,0.6)' : 'rgba(42,157,143,0.6)';

    geneExpression.classList.add('gene-active');

    // Animate in sequence
    setTimeout(function() {
      geneName.style.transition = 'all 0.4s ease';
      geneName.style.opacity = '1';
      geneName.style.transform = 'translateY(0)';
    }, 50);
    setTimeout(function() {
      geneRole.style.transition = 'all 0.4s ease';
      geneRole.style.opacity = '1';
      geneRole.style.transform = 'translateY(0)';
    }, 200);
    setTimeout(function() {
      geneBio.style.transition = 'all 0.4s ease';
      geneBio.style.opacity = '1';
      geneBio.style.transform = 'translateY(0)';
    }, 350);
  }


  // ── Shuffle (mutate) the helix ──
  function mutateHelix() {
    shuffleArray(currentOrder);
    activeId = null;

    // Animate: fade out, reshuffle, fade in
    dnaRungsEl.style.transition = 'opacity 0.3s ease';
    dnaRungsEl.style.opacity = '0';

    setTimeout(function() {
      renderHelix();
      dnaRungsEl.style.opacity = '1';

      // Hide gene expression
      geneExpression.classList.remove('gene-active');
      geneName.textContent = 'Click a nucleotide to sequence';
      geneName.style.opacity = '1';
      geneName.style.transform = 'translateY(0)';
      geneRole.textContent = '';
      geneBio.textContent  = 'Click on a base pair rung in the DNA helix above to learn about that team member.';
      geneAvatarEl.innerHTML = '';
    }, 300);
  }


  // ── Sequence (random pick) ──
  function sequenceRandom() {
    if (currentOrder.length === 0) return;

    // Pick a random member
    var pick = currentOrder[Math.floor(Math.random() * currentOrder.length)];

    // Visual lift on the selected rung
    var allRungs = dnaRungsEl.querySelectorAll('.dna-rung');
    allRungs.forEach(function(rung) {
      if (parseInt(rung.dataset.id, 10) === pick) {
        // Add a brief highlight animation before selecting
        rung.style.transition = 'transform 0.3s ease';
        rung.style.transform += 'translateY(-8px) scale(1.05)';
        setTimeout(function() {
          rung.style.transition = '';
          selectMember(pick);
        }, 300);
      }
    });
  }

  // ── Event listeners ──
  if (shuffleBtn) {
    shuffleBtn.addEventListener('click', mutateHelix);
  }
  if (drawBtn) {
    drawBtn.addEventListener('click', sequenceRandom);
  }
  if (rotateToggleBtn) {
    rotateToggleBtn.addEventListener('click', toggleRotation);
  }

  // ── Init ──
  renderHelix();
  initReveal();
  initGradientText();
  initHeroParticles3D();

  // ── Start animation loop ──
  animateHelix();

  // ── Back to Top Button ──
  var backToTopBtn = document.createElement('button');
  backToTopBtn.className = 'back-to-top';
  backToTopBtn.innerHTML = '↑';
  backToTopBtn.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(backToTopBtn);

  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

})();
