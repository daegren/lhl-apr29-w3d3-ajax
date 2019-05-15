const searchReddit = query => {
  const url = `https://www.reddit.com/r/aww/search.json?restrict_sr=true&sort=hot&type=link&q=${query}`;

  $.getJSON(url, (data, status) => {
    console.log(status);
    console.log(data);

    buildHtml(data);
  });
};

const buildHtml = data => {
  const $main = $("#content");
  $main.empty();

  data.data.children.forEach(item => {
    const html = buildEntry(item);

    $main.append(html);
  });
};

const buildEntry = data => {
  const html = `
    <div class="entry">
      <a href="http://www.reddit.com${data.data.permalink}">
        <img src="${data.data.thumbnail}" />
      </a>
    </div>
  `;

  return html;
};

// Document.ready
$(() => {
  $("header form").on("submit", event => {
    event.preventDefault();

    const term = $('input[type="text"]');
    const query = term.val();
    searchReddit(query);
  });
});
