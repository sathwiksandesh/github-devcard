const input = document.getElementById('username-input');
const btn = document.getElementById('generate-btn');
const wrapper = document.getElementById('card-wrapper');
const errorMsg = document.getElementById('error-msg');

// ── Helpers ──────────────────────────────────────────────
function fmt(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
  return String(n);
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getPersona(repos) {
  const langs = {};
  repos.forEach(r => { if (r.language) langs[r.language] = (langs[r.language] || 0) + 1; });
  const topLang = Object.entries(langs).sort((a, b) => b[1] - a[1])[0]?.[0] || '';

  if (['Python', 'Jupyter Notebook', 'R'].includes(topLang)) return { label: 'Researcher', summary: 'Focused on data-driven work and analytical projects, with a strong inclination towards applied AI and data-driven insights.' };
  if (['JavaScript', 'TypeScript', 'HTML', 'CSS', 'Vue', 'Svelte'].includes(topLang)) return { label: 'Web Dev', summary: 'Crafts interactive web experiences and modern interfaces, bridging design with robust front-end engineering.' };
  if (['Rust', 'C', 'C++', 'Assembly', 'Go'].includes(topLang)) return { label: 'Systems Dev', summary: 'Builds close-to-metal, performance-critical software with a deep understanding of how computers actually work.' };
  if (['Swift', 'Kotlin', 'Dart', 'Objective-C'].includes(topLang)) return { label: 'Mobile Dev', summary: 'Focuses on native mobile experiences, building apps that live right in users\' pockets.' };
  if (['Java', 'C#', 'Scala', 'Kotlin'].includes(topLang)) return { label: 'Backend Dev', summary: 'Architects resilient backend systems and services that power scalable applications.' };
  if (['Shell', 'Dockerfile', 'HCL', 'Makefile'].includes(topLang)) return { label: 'DevOps', summary: 'Keeps the infra humming — automation, CI/CD, containers, and everything that makes code ship reliably.' };
  return { label: 'Builder', summary: 'A versatile engineer tackling a wide range of domains, with a general-purpose mindset and a bias for action.' };
}

function getTopLanguages(repos) {
  const langs = {};
  repos.forEach(r => { if (r.language) langs[r.language] = (langs[r.language] || 0) + 1; });
  return Object.entries(langs)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(e => e[0]);
}

function getTotalStars(repos) {
  return repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
}

// ── Render Card ───────────────────────────────────────────
function renderCard(user, repos) {
  const topRepos = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 3);

  const topLangs = getTopLanguages(repos);
  const totalStars = getTotalStars(repos);
  const persona = getPersona(repos);
  const totalForks = repos.reduce((s, r) => s + (r.forks_count || 0), 0);

  const tagsHTML = topLangs.map(l => `<span class="tag">${escapeHtml(l)}</span>`).join('');

  const projectsHTML = topRepos.map(r => `
    <div class="project-item">
      <span class="project-name">${escapeHtml(r.name)}</span>
      <div class="project-meta">
        ${r.language ? `<span class="project-lang">${escapeHtml(r.language)}</span>` : ''}
        <span class="project-stars">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          ${r.stargazers_count}
        </span>
      </div>
    </div>
  `).join('');

  const locationHTML = user.location ? `
    <span class="card-location">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
      ${escapeHtml(user.location)}
    </span>` : '';

  const bioText = user.bio
    ? `"${escapeHtml(user.bio)}"`
    : `"${escapeHtml(user.name || user.login)} is an active developer with ${user.public_repos} public repositories on GitHub."`;

  wrapper.innerHTML = `
    <div class="dev-card card-animate">
      <div class="card-header">
        <div class="avatar-wrap">
          <img class="avatar" src="${escapeHtml(user.avatar_url)}" alt="${escapeHtml(user.login)}" loading="lazy"/>
          <div class="avatar-ring"></div>
        </div>
        <div class="card-name-section">
          <div class="card-name">${escapeHtml(user.name || user.login)}</div>
          <div class="card-handle">@${escapeHtml(user.login)}</div>
          ${locationHTML}
        </div>
      </div>

      <p class="card-bio">${bioText}</p>

      ${tagsHTML ? `<div class="tags">${tagsHTML}</div>` : ''}

      <div class="stats-grid">
        <div class="stat-item">
          <span class="stat-value">${fmt(user.public_repos)}</span>
          <span class="stat-label">Repos</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">${fmt(user.followers)}</span>
          <span class="stat-label">Followers</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">${fmt(totalStars)}</span>
          <span class="stat-label">Stars</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">${fmt(totalForks)}</span>
          <span class="stat-label">Forks</span>
        </div>
      </div>

      ${projectsHTML ? `
        <div class="section-label">Top Projects</div>
        <div class="projects-list">${projectsHTML}</div>
      ` : ''}

      <div class="card-footer">
        <p class="persona-summary">${persona.summary}</p>
        <span class="persona-badge">${persona.label}</span>
      </div>
    </div>
  `;
}

// ── Show Loading ──────────────────────────────────────────
function showLoading() {
  wrapper.innerHTML = `
    <div class="dev-card">
      <div class="loading-state">
        <div class="spinner"></div>
        <p>Fetching GitHub data...</p>
      </div>
    </div>
  `;
}

// ── Fetch Data ────────────────────────────────────────────
async function fetchDevCard(username) {
  errorMsg.textContent = '';
  showLoading();
  btn.classList.add('loading');
  btn.textContent = 'Loading...';

  try {
    const headers = { 'Accept': 'application/vnd.github+json' };

    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, { headers }),
      fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`, { headers })
    ]);

    if (userRes.status === 404) throw new Error('User not found. Check the username and try again.');
    if (userRes.status === 403) throw new Error('GitHub API rate limit hit. Try again in a minute.');
    if (!userRes.ok) throw new Error('Failed to fetch user data from GitHub.');

    const user = await userRes.json();
    const repos = reposRes.ok ? await reposRes.json() : [];

    renderCard(user, Array.isArray(repos) ? repos : []);

  } catch (err) {
    wrapper.innerHTML = '';
    errorMsg.textContent = err.message || 'Something went wrong. Please try again.';
  } finally {
    btn.classList.remove('loading');
    btn.innerHTML = `Generate <svg class="btn-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`;
  }
}

// ── Events ────────────────────────────────────────────────
btn.addEventListener('click', () => {
  const username = input.value.trim();
  if (!username) { errorMsg.textContent = 'Please enter a GitHub username.'; return; }
  fetchDevCard(username);
});

input.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const username = input.value.trim();
    if (!username) { errorMsg.textContent = 'Please enter a GitHub username.'; return; }
    fetchDevCard(username);
  }
});

input.addEventListener('input', () => { errorMsg.textContent = ''; });
