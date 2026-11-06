// joel.brenstrum.com — the only javascript on this page that isn't someone else's.
// everything here is optional. the list works without it.
(function () {
  var all = document.querySelectorAll('details');

  // expand / collapse all
  var controls = document.querySelector('[data-js-only]');
  if (controls) {
    controls.hidden = false;
    controls.addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-all]');
      if (!btn) return;
      var open = btn.getAttribute('data-all') === 'open';
      all.forEach(function (d) { d.open = open; });
    });
  }

  // the ux designer button. it does what it looks like it does: nothing useful.
  var ux = document.querySelector('.ux-btn');
  if (ux) {
    var tilt = -1.6;
    ux.addEventListener('click', function () {
      tilt -= 1.2;
      ux.style.transform = 'rotate(' + tilt + 'deg) translateY(3px)';
      if (tilt < -12) { ux.title = 'please stop. it only gets worse.'; }
    });
  }

  if (window.console && console.log) {
    console.log('%cyou found the console. we should be mates.', 'font: 700 14px monospace; color: #ff4d12');
  }
})();
