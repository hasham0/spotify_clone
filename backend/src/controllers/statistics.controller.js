import { getTotalStatisticsService } from "../lib/services/statistics.service.js";
import asyncHandler from "../middlewares/async-handler.middleware.js";

const getTotalStatistics = asyncHandler(async (request, response) => {
    // retrieve all statistics
    const [totalSongs, totalUsers, totalAlbum, uniqueArtist] =
        await getTotalStatisticsService();

    return response.status(200).json({
        totalAlbum,
        totalSongs,
        totalUsers,
        totalArtist: uniqueArtist[0]?.count || 0,
    });
});

export { getTotalStatistics };
