let display = document.getElementById("display");
let historyList = document.getElementById("history-list");
let history = [];
function appendValue(value) {
  display.value += value;
}
function clearDisplay() {
  display.value = "";
}
function deleteChar() {
  display.value = display.value.slice(0, -1);
}
function calculateResult() {
  try {
    const expression = display.value;
    if (!/^[0-9+\-*/.%() ]+$/.test(expression)) {
      display.value = "Invalid Input";
      return;
    }
    const result = eval(expression);
    display.value = result;
    addToHistory(expression, result);
  } catch {
    display.value = "Error";
  }
}
function addToHistory(expression, result) {
  let entry = { expression, result };
  history.push(entry);
  renderHistory();
}
function renderHistory() {
  historyList.innerHTML = "";
  history.forEach((item, index) => {
    let li = document.createElement("li");
    li.innerHTML = `${item.expression} = ${item.result}
      <button class="delete-history" onclick="deleteHistory(${index})">X</button>`;
    historyList.appendChild(li);
  });
}
function deleteHistory(index) {
  history.splice(index, 1);
  renderHistory();
}
function clearHistory() {
  history = [];
  renderHistory();
}
function toggleHistory() {
  const overlay = document.getElementById("history-overlay");
  overlay.classList.toggle("active");
}
document.addEventListener("keydown", (e) => {
  if (/[0-9+\-*/.%()]/.test(e.key)) {
    appendValue(e.key);
  } else if (e.key === "Enter") {
    calculateResult();
  } else if (e.key === "Backspace") {
    deleteChar();
  } else if (e.key.toLowerCase() === "c") {
    clearDisplay();
  }
});
