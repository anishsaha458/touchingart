const moodMap = {
  calm: "blue water landscape",
  energetic: "red abstract dynamic",
  dark: "black night shadow",
  warm: "yellow sunlight gold",
  romantic: "pink love portrait"
};

async function loadMood(mood) {
  const query = moodMap[mood];
  const page = Math.floor(Math.random() * 50);

  const url = `https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(
    query
  )}&limit=1&page=${page}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    displayArt(data.data[0], mood);
  } catch (error) {
    console.error(error);
    document.getElementById("artwork").innerHTML =
      "<p>Failed to load artwork.</p>";
  }
}

function displayArt(art, mood) {
  if (!art) {
    document.getElementById("artwork").innerHTML =
      "<p>No artwork found for this mood.</p>";
    return;
  }

  const imageUrl = art.image_id
    ? `https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`
    : "";

  document.getElementById("artwork").innerHTML = `
    <div class="art-card">
      ${imageUrl ? `<img src="${imageUrl}" alt="${art.title}">` : ""}
      <h3>${art.title}</h3>
      <p><strong>${art.artist_title || "Unknown Artist"}</strong></p>
      <p>${art.date_display || ""}</p>
      <p class="mood-label">Mood: ${mood}</p>
    </div>
  `;
}
