import classNames from 'classnames';
import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import useRoute from '@/hooks/use-route';
import ActionSection from '@/components/ui/action-section';
import ConfirmationModal from '@/components/ui/confirmation-modal';
import DangerButton from '@/components/ui/danger-button';
import SecondaryButton from '@/components/ui/secondary-button';
import { Team } from '@/types';
import SectionTitle from '@/components/ui/section-title';

interface Props {
  team: Team;
}

export default function DeleteTeamForm({ team }: Props) {
  const route = useRoute();
  const [confirmingTeamDeletion, setConfirmingTeamDeletion] = useState(false);
  const form = useForm({});

  function confirmTeamDeletion() {
    setConfirmingTeamDeletion(true);
  }

  function deleteTeam() {
    form.delete(route('teams.destroy', [team]), {
      errorBag: 'deleteTeam',
    });
  }

  return (
    <div className="md:gap-6">
      <SectionTitle
        title="Delete Team"
        description="Permanently delete this team."
      />

      <div className="mt-5 md:mt-0 md:col-span-2">
        <div className="py-5 sm:py-6 sm:rounded-lg">
          <div className="max-w-xl text-sm text-gray-600 dark:text-gray-400">
            Once a team is deleted, all of its resources and data will be
            permanently deleted. Before deleting this team, please download any
            data or information regarding this team that you wish to retain.
          </div>

          <div className="mt-5">
            <DangerButton onClick={confirmTeamDeletion}>
              Delete Team
            </DangerButton>
          </div>

          {/* <!-- Delete Team Confirmation Modal --> */}
          <ConfirmationModal
            isOpen={confirmingTeamDeletion}
            onClose={() => setConfirmingTeamDeletion(false)}
          >
            <ConfirmationModal.Content title={'Delete Team'}>
              Are you sure you want to delete this team? Once a team is deleted,
              all of its resources and data will be permanently deleted.
            </ConfirmationModal.Content>

            <ConfirmationModal.Footer>
              <SecondaryButton onClick={() => setConfirmingTeamDeletion(false)}>
                Cancel
              </SecondaryButton>

              <DangerButton
                onClick={deleteTeam}
                className={classNames('ml-2', {
                  'opacity-25': form.processing,
                })}
                disabled={form.processing}
              >
                Delete Team
              </DangerButton>
            </ConfirmationModal.Footer>
          </ConfirmationModal>
        </div>
      </div>
    </div>
  );
}
