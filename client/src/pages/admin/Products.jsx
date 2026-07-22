import DataManager from './DataManager';

const fields = [
  { name: 'name', label: 'Name', type: 'text' },
  { name: 'category', label: 'Category', type: 'select', options: ['FPV Drone', 'Agricultural', 'Fire Fighting', 'Kamikaze', 'Customization'] },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'price', label: 'Price', type: 'text' },
  { name: 'image', label: 'Image URL', type: 'text' },
];

const defaultItem = { name: '', category: 'FPV Drone', description: '', price: '', image: '' };

export default function AdminProducts() {
  return <DataManager title="Products" endpoint="products" fields={fields} defaultItem={defaultItem} />;
}
