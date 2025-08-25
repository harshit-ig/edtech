import nodemailer from 'nodemailer';

interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

interface PaymentConfirmationEmailData {
  customerName: string;
  customerEmail: string;
  courseTitle: string;
  courseCategory: string;
  amount: number;
  currency: string;
  orderId: string;
  transactionId: string;
  paymentDate: Date;
}

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Configure email transporter
    const emailConfig: EmailConfig = {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || ''
      }
    };

    this.transporter = nodemailer.createTransporter(emailConfig);
  }

  /**
   * Send payment confirmation email
   */
  async sendPaymentConfirmation(data: PaymentConfirmationEmailData): Promise<boolean> {
    try {
      const emailContent = this.generatePaymentConfirmationEmail(data);
      
      const mailOptions = {
        from: `"EdTech Informative" <${process.env.SMTP_USER || 'noreply@edtechinformative.com'}>`,
        to: data.customerEmail,
        subject: `Payment Confirmation - ${data.courseTitle}`,
        html: emailContent
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Payment confirmation email sent successfully:', result.messageId);
      return true;
    } catch (error) {
      console.error('Failed to send payment confirmation email:', error);
      return false;
    }
  }

  /**
   * Generate HTML email content for payment confirmation
   */
  private generatePaymentConfirmationEmail(data: PaymentConfirmationEmailData): string {
    const formattedAmount = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: data.currency
    }).format(data.amount);

    const formattedDate = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(data.paymentDate);

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Payment Confirmation</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
          }
          .container {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            border-bottom: 3px solid #0e1589;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .header h1 {
            color: #0e1589;
            margin: 0;
            font-size: 28px;
          }
          .success-icon {
            color: #28a745;
            font-size: 48px;
            margin-bottom: 10px;
          }
          .course-details {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #0e1589;
          }
          .payment-details {
            background-color: #e8f5e8;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #28a745;
          }
          .info-row {
            display: flex;
            justify-content: space-between;
            margin: 10px 0;
            padding: 8px 0;
            border-bottom: 1px solid #eee;
          }
          .info-label {
            font-weight: bold;
            color: #555;
          }
          .info-value {
            color: #333;
          }
          .next-steps {
            background-color: #fff3cd;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #ffc107;
          }
          .next-steps h3 {
            color: #856404;
            margin-top: 0;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            color: #666;
            font-size: 14px;
          }
          .contact-info {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="success-icon">✅</div>
            <h1>Payment Confirmation</h1>
            <p>Thank you for your enrollment!</p>
          </div>

          <p>Dear <strong>${data.customerName}</strong>,</p>
          
          <p>We're excited to confirm that your payment has been processed successfully and you're now enrolled in our course!</p>

          <div class="course-details">
            <h3>Course Details</h3>
            <div class="info-row">
              <span class="info-label">Course:</span>
              <span class="info-value">${data.courseTitle}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Category:</span>
              <span class="info-value">${data.courseCategory}</span>
            </div>
          </div>

          <div class="payment-details">
            <h3>Payment Information</h3>
            <div class="info-row">
              <span class="info-label">Amount Paid:</span>
              <span class="info-value">${formattedAmount}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Order ID:</span>
              <span class="info-value">${data.orderId}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Transaction ID:</span>
              <span class="info-value">${data.transactionId}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Payment Date:</span>
              <span class="info-value">${formattedDate}</span>
            </div>
          </div>

          <div class="next-steps">
            <h3>What's Next?</h3>
            <ol>
              <li><strong>Course Access:</strong> You will receive course access credentials within 24-48 hours.</li>
              <li><strong>Welcome Kit:</strong> Check your email for our comprehensive welcome kit and course materials.</li>
              <li><strong>Orientation:</strong> Join our orientation session to get started with your learning journey.</li>
              <li><strong>Support:</strong> Our team is here to help you succeed!</li>
            </ol>
          </div>

          <div class="contact-info">
            <p><strong>Need Help?</strong></p>
            <p>Email: support@edtechinformative.com<br>
            Phone: +1 (555) 123-4567</p>
          </div>

          <p>We're thrilled to have you as part of our learning community. Get ready for an amazing educational experience!</p>

          <p>Best regards,<br>
          <strong>The EdTech Informative Team</strong></p>

          <div class="footer">
            <p>This is an automated confirmation email. Please do not reply to this message.</p>
            <p>&copy; ${new Date().getFullYear()} EdTech Informative. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Test email service configuration
   */
  async testConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      console.log('Email service connection verified successfully');
      return true;
    } catch (error) {
      console.error('Email service connection failed:', error);
      return false;
    }
  }
}

export default EmailService;
