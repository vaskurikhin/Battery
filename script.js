'use strict';
// Content is visible by default. Motion is progressive enhancement only.
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('js-motion');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.06 });
  document.querySelectorAll('.reveal').forEach(section => observer.observe(section));
}
const materials = {
  pet: ['🧴', 'PET-бутылка', '👕', 'Новая футболка', 'Из чистого PET получают волокно для тканей и наполнителей.'],
  glass: ['🍾', 'Стеклянная банка', '🫙', 'Новая банка', 'Стеклобой плавят и используют для новой стеклянной тары.'],
  aluminum: ['🥫', 'Алюминиевая банка', '🚲', 'Детали велосипеда', 'Алюминий переплавляют в металл для новых изделий и деталей.'],
  paper: ['📦', 'Старый картон', '📓', 'Бумага и упаковка', 'Бумажное волокно становится сырьём для новой бумаги и картона.'],
  tin: ['🥫', 'Консервная банка', '🔩', 'Стальные изделия', 'Жестяную тару перерабатывают, возвращая сталь в производство.'],
  organic: ['🍎', 'Пищевые остатки', '🌱', 'Компост', 'Подходящие органические отходы компостируют в специальных условиях.']
};
document.querySelectorAll('[data-material]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-material]').forEach(item => { const selected = item === button; item.classList.toggle('active', selected); item.setAttribute('aria-pressed', String(selected)); });
  const values = materials[button.dataset.material];
  ['material-in-icon', 'material-in', 'material-out-icon', 'material-out', 'material-note'].forEach((id, index) => document.getElementById(id).textContent = values[index]);
}));
document.querySelector('[data-start]').addEventListener('click', () => { document.getElementById('battery').open = true; });
const dialog = document.getElementById('join-dialog');
document.getElementById('join').addEventListener('click', () => dialog.showModal());
dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
dialog.querySelectorAll('input').forEach(input => input.addEventListener('change', () => {
  const count = dialog.querySelectorAll('input:checked').length;
  document.getElementById('plan-status').textContent = count === 3 ? 'Три из трёх. У нашего двора отличный сосед 💚' : count ? `Уже сделано: ${count} из 3. Каждый шаг считается!` : 'Большие привычки начинаются с маленького «сделано».';
}));
// No external message is sent: the visitor chooses where to share this text.
const invite = 'Привет, соседи! Давайте начнём с малого: будем сдавать батарейки отдельно. Предлагаю найти ближайший пункт, проверить правила приёма и сходить вместе. Кто со мной? Лучше сделать 20%, чем 0% 💚';
document.querySelectorAll('.copy-invite').forEach(button => button.addEventListener('click', async () => {
  const status = button.parentElement.querySelector('.copy-status');
  try { await navigator.clipboard.writeText(invite); status.textContent = 'Приглашение скопировано. Отправь его в чат дома, когда будешь готов.'; }
  catch { status.textContent = invite; }
}));
