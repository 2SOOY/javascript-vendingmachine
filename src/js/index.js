import App from './components/App.js';
import { $ } from './utils/index.js';

document.addEventListener('DOMContentLoaded', () => {
  const app = new App($('#app'));

  app.run();
});

// const init = () => {
//   const vendingMachine = new VendingMachine();

//   vendingMachine.input(0);
// };

// init();
