// "Make it your own" on the static site: package the new version as a Markdown
// file with frontmatter the library agent can read (parent, church, reflection).
(function () {
  var form = document.getElementById("contextualize");
  function yamlStr(s) { return JSON.stringify(String(s || "")); }
  function slug(s) { return String(s || "version").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "version"; }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var f = form.elements;
    if (!f.body.value.trim()) { alert("Your version needs some words in it."); return; }
    var fm = [
      "---",
      "kind: contextualized",
      "parent_id: " + yamlStr(form.dataset.parent),
      "parent_title: " + yamlStr(form.dataset.parentTitle),
      "parent_church: " + yamlStr(form.dataset.parentChurch),
      "title: " + yamlStr(f.title.value),
      "church: " + yamlStr(f.church.value),
      "audience: " + yamlStr(f.audience.value),
      "share: " + (f.share.checked ? "true" : "false"),
      "reflection:",
      "  room: " + yamlStr(f.room.value),
      "  context: " + yamlStr(f.context.value),
      "  changes: " + yamlStr(f.changes.value),
      "submitted_at: " + yamlStr(new Date().toISOString()),
      "---",
      ""
    ].join("\n");
    var blob = new Blob([fm + f.body.value.replace(/\r\n/g, "\n") + "\n"], { type: "text/markdown" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = slug(f.title.value) + ".md";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  });
})();
