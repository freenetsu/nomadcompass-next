import Image from "next/image";
import { cn } from "@/lib/utils";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
type AvatarStatus = "online" | "offline" | "busy" | "none";

interface AvatarProps {
  src: string;
  alt?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
  className?: string;
}

const sizeClasses: Record<AvatarSize, string> = {
  xs: "h-6 w-6",
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
  xl: "h-14 w-14",
  "2xl": "h-16 w-16",
};

const sizePx: Record<AvatarSize, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 56,
  "2xl": 64,
};

const statusSizeClasses: Record<AvatarSize, string> = {
  xs: "h-1.5 w-1.5",
  sm: "h-2 w-2",
  md: "h-2.5 w-2.5",
  lg: "h-3 w-3",
  xl: "h-3.5 w-3.5",
  "2xl": "h-4 w-4",
};

const statusColorClasses: Record<Exclude<AvatarStatus, "none">, string> = {
  online: "bg-success-500",
  offline: "bg-gray-400",
  busy: "bg-warning-500",
};

export function Avatar({
  src,
  alt = "Avatar",
  size = "md",
  status = "none",
  className,
}: AvatarProps) {
  return (
    <div className={cn("relative rounded-full", sizeClasses[size], className)}>
      <Image
        src={src}
        alt={alt}
        width={sizePx[size]}
        height={sizePx[size]}
        className="rounded-full object-cover"
      />

      {status !== "none" && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full border-2 border-white dark:border-gray-900",
            statusSizeClasses[size],
            statusColorClasses[status],
          )}
        />
      )}
    </div>
  );
}
