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
	} catch (error) {
		if (error.response.status == 404) {
			createErrorCard('No hay usuario con este nombre');
		}
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

				<div id="repos">
					<a href="#" class="repo">Repo 2</a>
					<a href="#" class="repo">Repo 1</a>
					<a href="#" class="repo">Repo 3</a>
				</div>
			</div>
		</div>
	`
	main.innerHTML = cardHTML;
}

form.addEventListener('submit', (e) => {
	e.preventDefault();

	const user = search.value;

	if (user) {
		getUser(user);

		search.value = '';
	}
})