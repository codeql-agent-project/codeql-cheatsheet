// Ref: https://aaronluna.dev/blog/add-search-to-static-site-lunrjs-hugo-vanillajs/

let pagesIndex, searchIndex;

async function initSearchIndex() {
    try {
        pagesIndex = await (await fetch("/codeql-cheatsheet/index.json")).json();
        searchIndex = lunr(function () {
            this.ref("id");
            this.field('name', {
                boost: 30
            })
            this.field('language', {
                boost: 40
            })
            this.field('description', {
                boost: 20
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
        console.log("[search.js] error", e);
    }
}

initSearchIndex();

document.addEventListener("DOMContentLoaded", function () {
    if (document.querySelector(".search-form") != null) {
        const searchInput = document.querySelector(".search-input");
        searchInput.addEventListener("keydown", (event) => {
            if (event.keyCode == 13) handleSearchQuery(event)
        });

        document.querySelector(".search-submit-button")
            .addEventListener("click", (event) => handleSearchQuery(event))
    }
})

function handleSearchQuery(event) {
    // console.log('handleSearchQuery called');
    event.preventDefault();
    const query = document.querySelectorAll(".search-input")[0].value.trim().toLowerCase();

    if (query.length < 3) {
        displayErrorMessage("Please enter a search term at least 3 characters!");
        return;
    }
    hideErrorMessage();

    const results = searchSite(query)
    // console.log("handleSearchQuery(event) results", results);
    if (!results.length) {
        displayErrorMessage("Your search returned no results")
        return
    } else {
        let searchResultPlacementDOM = document.querySelector('.search-results-list-item');
        let generatedDOM = ``;
        results.forEach((result) => {
            console.log("handleSearchQuery(event) loop each result", result);

            let newListItemDOM = `
            <div class="queries-list-item" onclick='window.location.href="/codeql-cheatsheet/${result.language}/${result.id}"'>
                <div class="preview-first-col">
                    <p class="preview-complexity">[${result.complexity.toUpperCase()}]</p>
                    <p class="preview-complexity">[${result.language.toUpperCase()}]</p>
                </div>
                <a class="preview-title" href="/codeql-cheatsheet/${result.language}/${result.id}">${result.name}</a>
                <p class="preview-description">${result.description}</p>
                <a href="/codeql-cheatsheet/${result.language}/${result.id}">
                    <img class="preview-arrow-icons" src="/codeql-cheatsheet/right-arrow.svg">
                </a>
            </div>
            `;
            generatedDOM += newListItemDOM;
        })
        searchResultPlacementDOM.innerHTML = generatedDOM;
    }

    const searchResultsBriefDOM = document.querySelector('.search-query-right');
    searchResultsBriefDOM.innerHTML = `${event.target.value} (${results.length} queries found)`;
    event.target.value = '';
}

function displayErrorMessage(message) {
    // console.log("displayErrorMessage message", message);

    // console.log("displayErrorMessage document.querySelector('.search-error-message')", document.querySelector('.search-error-message'));
    // console.log("displayErrorMessage document.querySelector('.search-container')", document.querySelector('.search-container'));
    // console.log("displayErrorMessage document.querySelector('.search-error').classList", document.querySelector('.search-error').classList);
    // console.log("displayErrorMessage  document.querySelector('.search-error').classList", document.querySelector('.search-error').classList);

    document.querySelector('.search-error-message').innerHTML = message;
    document.querySelector('.search-container').classList.remove('focused');
    document.querySelector('.search-error').classList.remove('hide-element');
    // document.querySelector('.search-error').classList.add('fade');
}

function hideErrorMessage() {
    document.querySelector('.search-error-message').innerHTML = '';
    document.querySelector('.search-error').classList.add('hide-element');
    console.log("document.querySelector('#search-header')", document.querySelector('#search-header'));
    document.querySelector('#search-header').classList.remove('hide-element');
    document.querySelector(".search-query-left").classList.remove("hide-element");
}

function searchSite(query) {
    const originalQuery = query;
    query = getLunrSearchQuery(query);
    let results = getSearchResults(query);
    return results.length ? results
        : query !== originalQuery ? getSearchResults(originalQuery) : [];
}

function getSearchResults(query) {
    // console.log("getSearchResults(query) query", query);
    // console.log("getSearchResults(query) searchIndex", searchIndex);
    // console.log("getSearchResults(query) pagesIndex", pagesIndex);
    return searchIndex.search(query).flatMap((hit) => {
        if (hit.ref == "undefined") return [];
        console.log("getSearchResults(query) hit", hit);
        let pageMatch = pagesIndex.filter((page) => page.id === hit.ref)[0];
        console.log("getSearchResults(query) pageMatch", pageMatch);
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