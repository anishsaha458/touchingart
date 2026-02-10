const moodMap = {
  calm: "water lilies serene landscape blue",
  energetic: "abstract movement vibrant red",
  dark: "night noir shadow mystery",
  warm: "sunset golden autumn yellow",
  romantic: "portrait flowers soft impressionism"
};

async function loadMood(mood) {
  const displayArea = document.getElementById("artwork");
  displayArea.innerHTML = `<div class="loading">Curating ${mood} masterpieces...</div>`;

  try {
    const query = moodMap[mood];
    const randomPage = Math.floor(Math.random() * 5) + 1;
    // Using the search endpoint for moods
    const url = `https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(query)}&fields=id,title,artist_title,image_id,date_display&limit=6&page=${randomPage}`;
    
    const res = await fetch(url);
    const data = await res.json();
    const validArt = (data.data || []).filter(a => a.image_id);

    displayArea.innerHTML = validArt.map(art => renderArtCard(art)).join('');
  } catch (err) {
    displayArea.innerHTML = `<p class="placeholder">Error loading gallery.</p>`;
  }
}

async function loadSurprise() {
  const displayArea = document.getElementById("artwork");
  displayArea.innerHTML = `<div class="loading">Finding something unexpected...</div>`;
  
  try {
    const randomPage = Math.floor(Math.random() * 1000) + 1;
    // Using the artworks endpoint for random global discovery
    const url = `https://api.artic.edu/api/v1/artworks?fields=id,title,artist_title,image_id,date_display&limit=1&page=${randomPage}`;
    const res = await fetch(url);
    const data = await res.json();
    const art = data.data[0];

    if (!art || !art.image_id) return loadSurprise();
    displayArea.innerHTML = renderArtCard(art);
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

function renderArtCard(art) {
  const imgUrl = `https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`;
  return `
    <div class="art-card">
      <img src="${imgUrl}" alt="${art.title}" onclick="toggleZoom(this)" title="Click to zoom">
      <div class="art-info">
        <h2>${art.title || 'Untitled'}</h2>
        <p>${art.artist_title || 'Unknown Artist'} — ${art.date_display || 'n.d.'}</p>
      </div>
    </div>
  `;
}

function toggleZoom(img) {
  img.classList.toggle('zoomed');
  document.body.style.overflow = img.classList.contains('zoomed') ? 'hidden' : 'auto';
}