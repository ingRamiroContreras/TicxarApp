(function (window) {
  window.env = window.env || {};

  // Environment variables
  window["env"]["api_url"] = "${API_URL}";
  window["env"]["api"] = "${API}";
  window["env"]["authorization"] = "${API_AUTH}";
})(this);
