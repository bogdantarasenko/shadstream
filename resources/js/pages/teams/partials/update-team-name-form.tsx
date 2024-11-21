import React from 'react';
import classNames from 'classnames';
import { useForm } from '@inertiajs/react';

import useRoute from '@/hooks/use-route';
import ActionMessage from '@/components/ui/action-message';
import FormSection from '@/components/ui/form-section';
import { InputError } from '@/components/ui/input-error';
import InputLabel from '@/components/ui/input-label';
import PrimaryButton from '@/components/ui/primary-button';
import { Input } from '@/components/ui/input';
import { JetstreamTeamPermissions, Team, User } from '@/types';

interface Props {
  team: Team & { owner: User };
  permissions: JetstreamTeamPermissions;
}

export default function UpdateTeamNameForm({ team, permissions }: Props) {
  const route = useRoute();
  const form = useForm({
    name: team.name,
  });

  function updateTeamName() {
    form.put(route('teams.update', [team]), {
      errorBag: 'updateTeamName',
      preserveScroll: true,
    });
  }

  return (
    <FormSection
      onSubmit={updateTeamName}
      title={'Team Name'}
      description={`The team's name and owner information.`}
      renderActions={
        permissions.canUpdateTeam
          ? () => (
              <>
                <ActionMessage on={form.recentlySuccessful}>
                  Saved.
                </ActionMessage>

                <PrimaryButton
                  className={classNames({
                    'ml-3': form.recentlySuccessful,
                    'opacity-25': form.processing,
                  })}
                  disabled={form.processing}
                >
                  Save
                </PrimaryButton>
              </>
            )
          : undefined
      }
    >
      {/* <!-- Team Owner Information --> */}
      <div className="col-span-6">
        <InputLabel value="Team Owner" />

        <div className="flex items-center mt-2">
          <img
            className="w-12 h-12 rounded-full object-cover"
            src={team.owner.profile_photo_url}
            alt={team.owner.name}
          />

          <div className="ml-4 leading-tight">
            <div className="text-gray-900 dark:text-white">
              {team.owner.name}
            </div>
            <div className="text-gray-700 dark:text-gray-300 text-sm">
              {team.owner.email}
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Team Name --> */}
      <div className="col-span-6 sm:col-span-4">
        <InputLabel htmlFor="name" value="Team Name" />

        <Input
          id="name"
          type="text"
          className="mt-1 block w-full"
          value={form.data.name}
          onChange={e => form.setData('name', e.currentTarget.value)}
          disabled={!permissions.canUpdateTeam}
        />

        <InputError message={form.errors.name} className="mt-2" />
      </div>
    </FormSection>
  );
}
