import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'service_q1t117q';
const EMAILJS_TEMPLATE_ID_BUSINESS = 'template_business';
const EMAILJS_TEMPLATE_ID_FINANCE = 'template_finance';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'z0b-6L3lS39kuY5t1';

// Initialize EmailJS with the public key
emailjs.init('z0b-6L3lS39kuY5t1');

// Test function to verify EmailJS connection
export const testEmailJSConnection = async () => {
  try {
    console.log('Testing EmailJS connection...');
    console.log('Service ID:', EMAILJS_SERVICE_ID);
    console.log('Public Key configured:', EMAILJS_PUBLIC_KEY);
    
    if (!EMAILJS_PUBLIC_KEY) {
      throw new Error('EmailJS public key not configured');
    }

    // Test with minimal template params
    const testParams = {
      to_email: 'hello@yorkville.global',
      from_name: 'Test User',
      message: 'This is a test message to verify EmailJS connection'
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      'template_test', // You'll need to create this test template
      testParams
    );

    console.log('EmailJS test successful:', response);
    return { success: true, response };
  } catch (error) {
    console.error('EmailJS test failed:', error);
    return { success: false, error };
  }
};

export const sendBusinessFormEmail = async (formData) => {
  try {
    // Check if EmailJS is properly configured
    if (!EMAILJS_PUBLIC_KEY) {
      console.warn('EmailJS not configured. Form data would be sent to:', formData);
      // In development, we'll simulate success
      if (import.meta.env.DEV) {
        console.log('Development mode: Simulating successful email send');
        return { success: true, response: { status: 200, text: 'OK (simulated)' } };
      }
      throw new Error('Email service not configured');
    }

    const templateParams = {
      to_email: 'hello@yorkville.global',
      from_name: formData.contactName,
      business_name: formData.businessName,
      contact_name: formData.contactName,
      email: formData.email,
      years_in_operation: formData.yearsInOperation,
      business_size: formData.businessSize,
      ideal_outcomes: formData.idealOutcomes.join(', '),
      other_outcome: formData.otherOutcome,
      seeking_investment: formData.seekingInvestment ? 'Yes' : 'No',
      investment_amount: formData.investmentAmount,
      form_type: 'Business Support Request',
      submission_date: new Date().toLocaleString()
    };

    console.log('Sending business form email with params:', templateParams);

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID_BUSINESS,
      templateParams
    );

    console.log('Business form email sent successfully:', response);
    return { success: true, response };
  } catch (error) {
    console.error('Error sending business form email:', error);
    return { success: false, error };
  }
};

export const sendFinanceProfessionalEmail = async (formData) => {
  try {
    // Check if EmailJS is properly configured
    if (!EMAILJS_PUBLIC_KEY) {
      console.warn('EmailJS not configured. Form data would be sent to:', formData);
      // In development, we'll simulate success
      if (import.meta.env.DEV) {
        console.log('Development mode: Simulating successful email send');
        return { success: true, response: { status: 200, text: 'OK (simulated)' } };
      }
      throw new Error('Email service not configured');
    }

    const templateParams = {
      to_email: 'hello@yorkville.global',
      from_name: formData.fullName,
      full_name: formData.fullName,
      email: formData.email,
      core_interests: formData.coreInterests.join(', '),
      years_experience: formData.yearsExperience,
      entity_size: formData.entitySize,
      linkedin_url: formData.linkedinUrl,
      weekly_commitment: formData.weeklyCommitment,
      content_contribution: formData.contentContribution ? 'Yes' : 'No',
      form_type: 'Finance Professional Application',
      submission_date: new Date().toLocaleString()
    };

    console.log('Sending finance professional email with params:', templateParams);

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID_FINANCE,
      templateParams
    );

    console.log('Finance professional email sent successfully:', response);
    return { success: true, response };
  } catch (error) {
    console.error('Error sending finance professional email:', error);
    return { success: false, error };
  }
};