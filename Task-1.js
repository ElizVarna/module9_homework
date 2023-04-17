/* Задание 1 */
// Создание экземпляра класса DOMParser. Он позволит нам парсить XML
const parser = new DOMParser();
// XML, который мы будем парсить
const xmlString = `<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list> 
`;

// Парсинг XML
const xmlDOM = parser.parseFromString(xmlString, "text/xml");
// Получение всех DOM-нод
const listNodes = xmlDOM.querySelector("list");
const studentsNodes = listNodes.querySelectorAll("student");
const result = {list: []};

studentsNodes.forEach((element) => {
  const student = new Object();
  const studentFirstName = element.querySelector("first");
	const studentSecondName = element.querySelector("second");
	const studentAge = element.querySelector("age");
	const studentProf = element.querySelector("prof");
	const nameNode = element.querySelector("name");
  const langAttr = nameNode.getAttribute('lang');
  student.name = studentFirstName.textContent+ ' ' +studentSecondName.textContent; 
	student.age = studentAge.textContent;
	student.prof = studentProf.textContent;
	student.lang = langAttr;

	result.list.push(student);
});

console.log(result);