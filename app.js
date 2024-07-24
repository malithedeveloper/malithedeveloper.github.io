const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5500;

// Serve static files from the /songs directory
app.use('/songs', express.static(path.join(__dirname, 'songs')));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to get the list of songs
app.get('/songs', (req, res) => {
    const songsDir = path.join(__dirname, 'songs');
    fs.readdir(songsDir, (err, files) => {
        if (err) {
            console.error('Error reading songs directory:', err);
            res.status(500).send('Server Error');
        } else {
            // Filter out only audio files (e.g., .mp3)
            const audioFiles = files.filter(file => file.endsWith('.mp3'));
            res.json(audioFiles);
        }
    });
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
