console.log('Client side js loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');

messageOne.textContent = '';
messageTwo.textContent = '';

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const location = search.value;
	
	messageOne.textContent = 'Carregando dados meteorológicos';
	messageTwo.textContent = '';

	fetch('http://localhost:3000/weather?address=' + location).then(
		(response) => {
			response.json().then((data) => {
				if (data.error) {
					messageOne.textContent = data.error;

					return console.log(data.error);
				}
				messageOne.textContent = data.location;
				messageTwo.textContent = data.forecast;
				console.log(data.location, data.forecast);
			});
		}
	);
});
