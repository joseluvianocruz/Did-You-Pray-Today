document.addEventListener("DOMContentLoaded", () => {
  // Update Time
  function updateTime() {
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    const timeStr = `${hours}:${minutes}`;
    document.getElementById('timeDisplay').textContent = timeStr;

    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    document.getElementById('dateDisplay').textContent = now.toLocaleDateString(undefined, options);
  }

  setInterval(updateTime, 1000);
  updateTime();

  // Verses Data now comes from verses.js file
  // Initial pick a verse based on the day of the year so it changes daily

  // Pick a verse based on the day of the year so it changes daily
  const getDayOfYear = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  };

  const dayOfYear = getDayOfYear();
  const verseIndex = dayOfYear % verses.length;
  const todayVerse = verses[verseIndex];

  // Meaning Dropdown Toggle
  const meaningBtn = document.getElementById('meaningBtn');
  const meaningContent = document.getElementById('meaningContent');

  const setVerse = (verse) => {
    document.getElementById('verseReference').textContent = verse.reference;
    document.getElementById('verseText').textContent = verse.text;
    document.getElementById('verseMeaning').textContent = verse.meaning;

    // Close meaning dropdown if it was open
    if (meaningBtn && meaningBtn.classList.contains('active')) {
      meaningBtn.classList.remove('active');
      meaningContent.classList.remove('active');
    }
  };

  setVerse(todayVerse);

  meaningBtn.addEventListener('click', () => {
    meaningBtn.classList.toggle('active');
    meaningContent.classList.toggle('active');
  });

  // Shuffle Button Toggle
  const shuffleBtn = document.getElementById('shuffleBtn');
  shuffleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const randomIndex = Math.floor(Math.random() * verses.length);
    setVerse(verses[randomIndex]);
  });
});
