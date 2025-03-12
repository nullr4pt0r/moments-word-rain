import clarity from '@microsoft/clarity';
import { v4 as uuidv4 } from 'uuid';

/**
 * Initializes Microsoft Clarity analytics with the provided project ID
 */
export const initClarity = (): void => {
  try {
    clarity.init("qn5sst2s23");
    
    // Set visitor identifier
    const userId = getUserId();
    identifyUser(userId);
    
    // Set some default tags
    setDefaultTags();
    
    console.log('Microsoft Clarity initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Microsoft Clarity:', error);
  }
};

/**
 * Gets or creates a unique user ID from session storage
 * @returns {string} The user ID
 */
const getUserId = (): string => {
  let userId = sessionStorage.getItem('clarity_user_id');
  
  if (!userId) {
    userId = uuidv4();
    sessionStorage.setItem('clarity_user_id', userId);
  }
  
  return userId;
};

/**
 * Identifies the user to Clarity
 * @param {string} userId - The user ID to identify
 */
export const identifyUser = (userId: string): void => {
  try {
    // Only passing the required customId parameter
    clarity.identify(userId);
    console.log('User identified in Clarity:', userId);
  } catch (error) {
    console.error('Failed to identify user in Clarity:', error);
  }
};

/**
 * Sets some default tags for all sessions
 */
const setDefaultTags = (): void => {
  try {
    // Set some useful default tags
    clarity.setTag('app_version', '1.0.0');
    clarity.setTag('environment', import.meta.env.MODE);
    clarity.setTag('language', navigator.language);
    clarity.setTag('platform', navigator.platform);
  } catch (error) {
    console.error('Failed to set default tags in Clarity:', error);
  }
};

/**
 * Tracks a custom event in Clarity
 * @param {string} eventName - The name of the event to track
 */
export const trackEvent = (eventName: string): void => {
  try {
    clarity.event(eventName);
    console.log('Event tracked in Clarity:', eventName);
  } catch (error) {
    console.error('Failed to track event in Clarity:', error);
  }
};

/**
 * Sets a custom tag in Clarity
 * @param {string} key - The key for the tag
 * @param {string | string[]} value - The value(s) for the tag
 */
export const setTag = (key: string, value: string | string[]): void => {
  try {
    clarity.setTag(key, value);
    console.log('Tag set in Clarity:', key, value);
  } catch (error) {
    console.error('Failed to set tag in Clarity:', error);
  }
};

/**
 * Upgrades the current session in Clarity
 * @param {string} reason - The reason for upgrading the session
 */
export const upgradeSession = (reason: string): void => {
  try {
    clarity.upgrade(reason);
    console.log('Session upgraded in Clarity:', reason);
  } catch (error) {
    console.error('Failed to upgrade session in Clarity:', error);
  }
};
