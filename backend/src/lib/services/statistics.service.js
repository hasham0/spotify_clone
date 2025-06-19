import Song from '../../models/song.model.js';
import User from '../../models/user.model.js';
import Album from '../../models/album.model.js';

const getTotalStatisticsService = async () => {
  const total = await Promise.all([
    Song.countDocuments(),
    User.countDocuments(),
    Album.countDocuments(),
    Song.aggregate([
      {
        $unionWith: {
          coll: 'albums',
          pipeline: [],
        },
      },
      {
        $group: {
          _id: '$artist',
        },
      },
      {
        $count: 'count',
      },
    ]),
  ]);
  return total;
};

export { getTotalStatisticsService };
