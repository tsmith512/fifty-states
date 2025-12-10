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
    console.log(state)
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

document.addEventListener('mousemove', (event) => {
  document.getElementById('map')?.style.setProperty('--mouseX', `${(event.clientX / window.innerWidth) - 0.5}`);
  document.getElementById('map')?.style.setProperty('--mouseY', `${(event.clientY / window.innerHeight) - 0.5}`);
});
