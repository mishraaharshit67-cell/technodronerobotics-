import DataManager from './DataManager';

const fields = [
  { name: 'title', label: 'Title', type: 'text' },
  { name: 'slug', label: 'Slug', type: 'text' },
  { name: 'excerpt', label: 'Excerpt', type: 'textarea' },
  { name: 'content', label: 'Content', type: 'textarea' },
  { name: 'author', label: 'Author', type: 'text' },
  { name: 'tags', label: 'Tags (comma separated)', type: 'text', render: (item) => (item.tags || []).join(', ') },
  { name: 'featured', label: 'Featured', type: 'select', options: ['true', 'false'], render: (item) => item.featured ? 'Yes' : 'No', hide: true },
];

const defaultItem = { title: '', slug: '', excerpt: '', content: '', author: '', tags: '', featured: 'false', published: true };

export default function AdminBlog() {
  const processForm = (form) => ({
    ...form,
    tags: typeof form.tags === 'string' ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : form.tags,
    featured: form.featured === 'true',
  });

  return <DataManager title="Blog Posts" endpoint="blog" fields={fields} defaultItem={defaultItem} />;
}
