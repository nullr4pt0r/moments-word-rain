
import clarity from '@microsoft/clarity';

/**
 * Initializes Microsoft Clarity analytics with the provided project ID
 */
export const initClarity = (): void => {
  try {
    clarity.init({
      projectId: 'qn5sst2s23',
      upload: 'https://www.clarity.ms/collect',
      delay: 500, // Short delay to not affect page load performance
      lean: true, // Use the lean version for better performance
    });
    console.log('Microsoft Clarity initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Microsoft Clarity:', error);
  }
};
