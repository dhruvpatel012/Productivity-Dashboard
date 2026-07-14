// ------- Motivation Quote -------

// Global reference so navigation.js can refresh quote upon section change
let loadQuote;

document.addEventListener('DOMContentLoaded', () => {
  const fallbackQuotes = [
    { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { quote: "It always seems impossible until it's done.", author: "Nelson Mandela" },
    { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { quote: "The future depends on what you do today.", author: "Mahatma Gandhi" },
    { quote: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
    { quote: "Act as if what you do makes a difference. It does.", author: "William James" },
    { quote: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein" },
    { quote: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
    { quote: "Dream big and dare to fail.", author: "Norman Vaughan" }
  ];

  const quoteText = document.getElementById('quote-text');
  const quoteAuthor = document.getElementById('quote-author');
  const quoteSummary = document.getElementById('quote-card-summary');
  const newQuoteBtn = document.getElementById('new-quote-btn');
  const quoteContainer = document.querySelector('.quote-container-box');

  loadQuote = function() {
    if (!quoteText || !quoteAuthor) return;

    // Loading state
    if (newQuoteBtn) newQuoteBtn.disabled = true;
    if (quoteContainer) quoteContainer.classList.add('quote-loading');
    quoteText.textContent = "Fetching custom quote...";
    quoteAuthor.textContent = "Connecting to API";

    fetch('https://dummyjson.com/quotes/random')
      .then(response => {
        if (!response.ok) throw new Error('Quote API request failed');
        return response.json();
      })
      .then(data => {
        quoteText.textContent = data.quote;
        quoteAuthor.textContent = `— ${data.author}`;
        
        if (quoteSummary) {
          quoteSummary.textContent = `"${data.quote.substring(0, 30)}..." — ${data.author}`;
        }
      })
      .catch(error => {
        console.warn("Quote API failed. Loading fallback offline database.", error);
        
        const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
        const fallback = fallbackQuotes[randomIndex];

        quoteText.textContent = fallback.quote;
        quoteAuthor.textContent = `— ${fallback.author} (offline)`;

        if (quoteSummary) {
          quoteSummary.textContent = `"${fallback.quote.substring(0, 30)}..." — ${fallback.author}`;
        }
      })
      .finally(() => {
        if (newQuoteBtn) newQuoteBtn.disabled = false;
        if (quoteContainer) quoteContainer.classList.remove('quote-loading');
      });
  };

  // Bind Listeners
  if (newQuoteBtn) {
    newQuoteBtn.addEventListener('click', loadQuote);
  }

  // Load first quote
  loadQuote();
});
