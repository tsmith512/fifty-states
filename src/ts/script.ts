interface State {
  abbr: string;
  days: number;
  first: number;
  points: number;
  state: string;
}

(async () => {
  const states = await fetch('https://api.routenotfound.com/fifty_states').then(r => r.json()) as State[];
  const counter = document.querySelector('#count') as Element;

  // quickly mark top 5 states
  states.sort((a, b) => b.points - a.points);
  const top5list = document.getElementById('states-list');
  for (let i = 1; i < 6; i++) { // Skip home state
    const state = states[i];
    if (top5list) {
      const stateLi = document.createElement('li');
      stateLi.textContent = state.state;
      top5list.append(stateLi);
    }
    document.querySelectorAll(`#map [id^="${state.abbr}"]`).forEach(el => el.classList.add('top5'));
  }


  // Animate in the visited states, ordered by first waypoint
  states.sort((a, b) => a.first - b.first);
  for (let i = 0; i < states.length; i++) {
    const state = states[i];
    // Mark the state visited (CSS will animate its opacity fade-in)
    document.querySelectorAll(`#map [id^="${state.abbr}"]`).forEach(el => el.classList.add('visited'));

    // Fill the text container that counts them
    counter.textContent = `${i + 1}`;
    document.getElementById('progress')?.style.setProperty('--progress', (i / 50) * 100);

    // Delay for drama
    await new Promise(resolve => setTimeout(resolve, 125));
  }
})();

document.addEventListener('DOMContentLoaded', async () => {
  const mapEl = document.getElementById('map');
  const mainEl = document.querySelector('main');
  const scrollDotEl = document.getElementById('scrolldot');

  if (mapEl) {
    document.addEventListener('mousemove', (event) => {
      mapEl.style.setProperty('--mouseX', `${(event.clientX / window.innerWidth) - 0.5}`);
      mapEl.style.setProperty('--mouseY', `${(event.clientY / window.innerHeight) - 0.5}`);
    });
  }

  if (mainEl) {
    window.focus();
    document.addEventListener('keyup', (event) => {
      if (event.key == 'ArrowLeft') {
        mainEl.scrollLeft = 0;
        event.preventDefault();
      } else if (event.key == 'ArrowRight') {
        mainEl.scrollLeft = window.innerWidth;
        event.preventDefault();
      }
    });

    mainEl.addEventListener('scroll', (event) => {
      const scroll = (mainEl.scrollLeft / window.innerWidth);
      scrollDotEl?.style.setProperty('left', `${2 * scroll}rem`);
    });
  }
});
