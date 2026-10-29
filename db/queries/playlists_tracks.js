import db from "#db/client";

export async function createPlaylistTrack(playlistId, trackId) {
  const sql = `
  INSERT INTO playlists_tracks
    (playlist_id, track_id)
  VALUES
    ($1, $2)
  RETURNING *
  `;
  const {
    rows: [playlistTrack],
  } = await db.query(sql, [playlistId, trackId]);
  return playlistTrack;
}

export async function updatePlaylistTrack(id, playlistId, trackId) {
  const sql = `
    UPDATE playlists_tracks
    SET playlist_id = $2, track_id = $3
    WHERE id = $1
    RETURNING *
  `;
  const {rows: playTrack} = await db.query(sql, [id, playlistId, trackId]);
  return playTrack;
}
