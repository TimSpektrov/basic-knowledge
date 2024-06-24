export async function render(data) {
    const titleArr = ['planets', 'species', 'characters', 'starships', 'vehicles'];
    const dataList = await Promise.all(titleArr.map(item => Promise.all(data.properties[item]
        .map(url => fetch(url).then(res => res.json())))));

    const dataResultList = dataList.map((list, i) => {
        return { title: titleArr[i], list: list.map(item => item.result.properties.name) };
    });
    return createPage(data, dataResultList);
}

function createList(dataList, title) {
    const listWrap = document.createElement('section');
    const listTitle = document.createElement('h2');
    listTitle.textContent = title;
    const list = document.createElement('ul');

    dataList.forEach(elData => {
        const item = document.createElement('li');
        item.classList.add('lead');
        item.textContent = elData;
        list.append(item);
    });
    listWrap.append(listTitle, list);
    return listWrap;
}

function createPage(data, dataResultList) {
    const container = document.createElement('div');
    container.classList.add('container', 'p-4');

    const backBtn = document.createElement('a');
    backBtn.classList.add('btn', 'btn-light');
    backBtn.textContent = 'Back to episodes';
    backBtn.href = 'index.html';

    const title = document.createElement('h1');
    title.classList.add('h1');
    title.textContent = `Episode ${data.properties.episode_id}`;

    const description = document.createElement('p');
    description.classList.add('lead');
    description.textContent = `Episode ${data.properties.description}`;

    container.append(backBtn, title, description);

    for(const list of dataResultList) {
        container.append(createList(list.list, list.title));
    }
    return container;
}
