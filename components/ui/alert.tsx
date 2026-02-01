import { DetailedHTMLProps, HTMLAttributes } from "react";

type AlertProps = {
  title?: string;
  children?: React.ReactNode;
  color: "red" | "yellow" | "blue";
  icon: React.ReactNode;
  defaultTitle: string;
};

function BaseAlert({ title, children, color, icon, defaultTitle }: AlertProps) {
  const bgColors: Record<string, string> = {
    red: "bg-red-50 border-red-500 dark:bg-red-800/20",
    yellow: "bg-yellow-50 border-yellow-500 dark:bg-yellow-800/20",
    blue: "bg-blue-50 border-blue-500 dark:bg-blue-800/20",
  };

  const circleColors: Record<string, string> = {
    red: "border-red-100 bg-red-200 text-red-800 dark:border-red-950 dark:bg-red-800 dark:text-red-100",
    yellow:
      "border-yellow-100 bg-yellow-200 text-yellow-800 dark:border-yellow-900 dark:bg-yellow-700 dark:text-yellow-100",
    blue: "border-blue-100 bg-blue-200 text-blue-800 dark:border-blue-950 dark:bg-blue-800 dark:text-blue-100",
  };

  return (
    <div
      className={`${bgColors[color]} border-t-4 p-3 md:p-4 mb-4 rounded-md alert-parent`}
      style={
        { "--code-block-color": color } as DetailedHTMLProps<
          HTMLAttributes<HTMLDivElement>,
          HTMLDivElement
        >
      }
      role="alert"
    >
      <div className="flex flex-col sm:flex-row">
        <div className="shrink-0 mb-2 sm:mb-0">
          <span
            className={`inline-flex justify-center items-center size-6 md:size-8 rounded-full border-4 ${circleColors[color]}`}
          >
            {icon}
          </span>
        </div>
        <div className="sm:ms-4">
          <h3 className="text-gray-800 font-semibold dark:text-white mb-2 text-base md:text-lg">
            {title || defaultTitle}
          </h3>
          <div className="text-sm md:text-lg text-gray-700 dark:text-neutral-300 m-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ErrorAlert(props: {
  title?: string;
  children?: React.ReactNode;
}) {
  return (
    <BaseAlert
      {...props}
      color="red"
      defaultTitle="Error!"
      icon={
        <svg
          className="shrink-0 size-3 md:size-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      }
    />
  );
}

export function WarningAlert(props: {
  title?: string;
  children?: React.ReactNode;
}) {
  return (
    <BaseAlert
      {...props}
      color="yellow"
      defaultTitle="Warning!"
      icon={
        <svg
          className="shrink-0 size-3 md:size-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path d="M12 9v2m0 4h.01" />
          <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        </svg>
      }
    />
  );
}

export function InfoAlert(props: {
  title?: string;
  children?: React.ReactNode;
}) {
  return (
    <BaseAlert
      {...props}
      color="blue"
      defaultTitle="Info"
      icon={
        <svg
          className="shrink-0 size-3 md:size-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12" y2="8" />
        </svg>
      }
    />
  );
}