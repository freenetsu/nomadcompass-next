interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  desc?: string;
}

export function Card({
  title,
  children,
  className = "",
  desc = "",
}: CardProps) {
  return (
    <div
      className={`rounded-2xl border-2 border-gray-200 bg-white shadow-md hover:shadow-xl transition-shadow duration-300 ${className}`}
    >
      {title && (
        <div className="px-6 py-5 bg-gradient-to-r from-brand-50 to-ocean-50">
          <h3 className="text-base font-semibold text-gray-800">
            {title}
          </h3>
          {desc && (
            <p className="mt-1 text-sm text-gray-600">
              {desc}
            </p>
          )}
        </div>
      )}

      <div
        className={`${title ? "border-t-2 border-gray-100" : ""} p-4 sm:p-6`}
      >
        {children}
      </div>
    </div>
  );
}
