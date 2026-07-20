// Modal open/close handling
document.querySelectorAll('[data-open-modal]').forEach(function (trigger) {
  trigger.addEventListener('click', function (e) {
    e.preventDefault();
    openModal(trigger.getAttribute('data-open-modal'));
  });
});

document.querySelectorAll('[data-switch-modal]').forEach(function (trigger) {
  trigger.addEventListener('click', function (e) {
    e.preventDefault();
    var current = trigger.closest('.modal-overlay');
    if (current) closeModal(current);
    openModal(trigger.getAttribute('data-switch-modal'));
  });
});

document.querySelectorAll('[data-close-modal]').forEach(function (btn) {
  btn.addEventListener('click', function () {
    closeModal(btn.closest('.modal-overlay'));
  });
});

document.querySelectorAll('.modal-overlay').forEach(function (overlay) {
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal(overlay);
  });
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.is-open').forEach(closeModal);
  }
});

function openModal(id) {
  var overlay = document.getElementById(id);
  if (!overlay) return;
  overlay.classList.add('is-open');
}

function closeModal(overlay) {
  if (!overlay) return;
  overlay.classList.remove('is-open');
  // reset each modal back to its form view when closed
  var form = overlay.querySelector('form');
  var success = overlay.querySelector('.modal-success');
  if (form) form.hidden = false;
  if (success) success.hidden = true;
}

// Demo login/signup forms — no backend, just a friendly inline message
document.querySelectorAll('[data-demo-form]').forEach(function (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var overlay = form.closest('.modal-overlay');
    var success = overlay ? overlay.querySelector('.modal-success') : null;
    form.hidden = true;
    if (success) success.hidden = false;
  });
});
