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

  states.sort((a, b) => a.first - b.first);

  for (let i = 0; i < states.length; i++) {
    const state = states[i];
    console.log(state.abbr);
    counter.textContent = `${i + 1}`;
    document.querySelectorAll(`#map [id*="${state.abbr}"]`).forEach(el => el.classList.add('visited'));
    document.getElementById('progress')?.style.setProperty('--progress', (i / 50) * 100);
    await new Promise(resolve => setTimeout(resolve, 125));
  }
})();

document.addEventListener('mousemove', (event) => {
  document.getElementById('map')?.style.setProperty('--mouseX', `${(event.clientX / window.innerWidth) - 0.5}`);
  document.getElementById('map')?.style.setProperty('--mouseY', `${(event.clientY / window.innerHeight) - 0.5}`);
});
