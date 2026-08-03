import { generateTimelineEvents } from '../ai/timeline/timelineGenerator';
import { DatabaseService } from '../database/supabaseClient';
import { TimelineEvent, DocumentItem } from '../models/types';

export class TimelineService {
  static async getTimeline(regNo: string, bodyContext?: { documents?: DocumentItem[]; projects?: any[]; certs?: any[]; internships?: any[] }): Promise<TimelineEvent[]> {
    let docs = bodyContext?.documents || [];
    if (docs.length === 0 && regNo) {
      docs = await DatabaseService.getDocumentsByRegNo(regNo);
    }
    return generateTimelineEvents(docs, bodyContext?.projects, bodyContext?.certs, bodyContext?.internships);
  }
}
