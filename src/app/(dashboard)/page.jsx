import React, { Suspense } from "react";
import { GetQuizStatus } from "../../../actions/quize";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { TbArrowBounce } from "react-icons/tb";
import { HiCursorClick } from "react-icons/hi";

export default function Home() {
  return (
    <>
      <div className="container pt-4">
        <Suspense fallback={<StatusCards loading={true} />}>
          <CardStatusWrapper />
        </Suspense>
      </div>
    </>
  );
}

async function CardStatusWrapper() {
  const status = await GetQuizStatus();
  return <StatusCards loading={false} data={status} />;
}

function StatusCards(props) {
  const { data, loading } = props;

  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatusCard
        title="Total Visits"
        icon={<LuView className="text-blue-600" />}
        helperText="All time quiz visits"
        value={data?.visits.toLocaleString() || 0}
        loading={loading}
        className="shadow-md shadow-blue-600"
      />
      <StatusCard
        title="Total Submission"
        icon={<FaWpforms className="text-yellow-600" />}
        helperText="All time quiz submissions"
        value={data?.submissions.toLocaleString() || 0}
        loading={loading}
        className="shadow-md shadow-yellow-600"
      />
      <StatusCard
        title="Submission Rate"
        icon={<HiCursorClick className="text-red-600" />}
        helperText="All time Submission Rate  "
        value={data?.submissionRate.toLocaleString() + "%" || ""}
        loading={loading}
        className="shadow-md shadow-red-600"
      />
      <StatusCard
        title="Bounce Rate"
        icon={<TbArrowBounce className="text-green-600" />}
        helperText="All time Bounce Rate"
        value={data?.bounceRate.toLocaleString() + "%" || ""}
        loading={loading}
        className="shadow-md shadow-green-600"
      />
    </div>
  );
}

export function StatusCard({
  title,
  icon,
  helperText,
  value,
  loading,
  className,
}) {
  return (
    <Card className={className}>
      <CardHeader className="flex justify-between pb-1 items-center flex-row">
        <CardTitle>{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading && (
            <Skeleton>
              <span className="opacity-0">0</span>
            </Skeleton>
          )}
          {!loading && <span>{value}</span>}
        </div>
        <p className="text-xs text-muted-foreground pt-1">{helperText}</p>
      </CardContent>
    </Card>
  );
}
