
const menu = document.querySelector('.menu');
const nav = document.querySelector('.navlinks');

if (menu && nav) {
  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');

    menu.setAttribute(
      'aria-expanded',
      String(open)
    );
  });
}

const advance = document.getElementById('advance');

if (advance) {

  let stage = 0;

  const task = document.getElementById('task');
  const escrow = document.getElementById('escrow');
  const paid = document.getElementById('paid');
  const message = document.getElementById('message');

  const steps = [
    ...document.querySelectorAll('#progress li')
  ];

  const labels = [
    'Create task',
    'Submit result',
    'Approve task',
    'Withdraw payment',
    'Restart simulation'
  ];

  const messages = [
    'Create a task with 0.01 simulated ETH.',

    'Task created. 0.01 simulated ETH locked in escrow.',

    'Atlas submitted a simulated result reference.',

    'Genesis approved the result. Payment is allocated to Atlas.',

    'Settlement complete. Atlas received 0.01 simulated ETH.'
  ];

  function render() {

    advance.textContent = labels[stage];

    message.textContent = messages[stage];

    escrow.textContent =
      stage > 0 && stage < 4
        ? '0.01 ETH'
        : '0.00 ETH';

    paid.textContent =
      stage === 4
        ? '0.01 ETH'
        : '0.00 ETH';

    task.disabled = stage !== 0;

    steps.forEach((el, i) => {

      el.classList.toggle(
        'done',
        i < stage
      );

      el.classList.toggle(
        'active',
        i === stage
      );

    });

  }

  advance.addEventListener('click', () => {

    if (stage === 0 && !task.value.trim()) {

      message.textContent =
        'Enter a task description first.';

      task.focus();

      return;

    }

    stage = stage === 4
      ? 0
      : stage + 1;

    render();

  });

  document
    .getElementById('reset')
    .addEventListener('click', () => {

      stage = 0;

      render();

    });

  render();

}
