import React from 'react';
import { Head } from '@inertiajs/react';
import CreateTeamForm from '@/pages/teams/partials/create-team-form';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Create() {
  return (
    <AuthenticatedLayout header="Create Team">
      <Head title="Create Team" />
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Team Details</CardTitle>
            <CardDescription>
              Create a new team to collaborate with others on projects.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CreateTeamForm />
          </CardContent>
        </Card>
      </div>
    </AuthenticatedLayout>
  );
}
