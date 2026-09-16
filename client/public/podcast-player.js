(() => {
  const episodes = [
    { id: '73voyV4WuXvPvP45S9cjH4', title: 'Remember the Sabbath', show: 'BibleProject', tags: ['sabbath', 'bible'] },
    { id: '1ncaSOwNa3FXWfTr0mCxW6', title: 'Be Family Around a Table', show: 'Practicing the Way', tags: ['community', 'formation'] },
    { id: '1GzCbF3gDRcLQS6lklE9MT', title: 'John Mark Comer on Spiritual Formation', show: 'That Sounds Fun', tags: ['formation', 'discipleship'] },
    { id: '4JZ7s2SHyxMU7IAZZBxpNF', title: 'No Accidental Saints: Spiritual Formation', show: 'The Intentional Parents Podcast', tags: ['formation', 'habits'] },
    { id: '0V6KWGhJ2f6XOh9mzSmLDM', title: 'When God Seems Distant', show: 'Think Biblically', tags: ['faith', 'perseverance'] },
    { id: '7frii3CB4Hily2vF6UdRWq', title: 'How Did the Fig Tree Wither So Quickly?', show: 'Practicing the Way', tags: ['fruitfulness', 'formation'] },
    { id: '29yW4Ds8vnn0jaSbIQe9ZV', title: 'What Does It Mean To Be Human?', show: 'Practicing the Way', tags: ['identity', 'formation'] },
    { id: '4VXwLxTYUU6l4B3tmYY2hy', title: 'Jesus on Becoming a Non-Anxious Presence', show: 'Practicing the Way', tags: ['anxiety', 'jesus'] },
    { id: '7mSMDJhQRGlu2mesO3h0AK', title: 'Three Shifts of Discipleship', show: 'Practicing the Way', tags: ['discipleship', 'hope'] },
    { id: '6SvYHTIyzpXLpP1AqgsKnm', title: 'Spiritual Formation & Motherhood', show: 'The Intentional Parents Podcast', tags: ['formation', 'family'] },
    { id: '6j4UuPCHNLVI2hwVfzV4Vg', title: 'How Does Jesus Teach Us to Pray?', show: 'BibleProject', tags: ['prayer', 'bible'] },
    { id: '3bbPnwWfBVZaiSYGEXipBs', title: 'A Conversation with Ronald Rolheiser and John Mark Comer', show: 'The Contemplative Pastor', tags: ['discipleship', 'formation'] },
    { id: '5XlSmTWMjdGj3CN9WDpban', title: 'Ronald Rolheiser on Giving Your Life Away', show: 'Practicing the Way', tags: ['discipleship', 'service'] },
    { id: '4vk651hpycoLUhy4A0nodg', title: 'John Mark Comer on Modern Discipleship', show: 'Carey Nieuwhof Leadership Podcast', tags: ['discipleship', 'church'] },
    { id: '6IHWKixejO8FGpqpJmyGxE', title: 'Lord of the Sabbath', show: 'BibleProject', tags: ['sabbath', 'bible'] },
    { id: '35NcKUKpbsblsqgJX27VOR', title: 'The Cathedral in Time', show: 'BibleProject', tags: ['sabbath', 'rest'] },
    { id: '56zHb0zSGa36fbGhWrVBBh', title: 'Prayer and Spiritual Formation', show: 'For the Beauty', tags: ['prayer', 'formation'] },
    { id: '7cBeWxkVxDXSaeDsMw4abF', title: 'Faith, Sabbath and Christian Hope', show: 'Ask NT Wright Anything', tags: ['faith', 'sabbath'] },
    { id: '2cMUg5Oc1o4PO7L1nRLGT2', title: 'Is the Sabbath Still Relevant for Christians?', show: 'The Crossway Podcast', tags: ['sabbath', 'rest'] },
    { id: '6BhYHj89g7Q0OQ5phIOGWe', title: 'Does God Lead Us Into Temptation?', show: 'BibleProject', tags: ['temptation', 'prayer'] },
    { id: '67UrQwtlzo9raLOCiuhSIb', title: 'How Do We Pray? The Theology of Prayer', show: 'Back Porch Theology', tags: ['prayer', 'theology'] },
    { id: '2RevSI2XkQd1Z2FAmuwYAE', title: 'Intro to BibleProject Podcast', show: 'BibleProject', tags: ['bible', 'formation'] },
    { id: '51efUzkqvIdnBUFJzn8xKw', title: "Sabbath Isn't Just a Day Off", show: 'The Christian Clinician', tags: ['sabbath', 'rest'] },
    { id: '47uCd08HL8Aa8hO8PM6UGt', title: 'Contemplative Prayer', show: 'Hearing Jesus', tags: ['prayer', 'reflection'] },
    { id: '1pQo6Aehk5wfYOAxqNOrMi', title: 'The Role of the Bible', show: 'Sabbath School with Dwain Esmond', tags: ['bible', 'formation'] }
  ];

  const STATE_KEY = 'clearcore-podcast-v2';
  let current = 0;
  let expanded = false;
  let visible = true;
  let loadedEpisode = null;

  try {
    const saved = JSON.parse(localStorage.getItem(STATE_KEY) || '{}');
    if (Number.isInteger(saved.current) && saved.current >= 0 && saved.current < episodes.length) current = saved.current;
    if (saved.visible === false) visible = false;
  } catch (_) {}

  const persist = () => {
    try { localStorage.setItem(STATE_KEY, JSON.stringify({ current, visible })); } catch (_) {}
  };

  const pickDifferent = () => {
    if (episodes.length < 2) return 0;
    let next = Math.floor(Math.random() * episodes.length);
    while (next === current) next = Math.floor(Math.random() * episodes.length);
    return next;
  };

  const style = document.createElement('style');
  style.textContent = `
    #cc-podcast-root{position:relative;z-index:2147483000;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
    #cc-podcast-launcher{position:fixed;right:12px;bottom:max(78px,calc(66px + env(safe-area-inset-bottom)));z-index:2147483001;border:1px solid rgba(16,185,129,.45);border-radius:999px;background:rgba(255,255,255,.96);color:#047857;padding:10px 15px;font:700 13px/1.2 Inter,system-ui,sans-serif;box-shadow:0 10px 30px rgba(15,23,42,.18);cursor:pointer;touch-action:manipulation;backdrop-filter:blur(10px)}
    #cc-podcast-restore{position:fixed;right:8px;bottom:max(78px,calc(66px + env(safe-area-inset-bottom)));z-index:2147483001;width:34px;height:34px;border:1px solid rgba(16,185,129,.35);border-radius:10px;background:rgba(255,255,255,.74);color:#047857;font-size:16px;opacity:.46;cursor:pointer;touch-action:manipulation;backdrop-filter:blur(8px)}
    #cc-podcast-panel{position:fixed;right:8px;bottom:max(76px,calc(64px + env(safe-area-inset-bottom)));z-index:2147483002;width:min(520px,calc(100vw - 16px));box-sizing:border-box;border:1px solid rgba(16,185,129,.28);border-radius:18px;background:rgba(255,255,255,.985);color:#0f172a;padding:13px;box-shadow:0 20px 55px rgba(15,23,42,.24);backdrop-filter:blur(12px);transition:opacity .14s ease,transform .14s ease}
    #cc-podcast-panel.cc-panel-collapsed{opacity:0;pointer-events:none;transform:translateY(24px) scale(.98);visibility:hidden}
    #cc-podcast-live-frame{display:block;width:100%;height:152px;border:0;border-radius:12px;background:#f1f5f9;margin-top:10px}
    .cc-head{display:flex;gap:10px;justify-content:space-between;align-items:flex-start}.cc-kicker{color:#059669;font-size:10px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}.cc-title{font-size:15px;line-height:1.3;margin:4px 0 0;color:#0f172a}.cc-meta{font-size:11px;color:#64748b;margin:5px 0 0}.cc-close{width:38px;height:38px;flex:0 0 38px;border-radius:10px;border:1px solid #dbe5df;background:#f8fafc;color:#334155;font-size:21px;cursor:pointer}.cc-actions{display:flex;gap:7px;flex-wrap:wrap;margin-top:9px}.cc-actions button,.cc-actions a{border-radius:10px;padding:9px 11px;font:700 12px/1.2 Inter,system-ui,sans-serif;text-decoration:none;cursor:pointer}.cc-next{border:0;background:#059669;color:#fff}.cc-open{display:inline-flex;align-items:center;border:1px solid #d8e7df;background:#f0fdf4;color:#047857}.cc-hide{border:1px solid #e2e8f0;background:#fff;color:#64748b}.cc-note{font-size:10px;line-height:1.45;color:#64748b;margin:8px 0 0}
    .cc-hidden{display:none!important}
    @media (prefers-color-scheme:dark){#cc-podcast-launcher,#cc-podcast-restore{background:rgba(15,23,42,.94);color:#6ee7b7;border-color:rgba(52,211,153,.35)}#cc-podcast-panel{background:rgba(15,23,42,.985);color:#e2e8f0;border-color:rgba(52,211,153,.28)}.cc-title{color:#f8fafc}.cc-meta,.cc-note{color:#94a3b8}.cc-close{background:#111827;color:#e5e7eb;border-color:#334155}.cc-open{background:#10251e;color:#6ee7b7;border-color:#275a46}.cc-hide{background:#111827;color:#cbd5e1;border-color:#334155}}
    @media(max-width:640px){#cc-podcast-panel{right:4px;width:calc(100vw - 8px);padding:10px}.cc-actions>*{flex:1;justify-content:center;text-align:center}}
  `;
  document.head.appendChild(style);

  const root = document.createElement('div');
  root.id = 'cc-podcast-root';
  root.innerHTML = `
    <button id="cc-podcast-launcher" type="button" aria-label="Open ClearCore podcasts">🎧 Podcasts</button>
    <button id="cc-podcast-restore" class="cc-hidden" type="button" aria-label="Show podcasts" title="Show podcasts">🎧</button>
    <aside id="cc-podcast-panel" class="cc-panel-collapsed" aria-label="ClearCore podcast player" aria-hidden="true">
      <div class="cc-head">
        <div>
          <div class="cc-kicker">ClearCore · faith / formation</div>
          <h2 class="cc-title"></h2>
          <p class="cc-meta"></p>
        </div>
        <button class="cc-close" type="button" aria-label="Collapse podcast controls">×</button>
      </div>
      <iframe id="cc-podcast-live-frame" title="ClearCore Spotify podcast episode" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
      <div class="cc-actions">
        <button class="cc-next" type="button">🎲 Different podcast</button>
        <a class="cc-open" target="_blank" rel="noopener noreferrer">Open in Spotify ↗</a>
        <button class="cc-hide" type="button">Hide podcasts</button>
      </div>
      <p class="cc-note">25 episodes about prayer, discipleship, rest, temptation and spiritual formation. Closing or hiding the controls keeps the same Spotify iframe alive, so playback can continue while you use ClearCore.</p>
    </aside>`;
  document.body.appendChild(root);

  const launcher = root.querySelector('#cc-podcast-launcher');
  const restore = root.querySelector('#cc-podcast-restore');
  const panel = root.querySelector('#cc-podcast-panel');
  const frame = root.querySelector('#cc-podcast-live-frame');
  const title = root.querySelector('.cc-title');
  const meta = root.querySelector('.cc-meta');
  const openLink = root.querySelector('.cc-open');

  function updateEpisodeUi() {
    const episode = episodes[current];
    title.textContent = episode.title;
    meta.textContent = `${episode.show} · ${episode.tags.join(' · ')}`;
    openLink.href = `https://open.spotify.com/episode/${encodeURIComponent(episode.id)}`;
  }

  function loadCurrent(force = false) {
    const episode = episodes[current];
    updateEpisodeUi();
    if (!force && loadedEpisode === episode.id) return;
    loadedEpisode = episode.id;
    frame.src = `https://open.spotify.com/embed/episode/${encodeURIComponent(episode.id)}?theme=0`;
    frame.title = `Spotify episode: ${episode.title}`;
  }

  function syncUi() {
    launcher.classList.toggle('cc-hidden', !visible || expanded);
    restore.classList.toggle('cc-hidden', visible);
    panel.classList.toggle('cc-panel-collapsed', !visible || !expanded);
    panel.setAttribute('aria-hidden', (!visible || !expanded) ? 'true' : 'false');
  }

  function openPlayer() {
    loadCurrent();
    expanded = true;
    syncUi();
  }

  function collapsePlayer() {
    expanded = false;
    syncUi();
  }

  function setVisible(next) {
    visible = !!next;
    if (!visible) expanded = false;
    persist();
    syncUi();
  }

  launcher.addEventListener('click', openPlayer);
  restore.addEventListener('click', () => setVisible(true));
  root.querySelector('.cc-close').addEventListener('click', collapsePlayer);
  root.querySelector('.cc-next').addEventListener('click', () => {
    current = pickDifferent();
    persist();
    loadCurrent(true);
  });
  root.querySelector('.cc-hide').addEventListener('click', () => setVisible(false));

  updateEpisodeUi();
  syncUi();
})();