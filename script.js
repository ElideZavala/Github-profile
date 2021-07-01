const APIURL = 'https://api.github.com/users/';

const form = document.getElementById('form');
const main = document.getElementById('main')
const search = document.getElementById('search');

async function getUser(username) {
	try {
		const {
			data
		} = await axios(APIURL + username);

		createUserCard(data);
		getRepos(username)
	} catch (error) {
		if (error.response.status == 404) {
			createErrorCard('No hay usuario con este nombre');
		}
	}
}

async function getRepos(username) {
	try {
		const {
			data
		} = await axios(APIURL + username + '/repos?sort=created'); // ==> Ordenar los repositorios

		addReposToCard(data);

	} catch (error) {
		createErrorCard('Problemas a recuperar repositorio');
	}
}

function createUserCard({
	name,
	bio,
	avatar_url,
	followers,
	following,
	public_repos
}) {
	const cardHTML = `
		<div class="card">
			<div>
				<img src="${avatar_url}" alt="" class="avatar">
			</div>
			<div class="user-info">
				<h2>${name}</h2>
				<p>${bio}</p>

				<ul>
					<li>${followers } <strong> Seguidores</strong></li>
					<li>${following } <strong> Seguiendo</strong></li>
					<li>${public_repos } <strong> Repsitorios</strong></li>
				</ul>

				<div id="repos"></div>
			</div>
		</div>
	`
	main.innerHTML = cardHTML;
}

function createErrorCard(message) {
	const cardHTML = `
		<div class="card">
			<h1>${message}</h1>
		</div>
	`
	main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
	const reposEl = document.getElementById('repos');

	repos
		.slice(0, 10) // ==> Cortamos el arreglo en solo 10 elementos
		.forEach(repo => {
			const repoEL = document.createElement('a');
			repoEL.classList.add('repo');
			repoEL.href = repo.html_url;
			repoEL.target = '_blanck';
			repoEL.innerText = repo.name;

			reposEl.appendChild(repoEL);
		});
}

form.addEventListener('submit', (e) => {
	e.preventDefault();

	const user = search.value;

	if (user) {
		getUser(user);

		search.value = '';
	}
})