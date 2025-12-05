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
    await new Promise(resolve => setTimeout(resolve, 125));
  }
})();
