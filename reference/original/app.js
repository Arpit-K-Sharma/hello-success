(function () {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu-button]');
  const navigation = document.querySelector('[data-nav]');

  function updateHeader() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 24);
  }

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  if (menuButton && navigation) {
    const menuLabel = menuButton.querySelector('.sr-only');
    const closeMenu = () => {
      menuButton.setAttribute('aria-expanded', 'false');
      if (menuLabel) menuLabel.textContent = 'Open menu';
      navigation.classList.remove('is-open');
      document.body.classList.remove('menu-open');
    };

    menuButton.addEventListener('click', () => {
      const opening = menuButton.getAttribute('aria-expanded') !== 'true';
      menuButton.setAttribute('aria-expanded', String(opening));
      if (menuLabel) menuLabel.textContent = opening ? 'Close menu' : 'Open menu';
      navigation.classList.toggle('is-open', opening);
      document.body.classList.toggle('menu-open', opening);
    });

    navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    window.addEventListener('resize', () => {
      if (window.innerWidth > 980) closeMenu();
    });
  }

  const glow = document.querySelector('[data-cursor-glow]');
  if (glow && !reducedMotion && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('pointermove', (event) => {
      glow.style.left = `${event.clientX}px`;
      glow.style.top = `${event.clientY}px`;
    }, { passive: true });
  }

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -42px' });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  document.querySelectorAll('[data-year]').forEach((item) => {
    item.textContent = new Date().getFullYear();
  });

  function seededRandom(seed) {
    let value = seed >>> 0;
    return function () {
      value += 0x6D2B79F5;
      let result = value;
      result = Math.imul(result ^ (result >>> 15), result | 1);
      result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
      return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* Hero network: a lightweight conceptual business nervous system. */
  const canvas = document.getElementById('network-canvas');
  if (canvas) {
    const context = canvas.getContext('2d');
    const random = seededRandom(2147);
    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes = [];
    let frame = 0;
    let isVisible = true;
    let mouseX = 0;
    let mouseY = 0;

    function sizeCanvas() {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = width < 700 ? 38 : 78;
      nodes = Array.from({ length: count }, (_, index) => ({
        x: random() * width,
        y: random() * height,
        vx: (random() - 0.5) * 0.16,
        vy: (random() - 0.5) * 0.16,
        r: index % 11 === 0 ? 2.5 : 1 + random() * 1.3,
        hot: index % 13 === 0
      }));
    }

    function drawHub(x, y, label, accent) {
      const pulse = reducedMotion ? 0 : Math.sin(frame * 0.025 + x) * 3;
      context.beginPath();
      context.arc(x, y, 28 + pulse, 0, Math.PI * 2);
      context.strokeStyle = accent;
      context.globalAlpha = 0.32;
      context.stroke();
      context.beginPath();
      context.arc(x, y, 5, 0, Math.PI * 2);
      context.fillStyle = accent;
      context.globalAlpha = 0.95;
      context.shadowBlur = 18;
      context.shadowColor = accent;
      context.fill();
      context.shadowBlur = 0;
      context.globalAlpha = 0.8;
      context.fillStyle = '#fbfff9';
      context.font = '600 10px SFMono-Regular, monospace';
      context.fillText(label, x + 38, y + 4);
    }

    function renderNetwork() {
      if (!isVisible || document.hidden) {
        if (!reducedMotion) requestAnimationFrame(renderNetwork);
        return;
      }

      context.clearRect(0, 0, width, height);
      const coreX = width < 700 ? width * 0.68 : width * 0.76;
      const coreY = width < 700 ? height * 0.72 : height * 0.48;
      const parallaxX = mouseX * 8;
      const parallaxY = mouseY * 8;

      nodes.forEach((node) => {
        if (!reducedMotion) {
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < 0 || node.x > width) node.vx *= -1;
          if (node.y < 0 || node.y > height) node.vy *= -1;
        }
      });

      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i];
        const ax = a.x + parallaxX * (a.r / 3);
        const ay = a.y + parallaxY * (a.r / 3);

        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const threshold = width < 700 ? 82 : 118;
          if (distance < threshold) {
            context.beginPath();
            context.moveTo(ax, ay);
            context.lineTo(b.x + parallaxX * (b.r / 3), b.y + parallaxY * (b.r / 3));
            context.strokeStyle = 'rgba(80,145,235,' + ((1 - distance / threshold) * 0.22) + ')';
            context.lineWidth = 0.7;
            context.stroke();
          }
        }

        const coreDistance = Math.hypot(a.x - coreX, a.y - coreY);
        if (coreDistance < Math.min(width, height) * 0.38 && i % 4 === 0) {
          context.beginPath();
          context.moveTo(ax, ay);
          context.lineTo(coreX, coreY);
          context.strokeStyle = a.hot ? 'rgba(185,241,255,.16)' : 'rgba(139,232,255,.09)';
          context.lineWidth = 0.8;
          context.stroke();
        }

        context.beginPath();
        context.arc(ax, ay, a.r, 0, Math.PI * 2);
        context.fillStyle = a.hot ? '#b9f1ff' : '#66b5ff';
        context.globalAlpha = a.hot ? 0.85 : 0.52;
        if (a.hot) {
          context.shadowBlur = 11;
          context.shadowColor = '#b9f1ff';
        }
        context.fill();
        context.shadowBlur = 0;
      }

      context.globalAlpha = 1;
      drawHub(coreX + width * 0.07, coreY - height * 0.23, 'REVENUE', '#b9f1ff');
      drawHub(coreX + width * 0.11, coreY, 'CUSTOMER', '#8be8ff');
      drawHub(coreX + width * 0.06, coreY + height * 0.23, 'OPERATIONS', '#66b5ff');

      frame += 1;
      if (!reducedMotion) requestAnimationFrame(renderNetwork);
    }

    canvas.addEventListener('pointermove', (event) => {
      const bounds = canvas.getBoundingClientRect();
      mouseX = (event.clientX - bounds.left) / bounds.width - 0.5;
      mouseY = (event.clientY - bounds.top) / bounds.height - 0.5;
    }, { passive: true });

    if ('IntersectionObserver' in window) {
      const canvasObserver = new IntersectionObserver((entries) => {
        isVisible = entries[0].isIntersecting;
      }, { threshold: 0.01 });
      canvasObserver.observe(canvas);
    }

    function resizeCanvas() {
      sizeCanvas();
      if (reducedMotion) renderNetwork();
    }

    sizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    renderNetwork();
  }

  /* Pause decorative CSS motion when its system is outside the viewport. */
  if ('IntersectionObserver' in window && !reducedMotion) {
    const animatedSystems = document.querySelectorAll('.network-hero, [data-motion-section], .connector-section, .intelligence-section, .cap-hero, .automation-lab');
    const motionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.target.classList.toggle('is-paused', !entry.isIntersecting));
    }, { rootMargin: '180px 0px', threshold: 0 });
    animatedSystems.forEach((system) => motionObserver.observe(system));
  }

  /* Scroll-led transformation sequence. */
  const motionSection = document.querySelector('[data-motion-section]');
  const motionSystem = document.querySelector('[data-motion-system]');
  const motionStories = Array.from(document.querySelectorAll('[data-motion-story]'));
  const phaseDots = Array.from(document.querySelectorAll('.phase-dots i'));

  if (motionSection && motionSystem) {
    function updateMotionSection() {
      if (window.innerWidth <= 980 || reducedMotion) {
        motionSystem.dataset.phase = '3';
        motionStories.forEach((story, index) => story.classList.toggle('is-active', index === 2));
        phaseDots.forEach((dot, index) => dot.classList.toggle('is-active', index === 2));
        return;
      }

      const bounds = motionSection.getBoundingClientRect();
      const travel = Math.max(1, bounds.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -bounds.top / travel));
      const phase = progress < 0.33 ? 1 : progress < 0.67 ? 2 : 3;
      motionSystem.dataset.phase = String(phase);
      motionStories.forEach((story, index) => story.classList.toggle('is-active', index === phase - 1));
      phaseDots.forEach((dot, index) => dot.classList.toggle('is-active', index === phase - 1));
    }

    updateMotionSection();
    window.addEventListener('scroll', updateMotionSection, { passive: true });
    window.addEventListener('resize', updateMotionSection);
  }

  /* Deterministic global connector globe. */
  const globePoints = document.querySelector('[data-globe-points]');
  const globeLinks = document.querySelector('[data-globe-links]');
  if (globePoints && globeLinks) {
    const random = seededRandom(9081);
    const points = [];
    const count = window.innerWidth < 700 ? 34 : 58;

    for (let i = 0; i < count; i += 1) {
      const latitude = Math.asin(2 * random() - 1);
      const longitude = random() * Math.PI * 2;
      const depth = Math.cos(latitude) * Math.cos(longitude);
      const x = 50 + Math.cos(latitude) * Math.sin(longitude) * 46;
      const y = 50 + Math.sin(latitude) * 46;
      const point = document.createElement('i');
      const size = 2 + (depth + 1) * 1.5;
      point.className = 'globe-point' + (i % 9 === 0 ? ' hot' : '');
      point.style.left = `${x}%`;
      point.style.top = `${y}%`;
      point.style.setProperty('--s', `${size}px`);
      point.style.setProperty('--d', `${1.8 + random() * 2.8}s`);
      point.style.opacity = String(0.25 + (depth + 1) * 0.25);
      globePoints.appendChild(point);
      points.push({ x: x * 6, y: y * 6 });
    }

    const namespace = 'http://www.w3.org/2000/svg';
    for (let i = 0; i < 16; i += 1) {
      const from = points[Math.floor(random() * points.length)];
      const to = points[Math.floor(random() * points.length)];
      const path = document.createElementNS(namespace, 'path');
      const midX = (from.x + to.x) / 2;
      const midY = Math.min(from.y, to.y) - 35 - random() * 55;
      path.setAttribute('d', `M${from.x.toFixed(1)} ${from.y.toFixed(1)} Q${midX.toFixed(1)} ${midY.toFixed(1)} ${to.x.toFixed(1)} ${to.y.toFixed(1)}`);
      path.style.animationDelay = `${(random() * 4).toFixed(1)}s`;
      globeLinks.appendChild(path);
    }
  }

  /* Interactive automation laboratory. */
  const lab = document.querySelector('[data-automation-lab]');
  if (lab) {
    const workflows = {
      sales: {
        status: 'REVENUE SIGNAL DETECTED',
        titles: ['New enquiry', 'Enrich + score', 'Assign + personalise', 'Follow up', 'Update forecast'],
        copies: ['Demand enters from a connected channel.', 'Context and intent create priority.', 'Rules and intelligence choose the path.', 'The right action reaches the right owner.', 'The outcome improves the next decision.'],
        output: 'Every demand signal becomes a visible next action.'
      },
      customer: {
        status: 'CUSTOMER SIGNAL DETECTED',
        titles: ['Customer signal', 'Identify context', 'Choose next action', 'Respond or route', 'Learn from outcome'],
        copies: ['A request or behaviour creates a signal.', 'History and journey context assemble.', 'Rules and intelligence select the path.', 'Service acts or a person takes control.', 'The outcome improves the next journey.'],
        output: 'Every interaction continues from a connected customer context.'
      },
      operations: {
        status: 'PROCESS SIGNAL DETECTED',
        titles: ['Process event', 'Validate data', 'Apply rules + AI', 'Trigger workflow', 'Report exceptions'],
        copies: ['A document, task or system event begins the flow.', 'Data is checked, enriched and prepared.', 'Logic and intelligence decide what can move.', 'Systems update and repeatable work completes.', 'People see the decisions that need attention.'],
        output: 'Repeatable work moves automatically while exceptions stay visible.'
      }
    };

    const buttons = Array.from(lab.querySelectorAll('[data-workflow]'));
    const status = lab.querySelector('[data-lab-status]');
    const output = lab.querySelector('[data-lab-output]');
    const panel = lab.querySelector('[role="tabpanel"]');

    function selectWorkflow(name) {
      const workflow = workflows[name];
      if (!workflow) return;
      lab.dataset.mode = name;
      status.textContent = workflow.status;
      output.textContent = workflow.output;
      workflow.titles.forEach((title, index) => {
        const titleNode = lab.querySelector(`[data-step-title="${index}"]`);
        const copyNode = lab.querySelector(`[data-step-copy="${index}"]`);
        if (titleNode) titleNode.textContent = title;
        if (copyNode) copyNode.textContent = workflow.copies[index];
      });
      buttons.forEach((button) => {
        const selected = button.dataset.workflow === name;
        button.classList.toggle('is-active', selected);
        button.setAttribute('aria-selected', String(selected));
        button.tabIndex = selected ? 0 : -1;
        if (selected && panel) panel.setAttribute('aria-labelledby', button.id);
      });
    }

    buttons.forEach((button) => button.addEventListener('click', () => selectWorkflow(button.dataset.workflow)));
    buttons.forEach((button, index) => button.addEventListener('keydown', (event) => {
      let nextIndex = null;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % buttons.length;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + buttons.length) % buttons.length;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = buttons.length - 1;
      if (nextIndex !== null) {
        event.preventDefault();
        const nextButton = buttons[nextIndex];
        selectWorkflow(nextButton.dataset.workflow);
        nextButton.focus();
      }
    }));
  }

  /* Transformation brief builder. */
  const briefForm = document.querySelector('[data-brief-form]');
  if (briefForm) {
    const resultPanel = briefForm.querySelector('[data-brief-result]');
    const briefOutput = briefForm.querySelector('[data-generated-brief]');
    const copyButton = briefForm.querySelector('[data-copy-brief]');
    const copyStatus = briefForm.querySelector('[data-copy-status]');

    briefForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(briefForm);
      const focus = data.get('focus');
      const challenge = String(data.get('challenge') || '').trim();
      const outcome = String(data.get('outcome') || '').trim();

      briefOutput.value = [
        'Hello Success + IT Together transformation starter',
        '',
        `Primary opportunity: ${focus}`,
        '',
        'What is happening now:',
        challenge,
        '',
        'What a better result would look like:',
        outcome,
        '',
        'I would like to explore the process improvement, connected platforms, automation and intelligence needed to deliver this outcome.'
      ].join('\n');

      resultPanel.hidden = false;
      resultPanel.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'nearest' });
      copyStatus.textContent = '';
    });

    copyButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(briefOutput.value);
        copyStatus.textContent = 'Copied';
      } catch (error) {
        briefOutput.focus();
        briefOutput.select();
        const copied = document.execCommand('copy');
        copyStatus.textContent = copied ? 'Copied' : 'Select the text and copy it';
      }
    });
  }
})();
