import DataManager from './DataManager';

const fields = [
  { name: 'title', label: 'Title', type: 'text' },
  { name: 'dept', label: 'Department', type: 'text' },
  { name: 'location', label: 'Location', type: 'text' },
  { name: 'type', label: 'Type', type: 'select', options: ['Full-time', 'Part-time', 'Contract', 'Internship'] },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'requirements', label: 'Requirements (line separated)', type: 'textarea', render: (item) => (item.requirements || []).join(', ') },
];

const defaultItem = { title: '', dept: '', location: '', type: 'Full-time', description: '', requirements: '', active: true };

export default function AdminJobs() {
  return <DataManager title="Jobs" endpoint="jobs" fields={fields} defaultItem={defaultItem} />;
}
