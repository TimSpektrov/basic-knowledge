const cssPromises = {}

const BOOTSTRAP = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css';
const DETAILS = './film-details.js';
const LIST = './film-list.js';

const URL = 'https://www.swapi.tech/api/'
function loadResource(src) {
    // js module
    if(src.endsWith('.js')) {
        return import(src);
    }

    // css file
    if(src.endsWith('.css')) {
        if (cssPromises[src]) return
        const link = document.createElement('link')
        link.rel = 'stylesheet';
        link.href = src;
        cssPromises[src] = new Promise(resolve => {
            link.addEventListener('load', () => resolve());
        });
        document.head.append(link)
        return cssPromises
    }
    // Данные с сервера
    return fetch(src).then(res => res.json());
}

const appContainer = document.getElementById('app')
const searchParams = new URLSearchParams(location.search)
const episodeId = searchParams.get('episodeId')
function renderPage(moduleName, apiUrl, css) {
    Promise.all([moduleName, apiUrl, css, ].map(src => loadResource(src)))
        .then(async ([pageModule, data]) => {
            appContainer.innerHTML = '';
            appContainer.append(await pageModule.render(data.result));
        })
        .then(res => {
            const links = document.querySelectorAll('.btn')
            // const backBtn = document.querySelector('.btn-light')
            links.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault()
                    const btn = e.target.getAttribute('href');
                    history.pushState(null, '', btn);
                    console.log(history)
                    history.go(0);
                })
            })
        })
}

window.addEventListener('popstate', ()=> {
    newRender()
})


function newRender() {
    return (episodeId)
        ? renderPage(
            DETAILS,
            `${URL}films/${episodeId}/`,
            BOOTSTRAP,
        )
        : renderPage(
            LIST,
            `${URL}films/`,
            BOOTSTRAP,
        )
}

newRender()
