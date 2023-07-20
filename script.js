const currencySelect = document.querySelector('.currency-select');
const mainInfo = document.querySelector('.main-info');
const firstDate = document.querySelector('.first-date');
const secondDate = document.querySelector('.second-date');
const valutes = [];
let data;

const getCurrency = async () => {
  const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
  data = await response.json();

  for (const [key, value] of Object.entries(data.Valute))
    valutes.push({ key: key, value: value, ID: key });

  for (let i = 0; i < valutes.length; i++) {
    const currentOption = document.createElement('option');
    currentOption.value += valutes[i].value.ID;
    currentOption.append(`${valutes[i].value.ID} - ${valutes[i].value.Name}`);
    currencySelect.appendChild(currentOption);
  }
};

currencySelect.addEventListener('change', () => {
  const selected = currencySelect.selectedOptions[0].value;
  for (let i = 0; i < valutes.length; i++) {
    if (valutes[i].value.ID == selected) {
      mainInfo.innerHTML = '';
      mainInfo.append(
        `${valutes[i].value.ID} - ${valutes[i].value.Name} (${valutes[i].key})`
      );
      firstDate.innerHTML = '';
      firstDate.innerHTML = `${new Date(
        data.Date
      ).toLocaleDateString()}, ${new Date(data.Date).toLocaleTimeString()} - ${
        valutes[i].value.Value
      }`;
      secondDate.innerHTML = '';
      secondDate.innerHTML = `${new Date(
        data.PreviousDate
      ).toLocaleDateString()}, ${new Date(
        data.PreviousDate
      ).toLocaleTimeString()} - ${valutes[i].value.Previous}`;
    }
  }
});

getCurrency();
