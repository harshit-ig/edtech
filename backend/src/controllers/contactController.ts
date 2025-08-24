import { Request, Response } from 'express';
import { InquiryModel, CustomerModel } from '../models';
import { generateInquiryId, generateCustomerId } from '../utils/idGenerator';

// Submit contact form
export const submitContactForm = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, subject, message, source = 'contact_form' } = req.body;

    // Validate required fields
    if (!name || !email || !phone) {
      res.status(400).json({
        success: false,
        error: 'Missing required fields: name, email, phone'
      });
      return;
    }

    // Create inquiry record
    const inquiry = new InquiryModel({
      id: generateInquiryId(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      type: 'contact_form',
      status: 'new',
      subject: subject?.trim() || 'General Inquiry',
      message: message?.trim() || '',
      source,
      notes: `Contact form submission from ${source}`
    });

    await inquiry.save();

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully. We will get back to you soon!',
      inquiry: {
        id: inquiry.id,
        status: inquiry.status
      }
    });

  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit contact form'
    });
  }
};

// Submit strategy call booking
export const submitStrategyCall = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, source = 'strategy_call_modal' } = req.body;

    // Validate required fields
    if (!name || !email || !phone) {
      res.status(400).json({
        success: false,
        error: 'Missing required fields: name, email, phone'
      });
      return;
    }

    // Create inquiry record
    const inquiry = new InquiryModel({
      id: generateInquiryId(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      type: 'strategy_call',
      status: 'new',
      subject: 'Strategy Call Booking',
      message: 'User requested a strategy call to discuss career goals and course options.',
      source,
      notes: `Strategy call booking from ${source}`
    });

    await inquiry.save();

    res.status(201).json({
      success: true,
      message: 'Strategy call booked successfully! Our team will contact you within 24 hours.',
      inquiry: {
        id: inquiry.id,
        status: inquiry.status
      }
    });

  } catch (error) {
    console.error('Error booking strategy call:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to book strategy call'
    });
  }
};

// Submit installment inquiry - Creates a Customer record instead of Inquiry
export const submitInstallmentInquiry = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, courseId, courseName, source = 'pricing_section' } = req.body;

    // Validate required fields
    if (!name || !email || !phone) {
      res.status(400).json({
        success: false,
        error: 'Missing required fields: name, email, phone'
      });
      return;
    }

    // Create customer record for installment inquiry
    const customer = new CustomerModel({
      id: generateCustomerId(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      courseId: courseId || 'unknown',
      courseName: courseName || 'Unknown Course',
      courseCategory: 'General',
      paymentType: 'installment',
      paymentStatus: 'pending',
      customerStatus: 'installment_pending',
      amount: 0, // Will be set when installment plan is created
      currency: 'USD',
      source,
      notes: `Installment inquiry from ${source} for course: ${courseName || 'Unknown'}. Customer interested in installment payment plan.`
    });

    await customer.save();

    res.status(201).json({
      success: true,
      message: 'Installment inquiry submitted successfully! Our team will contact you with payment plan options.',
      customer: {
        id: customer.id,
        status: customer.customerStatus
      }
    });

  } catch (error) {
    console.error('Error submitting installment inquiry:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit installment inquiry'
    });
  }
};
