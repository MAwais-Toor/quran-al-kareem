const surahListContainer = document.getElementById("surah-list");
const searchInput = document.getElementById("searchInput");

let allSurahs = [];

// Fetch all surahs from Quran API
fetch("https://api.alquran.cloud/v1/surah")
  .then(res => res.json())
  .then(data => {
    allSurahs = data.data;
    renderSurahList(allSurahs);
  });

// Render Surahs to DOM
function renderSurahList(surahs) {
  surahListContainer.innerHTML = "";

  surahs.forEach(surah => {
    const div = document.createElement("div");
    div.innerHTML = `
      <a href="surah.html?id=${surah.number}" class="block p-5 bg-white rounded-xl shadow border hover:bg-emerald-50 transition-all duration-200">
        <div class="flex justify-between items-center">
          <span class="font-semibold text-lg text-emerald-700">${surah.englishName}</span>
          <span class="text-xl font-arabic text-gray-700">${surah.name}</span>
        </div>
        <div class="text-sm text-gray-400 mt-1">Verses: ${surah.numberOfAyahs} | ${surah.revelationType}</div>
      </a>
    `;
    surahListContainer.appendChild(div);
  });
}

// Search filter
searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.toLowerCase();
  const filtered = allSurahs.filter(surah =>
    surah.englishName.toLowerCase().includes(keyword) ||
    surah.name.toLowerCase().includes(keyword)
  );
  renderSurahList(filtered);
});
