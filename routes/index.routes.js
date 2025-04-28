const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const supabase = require('../config/supabase.config');
const upload = multer({ dest: 'uploads/' });

router.get('/', (req, res) => {
    res.render('home');
})

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const file = req.file;
        const fileContent = fs.readFileSync(file.path);

        const { data, error } = await supabase.storage.from('drive').upload('uploads/' + file.originalname, fileContent, {
            contentType: file.mimetype,
            upsert: true,
        });

        if (error) {
            console.log('Error:', error);
            return res.status(500).json({ error: 'Upload Failed' });
        }

        const { data: publicUrlData } = supabase.storage.from('drive').getPublicUrl('uploads/' + file.originalname);

        res.json({ url: publicUrlData.publicUrl });

        fs.unlinkSync(file.path);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server Error' });
    }
})


module.exports = router