// Search and filters for the library page. Mirrors the app's rules:
// every search word must appear; filters match exactly.
(function () {
  var form = document.getElementById("library-search");
  var cards = Array.prototype.slice.call(document.querySelectorAll("#grid .card"));
  var empty = document.getElementById("empty");
  var info = document.getElementById("active-filters");
  var fields = ["q", "topic", "book", "audience", "genre"];

  function values() {
    var v = {};
    fields.forEach(function (k) { v[k] = (form.elements[k].value || "").trim(); });
    return v;
  }

  function apply(push) {
    var v = values();
    var terms = v.q.toLowerCase().split(/\s+/).filter(Boolean);
    var shown = 0;
    cards.forEach(function (c) {
      var ok =
        (!v.topic || c.dataset.topics.split("|").indexOf(v.topic.toLowerCase()) >= 0) &&
        (!v.book || c.dataset.books.split("|").indexOf(v.book) >= 0) &&
        (!v.audience || c.dataset.audience === v.audience.toLowerCase()) &&
        (!v.genre || c.dataset.genre === v.genre) &&
        terms.every(function (t) { return c.dataset.text.indexOf(t) >= 0; });
      c.hidden = !ok;
      if (ok) shown++;
    });
    var filtering = fields.some(function (k) { return v[k]; });
    empty.hidden = shown > 0;
    info.hidden = !filtering;
    if (filtering) {
      info.innerHTML = "Showing " + shown + " " + (shown === 1 ? "resource" : "resources") + '. <a href="/" id="clear">Clear search and filters</a>';
    }
    if (push) {
      var params = new URLSearchParams();
      fields.forEach(function (k) { if (v[k]) params.set(k, v[k]); });
      var qs = params.toString();
      history.replaceState(null, "", qs ? "?" + qs : location.pathname);
    }
  }

  var start = new URLSearchParams(location.search);
  fields.forEach(function (k) {
    var val = start.get(k);
    if (!val) return;
    var el = form.elements[k];
    if (el.tagName === "SELECT" && !Array.prototype.some.call(el.options, function (o) { return o.value === val; })) {
      var o = document.createElement("option"); o.value = val; o.textContent = val; el.appendChild(o);
    }
    el.value = val;
  });
  apply(false);

  form.addEventListener("submit", function (e) { e.preventDefault(); apply(true); });
  Array.prototype.forEach.call(form.querySelectorAll("select"), function (s) {
    s.addEventListener("change", function () { apply(true); });
  });
})();
