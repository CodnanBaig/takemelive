import ShowreelEditor from '@/components/admin/ShowreelEditor';
import { getShowreelConfig } from '@/lib/content/store';

export default function AdminShowreelPage() {
  const showreel = getShowreelConfig();
  return <ShowreelEditor initialConfig={showreel} />;
}
