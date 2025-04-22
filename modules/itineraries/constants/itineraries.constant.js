const SUCCESS_MESSAGES = {
  ITINERARIES_CREATED_SUCCESS: 'Itineraries Created Successfully!',
  ITINERARIES_UPDATED_SUCCESS: 'Itineraries Updated Successfully!',
  ITINERARIES_DELETED_SUCCESS: 'Itineraries Deleted Successfully!',
  ITINERARIES_FETCHED_SUCCESS: 'Itineraries Fetched Successfully!',
  ITINERARIES_SHARED_SUCCESS: 'Itineraries Shared Successfully!',
};

const ERROR_MESSAGES = {
  ITINERARIES_CREATED_FAILED: 'Failed to create itineraries!',
  ITINERARIES_UPDATED_FAILED: 'Failed to update itineraries!',
  ITINERARIES_DELETED_FAILED: 'Failed to delete itineraries!',
  ITINERARIES_FETCHED_FAILED: 'Failed to fetch itineraries!',
  ITINERARIES_SHARED_FAILED: 'Failed to share itineraries!',
  INVALID_MISSING_ITINERARY_ID: 'Invalid or missing itineraryid!',
  TITLE_REQUIRED: 'Please provide title!',
  DESTINATION_REQUIRED: 'Please provide destination!',
  START_DATE_REQUIRED: 'Please provide start date!',
  END_DATE_REQUIRED: 'Please provide end date!',
  ACTIVITIES_REQUIRED: 'Please provide activities!',
  INVALID_START_DATE: 'Please enter a valid start date!',
  INVALID_END_DATE: 'Please enter a valid end date!',
  INVALID_DESTINATION: 'Please enter a valid destination!',
  INVALID_DESCRIPTION: 'Please enter a valid description!',
  INVALID_LOCATION: 'Please enter a valid location!',
  INVALID_TIME: 'Please enter a valid time!',
  INVALID_MISSING_SHAREABLE_ID: 'Invalid or missing shareableId!',
};
const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_SORT_BY = 'createdAt';
const DEFAULT_SORT_ORDER = '-1';

module.exports = {
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_NUMBER,
  DEFAULT_SORT_BY,
  DEFAULT_SORT_ORDER,
};
