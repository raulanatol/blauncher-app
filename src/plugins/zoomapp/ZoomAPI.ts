import { Zoom } from './Zoom';
import { doPost } from '../../utils/network/api';

const ZOOM_API_BASE_URL = 'https://api.zoom.us/v2/';

export class ZoomAPI implements Zoom {
  async createMeeting(): Promise<any> {
    const userId = 123;
    const url = `${ZOOM_API_BASE_URL}users/${userId}/meetings'`;
    const response = await doPost(url);
    console.log('>>>', response);
  }
}
