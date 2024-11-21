import DeleteTeamForm from '@/pages/teams/partials/delete-team-form';
import TeamMemberManager from '@/pages/teams/partials/team-member-manager';
import UpdateTeamNameForm from '@/pages/teams/partials/update-team-name-form';
import SectionBorder from '@/components/ui/section-border';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Head } from '@inertiajs/react';
import {
  JetstreamTeamPermissions,
  Role,
  Team,
  TeamInvitation,
  User,
} from '@/types';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface UserMembership extends User {
  membership: {
    role: string;
  };
}

interface Props {
  team: Team & {
    owner: User;
    team_invitations: TeamInvitation[];
    users: UserMembership[];
  };
  availableRoles: Role[];
  permissions: JetstreamTeamPermissions;
}

export default function Show({ team, availableRoles, permissions }: Props) {
  return (
    <AuthenticatedLayout header="Team Settings">
      <Head title="Team Settings" />
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Team Details</CardTitle>
            <CardDescription>Manage your team details</CardDescription>
          </CardHeader>
          <CardContent>
            <UpdateTeamNameForm team={team} permissions={permissions} />

            <div className="mt-10 sm:mt-0">
              <TeamMemberManager
                team={team}
                availableRoles={availableRoles}
                userPermissions={permissions}
              />
            </div>

            {permissions.canDeleteTeam && !team.personal_team ? (
              <>
                <SectionBorder />

                <div className="mt-10 sm:mt-0">
                  <DeleteTeamForm team={team} />
                </div>
              </>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </AuthenticatedLayout>
  );
}
