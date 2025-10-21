/**
 * Telecheck Run API
 * Executes telecheck assessments (stub for Phase 2)
 */

import { telecheckClient } from '../../src/lib/telecheck.js';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { patientId, assessmentData } = req.body;
    
    if (!patientId) {
      return res.status(400).json({ error: 'Patient ID required' });
    }

    // Run telecheck assessment (stubbed)
    const result = await telecheckClient.runTelecheck(patientId, assessmentData);
    
    res.status(200).json({
      success: true,
      data: result,
      message: 'Telecheck integration will be implemented in Phase 2'
    });
    
  } catch (error) {
    console.error('Telecheck run error:', error);
    res.status(500).json({ 
      error: 'Service temporarily unavailable',
      message: 'Please try again later'
    });
  }
}