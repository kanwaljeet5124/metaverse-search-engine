import {Card, Divider, Skeleton} from "@heroui/react";

interface CardSkeletonProps {
  variant?: number;
}

export default function CardSkeleton({variant= 0}: CardSkeletonProps) {
  if(variant == 0) return (
    <Card className="w-full space-y-5 p-4" radius="lg">
      <Skeleton className="rounded-lg">
        {variant==0 && <div className="h-56 rounded-lg bg-default-300" />}
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200" />
        </Skeleton>
      </div>
    </Card>
  );
  else if(variant == 1) return (
    <Card className="w-full" radius="lg">
      <div className="py-4 px-3 space-y-1.5">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-1/5 rounded-lg">
          <div className="h-2 rounded-lg bg-default-200" />
        </Skeleton>
      </div>
      <Divider />
      <div className="py-4 px-3 space-y-1.5">
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200" />
        </Skeleton>
      </div>
      <Divider />
      <div className="py-4 px-3 space-y-1.5">
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200" />
        </Skeleton>
      </div>
    </Card>
  );
  return null;
}
