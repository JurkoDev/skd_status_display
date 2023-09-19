import { Card, Title, Text } from '@tremor/react';
// import { queryBuilder } from '../lib/planetscale';

import Item from './item';


import Search from './search';
import UsersTable from './table';

export const dynamic = 'force-dynamic';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? '';
  const users = [{ "id": "test1", "name": "test user 1" }, { "id": "test2", "name": "test user 2" }];

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Item />
    </main>
  );
}
