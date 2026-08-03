import emailjs from '@emailjs/browser';

const SERVICE_ID_KEY = 'memoryverse_emailjs_service_id';
const TEMPLATE_ID_KEY = 'memoryverse_emailjs_template_id';
const PUBLIC_KEY_KEY = 'memoryverse_emailjs_public_key';

export const getEmailJsConfig = () => {
  if (typeof window === 'undefined') {
    return { serviceId: '', templateId: '', publicKey: '' };
  }
  const envServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
  const envTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
  const envPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

  const serviceId = envServiceId || localStorage.getItem(SERVICE_ID_KEY) || 'service_jsoxu36';
  const templateId = envTemplateId || localStorage.getItem(TEMPLATE_ID_KEY) || 'template_fikdtgi';
  const publicKey = envPublicKey || localStorage.getItem(PUBLIC_KEY_KEY) || 'i1Wq-xCqrmrzM3xLx';

  return { serviceId, templateId, publicKey };
};

export const setEmailJsConfig = (serviceId: string, templateId: string, publicKey: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(SERVICE_ID_KEY, serviceId.trim());
    localStorage.setItem(TEMPLATE_ID_KEY, templateId.trim());
    localStorage.setItem(PUBLIC_KEY_KEY, publicKey.trim());
  }
};

export interface SendEmailResult {
  success: boolean;
  isRealEmail: boolean;
  message: string;
  errorDetails?: string;
}

export async function sendVerificationEmail(
  toEmail: string,
  verificationCode: string,
  studentName: string = 'Student'
): Promise<SendEmailResult> {
  const { serviceId, templateId, publicKey } = getEmailJsConfig();

  const templateParams = {
    to_email: toEmail,
    email: toEmail,
    reply_to: toEmail,
    to_name: studentName,
    user_name: studentName,
    passcode: verificationCode,
    otp_code: verificationCode,
    verification_code: verificationCode,
    verificationCode: verificationCode,
    otp: verificationCode,
    code: verificationCode,
    message: `Your MemoryVerse AI verification code is: ${verificationCode}. Enter this code to set your account password.`,
    body: `Your MemoryVerse AI verification code is: ${verificationCode}. Enter this code to set your account password.`
  };

  let lastErrorDetails = '';

  if (serviceId && templateId && publicKey) {
    const candidateTemplateIds = Array.from(new Set([
      templateId,
      templateId.startsWith('template_') ? templateId : `template_${templateId}`,
      templateId.replace('template_', '')
    ]));

    for (const tid of candidateTemplateIds) {
      try {
        const response = await emailjs.send(serviceId, tid, templateParams, publicKey);
        if (response.status === 200 || response.text === 'OK') {
          return {
            success: true,
            isRealEmail: true,
            message: `Verification code sent to your email (${toEmail}) via EmailJS!`
          };
        } else {
          lastErrorDetails = `Status ${response.status}: ${response.text}`;
        }
      } catch (err: any) {
        lastErrorDetails = err?.text || err?.message || (typeof err === 'string' ? err : JSON.stringify(err));
        console.warn(`EmailJS attempt failed for template ID ${tid}:`, lastErrorDetails);
      }
    }
  } else {
    lastErrorDetails = 'Missing EmailJS configuration parameters.';
  }

  // Fallback code dispatch so user registration is never blocked
  return {
    success: true,
    isRealEmail: false,
    message: `Verification code generated for ${toEmail}.`,
    errorDetails: lastErrorDetails
  };
}
