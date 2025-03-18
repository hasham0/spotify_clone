import { useMusicStore } from "@/store/useMusicStore";
import { Library, ListMusic, PlayCircle, Users2 } from "lucide-react";
import StatisticsCard from "./statistics-card";
type Props = {};

const DashboardStatistics = ({}: Props) => {
  const { statistics } = useMusicStore();
  const statisticsData = [
    {
      icon: ListMusic,
      label: "Total Songs",
      value: statistics.statistics.totalSongs.toLocaleString(),
      bgColor: "bg-emerald-500/10",
      iconColor: "text-emerald-500",
    },
    {
      icon: Library,
      label: "Total Albums",
      value: statistics.statistics.totalAlbums.toString(),
      bgColor: "bg-violet-500/10",
      iconColor: "text-violet-500",
    },
    {
      icon: Users2,
      label: "Total Artists",
      value: statistics.statistics.totalArtists.toString(),
      bgColor: "bg-orange-500/10",
      iconColor: "text-orange-500",
    },
    {
      icon: PlayCircle,
      label: "Total Users",
      value: statistics.statistics.totalUsers.toLocaleString(),
      bgColor: "bg-sky-500/10",
      iconColor: "text-sky-500",
    },
  ];
  return (
    <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statisticsData.map((stat) => (
        <StatisticsCard
          key={stat.label}
          icon={stat.icon}
          label={stat.label}
          value={stat.value}
          bgColor={stat.bgColor}
          iconColor={stat.iconColor}
        />
      ))}
    </div>
  );
};

export default DashboardStatistics;
