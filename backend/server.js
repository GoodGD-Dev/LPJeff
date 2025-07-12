const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Configuração do transportador de email
const transporter = nodemailer.createTransporter({
  service: 'gmail', // ou outro provedor
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS // Use App Password para Gmail
  }
});

// Endpoint para enviar email
app.post('/api/send-email', async (req, res) => {
  try {
    const { formData, recipientEmail, emailSubject = 'Novo contato do site' } = req.body;

    // Construir o HTML do email
    let emailHtml = `
      <h2>Novo contato recebido</h2>
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
    `;

    Object.entries(formData).forEach(([key, value]) => {
      const fieldName = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      emailHtml += `
        <div style="margin-bottom: 15px;">
          <strong>${fieldName}:</strong> ${value}
        </div>
      `;
    });

    emailHtml += `
        <hr style="margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">
          Este email foi enviado automaticamente através do formulário do site.
        </p>
      </div>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipientEmail,
      subject: emailSubject,
      html: emailHtml
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'Email enviado com sucesso!'
    });

  } catch (error) {
    console.error('Erro ao enviar email:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao enviar email',
      error: error.message
    });
  }
});

// Endpoint para enviar mensagem para WhatsApp
app.post('/api/send-whatsapp', async (req, res) => {
  try {
    const { formData, phoneNumber, whatsappApiToken } = req.body;

    // Construir mensagem para WhatsApp
    let message = "📝 *Novo contato recebido*\n\n";

    Object.entries(formData).forEach(([key, value]) => {
      const fieldName = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      message += `*${fieldName}:* ${value}\n`;
    });

    message += "\n_Mensagem enviada automaticamente através do formulário do site._";

    // Usando WhatsApp Business API (exemplo com Meta)
    const whatsappResponse = await axios.post(
      `https://graph.facebook.com/v17.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: phoneNumber,
        type: "text",
        text: {
          body: message
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${whatsappApiToken || process.env.WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({
      success: true,
      message: 'Mensagem enviada para WhatsApp com sucesso!',
      whatsappId: whatsappResponse.data.messages[0].id
    });

  } catch (error) {
    console.error('Erro ao enviar WhatsApp:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao enviar mensagem para WhatsApp',
      error: error.response?.data || error.message
    });
  }
});

// Endpoint alternativo para WhatsApp usando URL scheme (fallback)
app.post('/api/whatsapp-url', async (req, res) => {
  try {
    const { formData, phoneNumber } = req.body;

    // Construir mensagem
    let message = "📝 Novo contato recebido\n\n";

    Object.entries(formData).forEach(([key, value]) => {
      const fieldName = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      message += `${fieldName}: ${value}\n`;
    });

    message += "\nMensagem enviada através do formulário do site.";

    // Codificar mensagem para URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    res.json({
      success: true,
      whatsappUrl: whatsappUrl,
      message: 'URL do WhatsApp gerada com sucesso!'
    });

  } catch (error) {
    console.error('Erro ao gerar URL WhatsApp:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao gerar URL do WhatsApp',
      error: error.message
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Health check disponível em: http://localhost:${PORT}/health`);
});
