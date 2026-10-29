import express from "express";
const router = express.Router();
export default router;

import requireUser from "#middleware/requireUser";

import { getTracks, getTrackById } from "#db/queries/tracks";
import { getPlaylistsByTrackId } from "#db/queries/playlists";

router.get("/", async (req, res) => {
  const tracks = await getTracks();
  res.send(tracks);
});

router.get("/:id", async (req, res) => {
  const track = await getTrackById(req.params.id);
  if (!track) return res.status(404).send("Track not found.");
  res.send(track);
});

router.get("/:id/playlists", requireUser, async (req, res) => {
  const track = await getTrackById(req.params.id);
  if (!track) return res.status(404).send("Track not found");

  const playlists = await getPlaylistsByTrackId(track.id);
  if (!playlists) return res.status(404).send("Playlist not found");
  res.send(playlists);
});
