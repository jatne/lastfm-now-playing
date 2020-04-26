const endpoint =
  'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=###&api_key=###&format=json';

async function getMusicData(endpoint) {
  const response = await fetch(endpoint);
  const data = await response.json();

  return data;
}

const handleCurrentMusic = data => {
  const currentListening = data.filter(song => {
    if ('@attr' in song) {
      return song['@attr'].nowplaying === 'true';
    }
    return false;
  });

  return currentListening;
};

getMusicData(endpoint).then(response =>
  console.log(handleCurrentMusic(response.recenttracks.track))
);
