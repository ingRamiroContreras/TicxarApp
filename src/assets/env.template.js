(function (window) {
  window.env = window.env || {};

  // Environment variables
  window["env"]["api_url"] = "${API_URL}";
  window["env"]["authorization"] = "${API_AUTH}";
})(this);
