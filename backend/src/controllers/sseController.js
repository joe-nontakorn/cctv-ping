async function sseController(req, res) {
    try {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        // ส่งข้อมูลออกไปยังไคลเอนต์ทุกๆ 1 วินาที (ตัวอย่าง)
        setInterval(() => {
            const data = JSON.stringify({ message: 'This is a real-time message' });
            res.write(`data: ${data}\n\n`);
        }, 1000);
    } catch (error) {
        console.error('Error in SSE controller:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = { sseController };