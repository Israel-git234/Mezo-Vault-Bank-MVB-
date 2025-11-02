/**
 * NFC Payment Integration for MezoBank Vaults
 * 
 * Provides NFC tap-to-pay functionality for Lightning payments.
 * Uses Web NFC API (Chrome/Edge on Android) and fallbacks for other platforms.
 */

export interface NFCPaymentRequest {
  amount: number; // Amount in MUSD
  invoice?: string; // Optional Lightning invoice
  merchant?: string; // Merchant identifier
  description?: string; // Payment description
}

export interface NFCPaymentResponse {
  success: boolean;
  transactionId?: string;
  error?: string;
  invoice?: string;
}

/**
 * Check if NFC is available on the device
 */
export function isNFCAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Check for Web NFC API (Chrome/Edge on Android)
  if ('NDEFReader' in window) {
    return true;
  }
  
  // Check for iOS (requires native app with Core NFC)
  if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
    return false; // Web NFC not available on iOS Safari
  }
  
  return false;
}

/**
 * Request NFC permission
 */
export async function requestNFCPermission(): Promise<boolean> {
  if (!isNFCAvailable()) {
    return false;
  }

  try {
    // Web NFC API will prompt user on first use
    const reader = new (window as any).NDEFReader();
    await reader.scan();
    return true;
  } catch (error: any) {
    // Permission denied or NFC not available
    if (error.name === 'NotAllowedError' || error.name === 'NotFoundError') {
      return false;
    }
    // Other errors might indicate NFC is available but needs setup
    return true;
  }
}

/**
 * Generate NFC payment data for Lightning invoice
 */
export function createNFCPaymentData(
  amount: number,
  invoice: string,
  merchant?: string
): string {
  // Create NDEF record format for Lightning payment
  // Format: JSON payload with payment details
  const paymentData = {
    type: 'lightning',
    amount: amount,
    invoice: invoice,
    merchant: merchant || 'MezoBank Vaults',
    timestamp: Date.now(),
    version: '1.0'
  };
  
  return JSON.stringify(paymentData);
}

/**
 * Read NFC tag (for receiving payments from merchant terminals)
 */
export async function readNFCTag(): Promise<NFCPaymentRequest | null> {
  if (!isNFCAvailable()) {
    throw new Error('NFC is not available on this device');
  }

  try {
    const reader = new (window as any).NDEFReader();
    
    return new Promise((resolve, reject) => {
      reader.addEventListener('reading', (event: any) => {
        try {
          const records = event.message.records;
          
          for (const record of records) {
            if (record.recordType === 'mime' && record.mediaType === 'application/json') {
              const decoder = new TextDecoder();
              const data = JSON.parse(decoder.decode(record.data));
              
              if (data.type === 'lightning' || data.type === 'payment') {
                resolve({
                  amount: data.amount,
                  invoice: data.invoice,
                  merchant: data.merchant,
                  description: data.description
                });
                return;
              }
            } else if (record.recordType === 'text') {
              // Try to decode as Lightning invoice
              const decoder = new TextDecoder();
              const text = decoder.decode(record.data);
              
              if (text.startsWith('lnbc') || text.startsWith('lightning:')) {
                // Extract amount from invoice or use default
                resolve({
                  amount: 0, // Amount should be extracted from invoice
                  invoice: text.replace('lightning:', ''),
                });
                return;
              }
            }
          }
          
          reject(new Error('No valid payment data found on NFC tag'));
        } catch (error) {
          reject(error);
        }
      });
      
      reader.addEventListener('error', (event: any) => {
        reject(new Error(`NFC read error: ${event.message}`));
      });
      
      reader.scan().catch(reject);
    });
  } catch (error: any) {
    throw new Error(`Failed to read NFC: ${error.message}`);
  }
}

/**
 * Write NFC tag (for sending payments to merchant terminals)
 */
export async function writeNFCTag(paymentData: NFCPaymentRequest): Promise<void> {
  if (!isNFCAvailable()) {
    throw new Error('NFC is not available on this device');
  }

  try {
    const reader = new (window as any).NDEFReader();
    const message = createNFCPaymentData(
      paymentData.amount,
      paymentData.invoice || '',
      paymentData.merchant
    );
    
    // Create NDEF message with JSON payload
    const encoder = new TextEncoder();
    const ndefMessage = {
      records: [
        {
          recordType: 'mime',
          mediaType: 'application/json',
          data: encoder.encode(message)
        },
        {
          recordType: 'text',
          lang: 'en',
          encoding: 'utf-8',
          data: encoder.encode(paymentData.invoice || '')
        }
      ]
    };
    
    await reader.write(ndefMessage);
  } catch (error: any) {
    throw new Error(`Failed to write NFC: ${error.message}`);
  }
}

/**
 * Handle NFC payment flow
 * This integrates with your Lightning payment system
 */
export async function processNFCPayment(
  paymentRequest: NFCPaymentRequest,
  onPaymentProcessed: (amount: number, invoice: string) => Promise<void>
): Promise<NFCPaymentResponse> {
  try {
    // If we received an NFC tag, process it
    if (paymentRequest.invoice) {
      await onPaymentProcessed(paymentRequest.amount, paymentRequest.invoice);
      
      return {
        success: true,
        transactionId: `nfc_${Date.now()}`,
        invoice: paymentRequest.invoice
      };
    }
    
    return {
      success: false,
      error: 'No invoice provided'
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message
    };
  }
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    NDEFReader?: any;
    NDEFWriter?: any;
  }
}


