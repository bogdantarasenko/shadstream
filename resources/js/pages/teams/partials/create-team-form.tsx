import React from 'react';
import classNames from 'classnames';
import { useForm } from '@inertiajs/react';
import useRoute from '@/hooks/use-route';
import useTypedPage from '@/hooks/use-typed-page';
import ActionMessage from '@/components/ui/action-message';
import FormSection from '@/components/ui/form-section';
import { InputError } from '@/components/ui/input-error';
import InputLabel from '@/components/ui/input-label';
import PrimaryButton from '@/components/ui/primary-button';
import { Input } from '@/components/ui/input';

export default function CreateTeamForm() {
  const route = useRoute();
  const page = useTypedPage();
  const form = useForm({
    name: '',
  });

  function createTeam() {
    form.post(route('teams.store'), {
      errorBag: 'createTeam',
      preserveScroll: true,
    });
  }

  return (
    <FormSection
      onSubmit={createTeam}
      title={'Team Details'}
      description={'Create a new team to collaborate with others on projects.'}
      renderActions={() => (
        <>
          <ActionMessage on={form.recentlySuccessful}>
            Saved.
          </ActionMessage>

          <PrimaryButton
            className={classNames({ 'opacity-25': form.processing, 'ml-3': form.recentlySuccessful })}
            disabled={form.processing}
          >
            Save
          </PrimaryButton>
        </>
      )}
    >
      <div className="col-span-6">
        <InputLabel value="Team Owner" />

        <div className="flex items-center mt-2">
          <img
            className="w-12 h-12 rounded-full object-cover"
            src={page.props.auth.user?.profile_photo_url}
            alt={page.props.auth.user?.name}
          />

          <div className="ml-4 leading-tight">
            <div className="text-gray-900 dark:text-white">
              {page.props.auth.user?.name}
            </div>
            <div className="text-gray-700 dark:text-gray-300 text-sm">
              {page.props.auth.user?.email}
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-6 sm:col-span-4">
        <InputLabel htmlFor="name" value="Team Name" />
        <Input
          id="name"
          type="text"
          className="mt-1 block w-full"
          value={form.data.name}
          onChange={e => form.setData('name', e.currentTarget.value)}
          autoFocus
        />
        <InputError message={form.errors.name} className="mt-2" />
      </div>
    </FormSection>
  );
}
