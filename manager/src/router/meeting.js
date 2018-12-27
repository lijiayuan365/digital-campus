import MeetingAssistant from '../views/meeting/MeetingIndex.vue'
import MeetingSetting from '../views/meeting/MeetingSetting.vue'
import MeetingSummary from '../views/meeting/MeetingSummary.vue'

export default [
  {
    path: 'meeting-assistant',
    name: 'MeetingAssistant',
    component: MeetingAssistant,
  },
  {
    path: 'meeting-assistant/summary',
    name: 'MeetingSummary',
    component: MeetingSummary
  },
  {
    path: 'meeting-assistant/setting',
    name: 'MeetingSetting',
    component: MeetingSetting
  },
]
