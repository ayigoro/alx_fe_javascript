document.addEventListener('DOMContentLoaded', function(){
  localStorage.getItem("quotes", JSON.parse(quotes))
  const quotes = [
  { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Strive not to be a success, but rather to be of value.", category: "Motivation" },
  { text: "Get busy living or get busy dying.", category: "Life" },
  { text: "The mind is everything. What you think you become.", category: "Wisdom" }
]
 
newQuote.addEventListener('click',showRandomQuote)

function showRandomQuote (){
const newQuote = document.getElementById('newQuote')
const quoteDisplay = document.getElementById('quoteDisplay')
const randomIndex = Math.floor(Math.random() * quotes.length)
const randomQuote = quotes[randomIndex]
if (quoteDisplay){
   quoteDisplay.innerHTML = `<p>Quote: "${randomQuote.text}"</p><em> Category: ${randomQuote.category}</em>`;
   sessionStorage.setItem("lastViewedQuote", JSON.stringify(randomQuote));
}
}
function createAddQuoteForm(){
      const newQuoteText = document.getElementById('newQuoteText')
      const newQuoteCategory = document.getElementById('newQuoteCategory')
      if (newQuoteText && newQuoteCategory){
        const newQuote = {
          text:newQuoteText,
          category:newQuoteCategory
        }
        quotes.push(newQuote)
        localStorage.setItem("quotes", JSON.stringify(quotes));
        newQuoteText.value = ''
        newQuoteCategory.value = ''
        alert('New quote added successfully')

      }
      else{
        console.error('Both text and category are required to add a quote')
      }
    }

    function exportQuoteAsJSON (){
      const jsonData = JSON.stringify(quotes,null,2)
      const blob = new Blob ([jsonData],{type:"application/json"})
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a");
      a.href = url;
      a.download = "quotes.json"
      a.click(); 
      URL.revokeObjectURL(url)

    }

    function addQuote (){
      createAddQuoteForm()
    }
    addQuote()

    function importFromJsonFile(event) {
      const fileReader = new FileReader();
      fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      alert('Quotes imported successfully!');
    };
      fileReader.readAsText(event.target.files[0]);
  }
})
// ["createElement", "appendChild"]