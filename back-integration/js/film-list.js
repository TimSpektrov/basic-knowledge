export function render(data) {
    const container = document.createElement('div');
    container.classList.add('container', 'd-flex', 'justify-content-between', 'flex-wrap', 'py-4');

    for (const film of data) {
        const filmCard = document.createElement('div');
        const poster = document.createElement('div');
        const image = document.createElement('img');
        const cardBody = document.createElement('div');
        const episode = document.createElement('h2');
        const title = document.createElement('h5');
        const detailsBtn = document.createElement('a');

        filmCard.style.width = '350px';
        filmCard.classList.add('card', 'm-2');
        poster.classList.add('position-relative');
        poster.style.height = '230px';
        image.classList.add('card-img-top');
        cardBody.classList.add('card-body', 'text-center');
        episode.classList.add('card-title', 'position-absolute', 'bottom-0', 'start-50', 'translate-middle-x', 'text-info');
        title.classList.add('card-title');
        detailsBtn.classList.add('btn', 'btn-primary');

        filmCard.append(poster, cardBody);
        poster.append(image, episode);
        cardBody.append(title, detailsBtn);

        image.src = './assets/images/bg2.jpg';
        image.alt = `Star wars. Episode ${film.properties.episode_id}. ${film.properties.title}`;
        episode.textContent = `Episode ${film.properties.episode_id}`;
        title.textContent = `${film.properties.title}`;
        detailsBtn.textContent = 'Подробнее';
        detailsBtn.href = `?episodeId=${film.uid}`;

        container.append(filmCard);
    }
    return container;
}
