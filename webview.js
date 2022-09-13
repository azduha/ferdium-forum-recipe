const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const refresh_rate = 5 * 30; //Approx 5 minutes
var last_user_action = 0;

function reset() {
    last_user_action = 0;
}

module.exports = Ferdi => {
  document.addEventListener("click", reset, false);
  document.addEventListener("mousemove", reset, false);
  document.addEventListener("keypress", reset, false);
  document.addEventListener("scroll", reset, false);
  document.addEventListener("touchMove", reset, false);
  document.addEventListener("touchEnd", reset, false);

  const getMessages = () => {
    const count = document.querySelectorAll('.upozorneni');

    // set Ferdi badge
    Ferdi.setBadge(count.length);

    last_user_action++;
    if (last_user_action >= refresh_rate && document.readyState == "complete") {
      window.location.reload();
      reset();
    }
  };

  Ferdi.loop(getMessages);

  Ferdi.injectCSS(_path.default.join(__dirname, 'style.css'));
};
