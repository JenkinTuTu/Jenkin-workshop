/* 触屏点击一次显示标题层，再次点击进入链接（不破坏桌面 hover） */
(function () {
  const cards = document.querySelectorAll('.grid-item');

  let lastTouched = null;
  const isTouch = matchMedia('(hover: none) and (pointer: coarse)').matches;

  if (!isTouch) return; // 仅在触屏生效，桌面端仍用 :hover

  cards.forEach(card => {
    const link = card.querySelector('a');
    if (!link) return;

    // 第一次点：给卡片加 .touched（显示覆盖层）
    // 第二次点：真的跳转
    link.addEventListener('click', (e) => {
      if (lastTouched !== card) {
        e.preventDefault();
        if (lastTouched) lastTouched.classList.remove('touched');
        card.classList.add('touched');
        lastTouched = card;
        // 3 秒后自动还原，避免长时间停留
        clearTimeout(card._tmt);
        card._tmt = setTimeout(() => {
          card.classList.remove('touched');
          if (lastTouched === card) lastTouched = null;
        }, 3000);
      }
    }, { passive: true });

    // 触摸开始时移除系统高亮
    card.style.webkitTapHighlightColor = 'transparent';
  });

  // 点击空白处收起
  document.addEventListener('click', (e) => {
    if (!lastTouched) return;
    if (!e.target.closest('.grid-item')) {
      lastTouched.classList.remove('touched');
      lastTouched = null;
    }
  });
})();