import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import DeleteUserForm from '@/pages/profile/partials/delete-user-form';
import UpdatePasswordForm from '@/pages/profile/partials/update-password-form';
import UpdateProfileInformationForm from '@/pages/profile/partials/update-profile-information-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import LogoutOtherBrowserSessions from './partials/LogoutOtherBrowserSessionsForm';
import TwoFactorAuthenticationForm from './partials/TwoFactorAuthenticationForm';
import { Session } from '@/types';
import useTypedPage from '@/hooks/use-typed-page';

export default function Edit({
  status,
  sessions,
  mustVerifyEmail,
  confirmsTwoFactorAuthentication,
}: {
  status?: string;
  sessions: Session[];
  mustVerifyEmail: boolean;
  confirmsTwoFactorAuthentication: boolean;
}) {
  const page = useTypedPage();
  return (
    <AuthenticatedLayout header={'Edit Profile'}>
      <Head title="Profile" />

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Update your account's profile information and email address.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UpdateProfileInformationForm
              mustVerifyEmail={mustVerifyEmail}
              status={status}
              className="max-w-xl"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Update Password</CardTitle>
            <CardDescription>
              Ensure your account is using a long, random password to stay
              secure.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <UpdatePasswordForm className="max-w-xl" />
          </CardContent>
        </Card>

        {page.props.jetstream.canManageTwoFactorAuthentication ? (
          <Card>
            <CardHeader>
              <CardTitle>Two Factor Authentication</CardTitle>
              <CardDescription>
                Add additional security to your account using two factor authentication.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <TwoFactorAuthenticationForm
                requiresConfirmation={confirmsTwoFactorAuthentication}
              />
            </CardContent>
          </Card>
        ) : null}

        <Card>
          <CardHeader>
            <CardTitle>Browser Sessions</CardTitle>
            <CardDescription>
              Manage and log out your active sessions on other browsers and
              devices. If necessary, you may log out of all of your other
              browser sessions across all of your devices. Some of your recent
              sessions are listed below; however, this list may not be
              exhaustive. If you feel your account has been compromised, you
              should also update your password.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <LogoutOtherBrowserSessions sessions={sessions} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Delete Account</CardTitle>
            <CardDescription>
              Once your account is deleted, all of its resources and data will
              be permanently deleted. Before deleting your account, please
              download any data or information that you wish to retain.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <DeleteUserForm className="max-w-xl" />
          </CardContent>
        </Card>
      </div>
    </AuthenticatedLayout>
  );
}
