const axios = require('axios').default;
const $ = require('cheerio');
const xlsExporter = require('./xlsExporter');

/* Obtener enlace directamente desde el original. Que solo haga falta copiarlo del navegador. */

const URL =
	'https://www.extenda.es/empresas/?razonsocial=&anagrama=&provincia=ES-SE&macrosector=-1&pagina=&municipio=-1&productos=#listado-empresas';

const getURL = page => {
	let pageString = `pagina=${page}`;
	let paginaFin = URL.replace(/pagina=\d{0,2}/, pageString);

	return paginaFin;
};

const getHTML = async URL => {
	return await axios.get(URL);
};

let emails = [];

const main = async () => {
	await getAllEmails();
	exportToXLS(emails);
	console.log({ emails, length: emails.length });
};

const getPageEmails = async URL => {
	let html = await getHTML(URL);
	debugger;
	let pageEmails = [];
	$('a', html.data).map((i, el) => {
		let text = $(el).text();
		if (text.includes('@')) {
			pageEmails.push(text);
		}
	});

	return pageEmails;
};

const getAllEmails = async () => {
	let page = 1;
	while (page != -2) {
		console.log('Comprobando página: ' + page);
		let pageEmail = await getPageEmails(getURL(page));
		if (pageEmail.length > 0) {
			pageEmail.forEach(element => {
				emails.push(element);
			});
			page++;
		} else {
			page = -2;
		}
	}
};

const exportToXLS = async emailList => {
	await xlsExporter(emailList);
};

main();
