import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';

interface Props {
  title: string;
  description: string;
  renderActions?(): JSX.Element;
  onSubmit(): void;
}

export default function FormSection({
  onSubmit,
  renderActions,
  children,
}: PropsWithChildren<Props>) {
  const hasActions = !!renderActions;

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div
        className={classNames(
          'py-5 sm:py-6',
          hasActions ? 'sm:rounded-tl-md sm:rounded-tr-md' : 'sm:rounded-md',
        )}
      >
        <div className="grid grid-cols-6 gap-6">{children}</div>
      </div>

      {hasActions && (
        <div className="flex items-center justify-start py-3 text-right sm:rounded-bl-md sm:rounded-br-md">
          {renderActions?.()}
        </div>
      )}
    </form>
  );
}
