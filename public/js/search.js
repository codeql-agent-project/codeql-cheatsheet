// Ref: https://aaronluna.dev/blog/add-search-to-static-site-lunrjs-hugo-vanillajs/

let pagesIndex, searchIndex;

async function initSearchIndex() {
    try {
        const response = fetch("/index.json");
        pagesIndex = await (await response).json();
        searchIndex = lunr(function () {
            this.ref("url");
            this.field('id', {
                boost: 20
            })
            this.field('name', {
                boost: 20
            })
            this.field('description', {
                boost: 10
            })
            this.field('language', {
                boost: 5
            })
            this.field('code', {
                boost: 5
            })
            this.field('complexity', {
                boost: 5
            })
            pagesIndex.forEach((page) => this.add(page));
        })
    } catch (e) {
        console.log("[search.js]", e);
    }
}

initSearchIndex();

document.addEventListener("DOMContentLoaded", function () {
    if (document.querySelector(".search-form") != null) {
        const searchInput = document.querySelector(".search-input");
        searchInput.addEventListener("keydown", (event) => {
            if (event.keyCode == 13) handleSearchQuery(event)
        });
    }
})

function handleSearchQuery(event) {
    event.preventDefault();
    const query = document.querySelector(".search-input")[0].value.trim().toLowerCase();

    if (query.length < 3) {
        displayErrorMessage("Please enter a search term at least 3 characters!");
        return;
    }

    const results = searchSite(query)
    if (!results.length) {
        displayErrorMessage("Your search returned no results")
        return
    }
}

function displayErrorMessage(message) {
    document.querySelector(".search-error-message").innerHTML = message;
    document.querySelector(".search-container").classList.remove("focused");
    document.querySelector(".search-error").classList.remove("hide-element");
    document.querySelector(".search-error").classList.add("fade");
}

function searchSite(query) {
    const originalQuery = query;
    query = getLunrSearchQuery(query);
    let results = getSearchResults(query);
    return results.length ? results
        : query !== originalQuery ? getSearchResults(originalQuery) : [];
}

function getSearchResults(query) {
    return searchIndex.search(query).flatMap((hit) => {
        if (hit.ref == "undefined") return [];
        let pageMatch = pagesIndex.filter((page) => page.url === hit.ref)[0];
        pageMatch.score = hit.score;
        return [pageMatch];
    })
}

function getLunrSearchQuery(query) {
    const searchTerms = query.split(" ");
    if (searchTerms.length === 1) {
        return query;
    }
    query = "";
    for (const term of searchTerms) {
        query += `+${term} `;
    }

    return query.trim();
}