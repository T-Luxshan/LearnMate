import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://getbooksinfo.p.rapidapi.com/',
  headers: {
    'x-rapidapi-key': 'e07112fef8mshe887997e1436221p17f995jsn7d163e88f209',
    'x-rapidapi-host': 'getbooksinfo.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}