import { createClient } from '@supabase/supabase-js';

// These will be loaded from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env file');
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Table name for our guests
export const TABLE_NAME = 'guests';

/**
 * Fetches all guests from the guests table
 * @returns {Promise<Array>} Array of guest objects
 */
/**
 * Fetches an invitation and its associated guests by invitation code
 * @param {string} code - The invitation code to look up
 * @returns {Promise<Object|null>} Object containing invitation and guests if found, null otherwise
 */
export const getInvitationWithGuests = async (code) => {
  if (!code) return null;
  
  try {
    // Trim the code but preserve the original case
    const trimmedCode = code.trim();
    console.log(`[getInvitationWithGuests] Searching for invitation with code: "${trimmedCode}"`);
    
    // First, get the invitation by code (case-insensitive match)
    const { data: invitations, error: invitationError } = await supabase
      .from('invitations')
      .select('*')
      .ilike('code', trimmedCode);
    
    if (invitationError) {
      console.error('[getInvitationWithGuests] Error fetching invitation:', invitationError);
      throw invitationError;
    }
    
    if (!invitations || invitations.length === 0) {
      console.log(`[getInvitationWithGuests] No invitation found with code: "${trimmedCode}"`);
      return null;
    }
    
    // Take the first match (should be only one if codes are unique)
    const invitation = invitations[0];
    console.log(`[getInvitationWithGuests] Found invitation:`, invitation);
    
    // Fetch guests in the same query using a join
    const { data, error: guestsError } = await supabase
      .from('guests')
      .select('*')
      .eq('invitation_id', invitation.id);
    
    if (guestsError) {
      console.error('[getInvitationWithGuests] Error fetching guests:', guestsError);
      throw guestsError;
    }
    
    console.log(`[getInvitationWithGuests] Found ${data.length} guests for invitation`);
    
    // Combine the invitation with its guests
    return {
      ...invitation,
      guests: data || []
    };
  } catch (error) {
    console.error('Error in getInvitationWithGuests:', error);
    throw error;
  }
};

/**
 * Fetches all guests from the guests table
 * @returns {Promise<Array>} Array of guest objects
 */
export const getAllGuests = async () => {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching guests:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getAllGuests:', error);
    throw error;
  }
};

/**
 * Fetches a single guest by their code
 * @param {string} code - The guest's unique code
 * @returns {Promise<Object|null>} Guest object if found, null otherwise
 */
export const getGuestByCode = async (code) => {
  if (!code) return null;
  
  try {
    const normalizedCode = code.trim();
    console.log(`[getGuestByCode] Searching for code: "${normalizedCode}"`);
    
    // First try exact match
    let { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .eq('code', normalizedCode)
      .single()
      .then(({ data, error }) => {
        console.log('[getGuestByCode] Exact match result:', { data, error });
        return { data, error };
      });

    // If no exact match, try case-insensitive search
    if (error?.code === 'PGRST116') {
      console.log('[getGuestByCode] No exact match, trying case-insensitive search');
      
      const { data: caseInsensitiveData, error: ciError } = await supabase
        .from(TABLE_NAME)
        .select('*')
        .ilike('code', normalizedCode)
        .maybeSingle();
        
      console.log('[getGuestByCode] Case-insensitive result:', { data: caseInsensitiveData, error: ciError });
      
      if (ciError) {
        console.error('[getGuestByCode] Error in case-insensitive search:', ciError);
        throw ciError;
      }
      
      return caseInsensitiveData || null;
    }

    if (error) {
      console.error('[getGuestByCode] Error fetching guest:', error);
      throw error;
    }

    return data || null;
  } catch (error) {
    console.error('Error in getGuestByCode:', error);
    throw error;
  }
};
