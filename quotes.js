const quotes = [
    "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle. 💪",
    "The harder you work for something, the greater you’ll feel when you achieve it. Keep going! 🌟",
    "Success is the sum of small efforts, repeated day in and day out. You’ve got this! 🌻",
    "Don’t stop when you’re tired, stop when you’re done. You are stronger than you think! 💥",
    "Every day is a new opportunity to grow, learn, and be closer to your goals. Let’s go! 🚀",
    "Your only limit is your mind. Keep pushing forward! 💖",
    "Small progress is still progress. Keep moving forward, one step at a time. 🌈",
    "Believe you can and you’re halfway there. Stay focused and stay strong! ✨"
  ];
  
  function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }
  
  document.getElementById('quote').innerText = getRandomQuote();
  