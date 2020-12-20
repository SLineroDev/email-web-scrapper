const ExcelJS = require('exceljs');

const filename = 'Lista_correos.xlsx';

const exportToXLS = async (emailList, file = filename) => {
	const workbook = createAndFillWorkbook(emailList);

	await workbook.xlsx.writeFile(file);
};

const createAndFillWorkbook = emailList => {
	const workbook = new ExcelJS.Workbook();
	workbook.creator = 'Sergio Linero';
	workbook.lastModifiedBy = 'Sergio linero';
	workbook.created = new Date();
	workbook.modified = new Date();

	const sheet = workbook.addWorksheet('Email List');

	emailList.forEach((element, index) => {
		sheet.getCell(index, 1).value = element;
	});

	return workbook;
};

module.exports = exportToXLS;
