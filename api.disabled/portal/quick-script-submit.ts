/**
 * Quick Script Submission API
 * Handles quick script requests (stub for Phase 2)
 */

import { telecheckClient } from '../../src/lib/telecheck.js';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { patientId, scriptType, requestData } = req.body;
    
    if (!patientId || !scriptType) {
      return res.status(400).json({ error: 'Patient ID and script type required' });
    }

    // Submit quick script (stubbed)
    const result = await telecheckClient.submitQuickScript({
      patientId,
      scriptType,
      ...requestData
    });
    
    res.status(200).json({
      success: true,
      data: result,
      message: 'Quick script submission will be implemented in Phase 2'
    });
    
  } catch (error) {
    console.error('Quick script submission error:', error);
    res.status(500).json({ 
      error: 'Service temporarily unavailable',
      message: 'Please try again later'
    });
  }
}