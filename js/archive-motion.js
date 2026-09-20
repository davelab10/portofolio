(() => {
  const root = document.documentElement;
  const story = document.querySelector('.railcall-story');
  const visualRail = document.querySelector('.story-visuals');
  const workflowStory = document.querySelector('[data-workflow-story]');
  const workflowStates = [...document.querySelectorAll('[data-workflow-state]')];
  const moduleSteps = [...document.querySelectorAll('.module-step')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const assetChecks = new Map();
  const loaded = new WeakSet();
  let frame = 0;
  let pinned = false;
  let activeWorkflowState = -1;
  let activeModuleState = -1;

  root.classList.add('js-motion');

  function assetExists(path) {
    if (!assetChecks.has(path)) {
      assetChecks.set(path, fetch(path, { method: 'HEAD', cache: 'force-cache' })
        .then((response) => response.ok)
        .catch(() => false));
    }
    return assetChecks.get(path);
  }

  function loadFigure(figure) {
    if (!figure || loaded.has(figure)) return Promise.resolve(figure?.dataset.ready === 'true');
    const media = figure.querySelector('[data-src]');
    if (!media) return Promise.resolve(false);
    loaded.add(figure);
    return assetExists(media.dataset.src).then((exists) => {
      if (!exists) return false;
      return new Promise((resolve) => {
        let done = false;
        const finish = (ready) => {
          if (done) return;
          done = true;
          window.clearTimeout(timeout);
          if (ready) {
            figure.dataset.ready = 'true';
            figure.hidden = false;
          } else loaded.delete(figure);
          resolve(ready);
        };
        const timeout = window.setTimeout(() => finish(false), 9000);
        media.addEventListener('loadeddata', () => finish(true), { once: true });
        media.addEventListener('canplay', () => finish(true), { once: true });
        media.addEventListener('load', () => finish(true), { once: true });
        media.addEventListener('error', () => finish(false), { once: true });
        if (media.tagName === 'VIDEO') media.controls = reduceMotion.matches;
        media.src = media.dataset.src;
        if (media.tagName === 'VIDEO') media.load();
        else if (media.complete && media.naturalWidth > 0) finish(true);
      });
    });
  }

  function setActiveFigures(figures, state, modulePhase = false) {
    const candidates = [...visualRail.querySelectorAll('.story-visual[data-ready="true"]')];
    candidates.forEach((figure) => {
      const active = figures.includes(figure);
      figure.classList.toggle('is-active', active);
      figure.setAttribute('aria-hidden', String(!active));
      const video = figure.querySelector('video');
      if (!video) return;
      if (active && !reduceMotion.matches) {
        const playback = video.play();
        if (playback && typeof playback.catch === 'function') playback.catch(() => {});
      } else video.pause();
    });
    visualRail.dataset.state = state;
    visualRail.classList.toggle('has-supporting', figures.some((figure) => figure.classList.contains('leaderboard-visual')));
    story.classList.toggle('module-phase', modulePhase);
  }

  function activateWorkflowState(index) {
    const state = workflowStates[index];
    const workflowFigure = visualRail.querySelector('.workflow-visual[data-ready="true"]');
    if (!state || !workflowFigure || index === activeWorkflowState) return;
    activeWorkflowState = index;
    activeModuleState = -1;
    workflowStates.forEach((entry, stateIndex) => {
      const active = stateIndex === index;
      entry.classList.toggle('is-active', active);
      entry.setAttribute('aria-hidden', String(!active));
    });
    setActiveFigures([workflowFigure], state.dataset.state || 'workflow');
  }

  function activateModuleState(step, index) {
    if (!step || index === activeModuleState) return;
    const moduleFigure = visualRail.querySelector('.module-visual[data-ready="true"]');
    if (!moduleFigure) return;
    activeModuleState = index;
    activeWorkflowState = -1;
    setActiveFigures(
      step.dataset.visualState === 'module-proof'
        ? [moduleFigure, visualRail.querySelector('.leaderboard-visual[data-ready="true"]')].filter(Boolean)
        : [moduleFigure],
      step.dataset.state || 'module',
      true,
    );
  }

  function workflowProgress() {
    const rect = workflowStory.getBoundingClientRect();
    const travel = Math.max(workflowStory.offsetHeight - window.innerHeight, 1);
    return Math.min(1, Math.max(0, -rect.top / travel));
  }

  function visibleModuleStep() {
    const midpoint = window.innerHeight * 0.52;
    let closest = null;
    let distance = Infinity;
    moduleSteps.forEach((step, index) => {
      const rect = step.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const center = rect.top + rect.height / 2;
      const nextDistance = Math.abs(center - midpoint);
      if (nextDistance < distance) {
        closest = { step, index };
        distance = nextDistance;
      }
    });
    return closest;
  }

  function updateScroll() {
    frame = 0;
    if (!pinned) return;
    const workflowRect = workflowStory.getBoundingClientRect();
    const workflowVisible = workflowRect.top <= 0 && workflowRect.bottom >= window.innerHeight;
    if (workflowVisible) {
      const index = Math.min(workflowStates.length - 1, Math.floor(workflowProgress() * workflowStates.length));
      activateWorkflowState(index);
      return;
    }
    if (workflowRect.bottom < window.innerHeight) {
      const moduleState = visibleModuleStep();
      if (moduleState) activateModuleState(moduleState.step, moduleState.index);
      return;
    }
    activateWorkflowState(0);
  }

  function queueScrollUpdate() {
    if (!frame) frame = window.requestAnimationFrame(updateScroll);
  }

  function watchWorkIndex() {
    const items = [...document.querySelectorAll('.work-item')];
    const previews = [...document.querySelectorAll('.archive-preview-figure')];
    const activate = (item) => {
      const project = item.dataset.project;
      items.forEach((entry) => entry.classList.toggle('is-selected', entry === item));
      previews.forEach((figure) => figure.classList.toggle('is-active', figure.id === `archive-preview-${project}`));
    };
    items.forEach((item) => {
      const link = item.querySelector('.work-item-link');
      link?.addEventListener('mouseenter', () => activate(item));
      link?.addEventListener('focus', () => activate(item));
    });
  }

  function showNaturalMedia() {
    delete story.dataset.choreography;
    delete visualRail.dataset.choreography;
    delete visualRail.dataset.state;
    story.dataset.motionMode = 'natural';
    story.classList.add('no-pin');
    visualRail.hidden = false;
    visualRail.querySelectorAll('.story-visual[data-ready="true"]').forEach((figure) => {
      figure.classList.add('is-active');
      figure.removeAttribute('aria-hidden');
      const video = figure.querySelector('video');
      if (video) {
        video.controls = reduceMotion.matches;
        if (reduceMotion.matches) video.pause();
      }
    });
    workflowStates.forEach((state) => {
      state.classList.add('is-active');
      state.removeAttribute('aria-hidden');
    });
    activeWorkflowState = -1;
    activeModuleState = -1;
  }

  function setPinMode() {
    const workflowReady = visualRail.querySelector('.workflow-visual[data-ready="true"]');
    const moduleReady = visualRail.querySelector('.module-visual[data-ready="true"]');
    pinned = Boolean(workflowReady && moduleReady && !reduceMotion.matches && window.innerWidth > 850);
    if (!pinned) {
      showNaturalMedia();
      return;
    }
    story.dataset.choreography = 'on';
    visualRail.dataset.choreography = 'on';
    story.classList.remove('no-pin');
    visualRail.hidden = false;
    activeWorkflowState = -1;
    activeModuleState = -1;
    queueScrollUpdate();
  }

  function startRailMedia() {
    const figures = visualRail.querySelectorAll('.story-visual');
    Promise.all([...figures].map(loadFigure)).then(() => {
      setPinMode();
      queueScrollUpdate();
    });
  }

  function init() {
    if (!story || !visualRail || !workflowStory || !workflowStates.length) return;
    visualRail.hidden = true;
    watchWorkIndex();
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        startRailMedia();
        observer.disconnect();
      }, { rootMargin: '80% 0px' });
      observer.observe(story);
    } else startRailMedia();
    window.addEventListener('scroll', queueScrollUpdate, { passive: true });
    window.addEventListener('resize', () => { setPinMode(); queueScrollUpdate(); }, { passive: true });
    reduceMotion.addEventListener?.('change', () => {
      document.querySelectorAll('video').forEach((video) => {
        video.controls = reduceMotion.matches;
        if (reduceMotion.matches) video.pause();
      });
      setPinMode();
      queueScrollUpdate();
    });
  }

  init();
})();
