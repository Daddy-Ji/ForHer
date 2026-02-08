document.addEventListener('DOMContentLoaded', () => {
  const scenes = document.querySelectorAll('.scene');
  let current = 0;

  // Floating hearts
  function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 8 + 10) + 's';
    heart.style.width = heart.style.height = (Math.random() * 20 + 12) + 'px';
    document.querySelector('.hearts-bg').appendChild(heart);

    setTimeout(() => heart.remove(), 15000);
  }

  setInterval(createHeart, 700);

  // Click to next
  function nextScene() {
    if (current >= scenes.length - 1) return;

    scenes[current].classList.add('hidden');
    current++;
    scenes[current].classList.remove('hidden');

    // Trigger reveals
    setTimeout(() => {
      scenes[current].querySelectorAll('.reveal').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 400 + 200);
      });

      // Special for proposal scene
      if (scenes[current].id === 's4') {
        document.querySelector('.big-heart').style.opacity = '1';
        document.querySelector('.big-heart').style.transform = 'scale(1)';
      }
    }, 100);
  }

  document.body.addEventListener('click', (e) => {
    // Skip buttons click
    if (e.target.tagName === 'BUTTON') return;

    if (scenes[current].classList.contains('proposal')) {
      // already in final scene — no more next
      return;
    }
    nextScene();
  });

  // Proposal buttons
  const yesBtn = document.querySelector('.btn.yes');
  const noBtn  = document.querySelector('.btn.no');
  const happy  = document.getElementById('happy');
  const sad    = document.getElementById('sad');

  yesBtn.addEventListener('click', () => {
    happy.classList.remove('hidden');
    sad.classList.add('hidden');
    yesBtn.style.display = 'none';
    noBtn.style.display = 'none';
    // Optional: launch more hearts or confetti here
    for(let i=0; i<30; i++) setTimeout(createHeart, i*80);
  });

  noBtn.addEventListener('click', () => {
    sad.classList.remove('hidden');
    happy.classList.add('hidden');
    yesBtn.style.display = 'none';
    noBtn.style.display = 'none';
  });

  // Optional: soft background music (uncomment if you add a track)
  // const music = document.getElementById('bgMusic');
  // music.volume = 0.25;
  // setTimeout(() => music.play().catch(()=>{}), 2000);

  // Start first scene
  scenes[0].querySelectorAll('.reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), i * 500 + 300);
  });
});