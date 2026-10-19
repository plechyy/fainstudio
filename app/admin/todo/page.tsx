import type { Metadata } from 'next';
import AdminTodo from '../AdminTodo';

export const metadata: Metadata = { title: 'To do' };

export default function Page() {
  return <AdminTodo />;
}
