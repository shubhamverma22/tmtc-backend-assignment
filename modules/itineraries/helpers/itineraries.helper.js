const { isEmpty: _isEmpty } = require('lodash')
const Itinerary = require('../../../models/Itineary');
const Pagination = require('../../../utils/Pagination');
const {
  setKey,
  setRedisKeyExpiry,
  getKey,
} = require('../../../utils/redis/redis-utils');
const {
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_NUMBER,
  DEFAULT_SORT_BY,
  DEFAULT_SORT_ORDER,
} = require('../constants/itineraries.constant');

const redisExpiry = 300;

const createItineraryHelper = async (params) => {
  const { userId, title, destination, startDate, endDate, activities } = params;
  const itineraryObj = {
    userId,
    title,
    destination,
    startDate,
    endDate,
    activities,
  };
  const itinerary = new Itinerary(itineraryObj);
  itinerary.shareableId = itinerary.generateShareableId(); // Generate and set shareable ID
  await itinerary.save();
};

const getItinerariesHelper = async (params) => {
  const {
    userId,
    destination,
    pagination,
    pageNumber = DEFAULT_PAGE_NUMBER,
    pageSize = DEFAULT_PAGE_SIZE,
    sortBy,
    sortOrder = DEFAULT_SORT_ORDER,
  } = params;
  const paginationEnabled = pagination === 'true';
  const paginationUtil = new Pagination({ pageNumber, pageSize });
  const limit = paginationUtil.getLimit();
  const skip = paginationUtil.getOffset();
  const findClause = {
    userId,
    ...(destination && { destination }),
  };
  const projectClause = {
    title: 1,
    destination: 1,
    startDate: 1,
    endDate: 1,
    activities: 1,
  };
  const sortClause = { [sortBy]: Number(sortOrder) };
  let itinerariesDataPromise = Itinerary.find(findClause, projectClause)
    .sort(sortClause)
    .lean();
  let promises = [itinerariesDataPromise];
  const paginationData = {};
  const result = {};
  if (paginationEnabled) {
    itinerariesDataPromise = Itinerary.find(findClause, projectClause)
      .sort(sortClause)
      .skip(skip)
      .limit(limit)
      .lean();
    const countPromise = Itinerary.countDocuments(findClause);
    promises = [itinerariesDataPromise];
    promises.push(countPromise);
  }
  const [itinerariesData, totalRecords] = await Promise.all(promises);
  if (paginationEnabled) {
    paginationData.totalRecords = totalRecords;
    paginationData.pageSize = paginationUtil.pageSize;
    paginationData.pageNumber = paginationUtil.pageNumber;
    paginationData.totalPages = paginationUtil.getNoOfPages(totalRecords);
    result.paginationData = paginationData;
  }
  result.itineraries = itinerariesData;
  return result;
};

const getUserItineraryDetailsByIdHelper = async (params) => {
  const { userId, itineraryId } = params;
  const redisKey = `itinerary:${userId}:${itineraryId}`;
  const data = await getKey(redisKey);
  if (data) {
    const itineraryDetails = JSON.parse(data);
    return { itineraryDetails };
  }
  const findClause = {
    _id: itineraryId,
    userId,
  };
  const projectClause = {
    title: 1,
    destination: 1,
    startDate: 1,
    endDate: 1,
    activities: 1,
  };
  const itineraryDetails = await Itinerary.findOne(
    findClause,
    projectClause
  ).lean();
  if (!_isEmpty(itineraryDetails)) {
    await Promise.all([
      setKey(redisKey, JSON.stringify(itineraryDetails)),
      setRedisKeyExpiry(redisKey, redisExpiry),
    ]);
  }
  return { itineraryDetails };
};

const updateUserItineraryDetailsHelper = async (params) => {
  const {
    userId,
    itineraryId,
    title,
    destination,
    startDate,
    endDate,
    activities,
  } = params;
  const findClause = {
    _id: itineraryId,
    userId,
  };
  const updateClause = {};
  if (title) {
    updateClause.title = title;
  }
  if (destination) {
    updateClause.destination = destination;
  }
  if (startDate) {
    updateClause.startDate = startDate;
  }
  if (endDate) {
    updateClause.endDate = endDate;
  }
  if (activities) {
    updateClause.activities = activities;
  }
  const itineraryDetails = await Itinerary.findOneAndUpdate(
    findClause,
    updateClause,
    { new: true }
  ).lean();
  return { itineraryDetails };
};

const deleteUserItineraryDetailsByIdHelper = async (params) => {
  const { userId, itineraryId } = params;
  const findClause = {
    _id: itineraryId,
    userId,
  };
  const updateClause = {
    isDeleted: true,
  };
  const itineraryDetails = await Itinerary.findOneAndUpdate(
    findClause,
    updateClause,
    { new: true }
  ).lean();
  return { itineraryDetails };
};

const getShareableItineraryHelper = async (params) => {
  const { shareableId } = params;
  const findClause = {
    shareableId,
  };
  const projectClause = {
    title: 1,
    destination: 1,
    startDate: 1,
    endDate: 1,
    activities: 1,
  };
  const itineraryDetails = await Itinerary.findOne(
    findClause,
    projectClause
  ).lean();
  return { itineraryDetails };
};  

module.exports = {
  createItineraryHelper,
  getItinerariesHelper,
  getUserItineraryDetailsByIdHelper,
  updateUserItineraryDetailsHelper,
  deleteUserItineraryDetailsByIdHelper,
  getShareableItineraryHelper,
};
