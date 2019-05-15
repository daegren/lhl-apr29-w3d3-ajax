/**
 * Search reddit's /r/aww subreddit for photos which match the query.
 * @param {String} query
 */
const searchReddit = query => {
  const url = `https://www.reddit.com/r/aww/search.json?restrict_sr=true&sort=hot&type=link&q=${query}`;

  $.getJSON(url, (data, status) => {
    console.log(status);
    console.log(data);

    buildHtml(data);
  });
};

/**
 * Loops through the response data from reddit and creates HTML to append onto the page
 * @param {Object} data - The full response JSON from reddit.
 */
const buildHtml = data => {
  const $main = $("#content");
  $main.empty();

  data.data.children.forEach(item => {
    const html = buildEntry(item);

    $main.append(html);
  });
};

/**
 * Creates an individual HTML element for each item in the response from reddit.
 * @param {Object} data - The individual objects which represent a post on reddit.
 */
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
  // Attaching a event handler to the "submit" event from our form
  $("header form").on("submit", event => {
    // Prevent the default action of the form (this prevents the page from refreshing)
    event.preventDefault();

    // Get a handle on the input which has the term which the user entered
    const term = $('input[type="text"]');
    // Read the value out of the text box
    const query = term.val();
    // Call our helper function to actually make the request to reddit
    searchReddit(query);
  });
});
