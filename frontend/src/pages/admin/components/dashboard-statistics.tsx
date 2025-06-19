import { useMusicStore } from "@/store/useMusicStore";
import { Library, ListMusic, PlayCircle, Users2 } from "lucide-react";
import StatisticsCard from "./statistics-card";
import { useEffect, useState } from "react";

type Props = { statistics: any };

const DashboardStatistics = ({ statistics }: Props) => {
  const {  fetchStatistics } = useMusicStore();
  const [stats, setStats] = useState({
    musicValue: statistics.statistics.totalSongs,
    albumValue: statistics.statistics.totalAlbums,
    artistValue: statistics.statistics.totalArtists,
    userValue: statistics.statistics.totalUsers,
  });
  useEffect(() => {
    setStats({
      musicValue: statistics.statistics.totalSongs,
      albumValue: statistics.statistics.totalAlbums,
      artistValue: statistics.statistics.totalArtists,
      userValue: statistics.statistics.totalUsers,
    });
  }, [statistics, fetchStatistics]);
  const statisticsData = [
    {
      icon: ListMusic,
      label: "Total Songs",
      value: statistics.totalSongs.toLocaleString(),
      bgColor: "bg-emerald-500/10",
      iconColor: "text-emerald-500",
    },
    {
      icon: Library,
      label: "Total Albums",
      value: statistics.totalAlbums.toLocaleString(),
      bgColor: "bg-violet-500/10",
      iconColor: "text-violet-500",
    },
    {
      icon: Users2,
      label: "Total Artists",
      value: statistics.totalArtists.toLocaleString(),
      bgColor: "bg-orange-500/10",
      iconColor: "text-orange-500",
    },
    {
      icon: PlayCircle,
      label: "Total Users",
      value: statistics.totalUsers.toLocaleString(),
      bgColor: "bg-sky-500/10",
      iconColor: "text-sky-500",
    },
  ];

  return (
    <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statisticsData.map((stat,index:number) => (
        <StatisticsCard
        key={index}
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
