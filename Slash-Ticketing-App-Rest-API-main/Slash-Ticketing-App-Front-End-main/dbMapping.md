# DataBase-Mapping

User (userId, fullName, email, mobileNo, userName, password, role, accountBalance, expireDates, busRoute, busNo ); user Roles = local, foreign, bus, inspector, manager
Journey ( journeyId, busUserId, userId, departure, destination, busRoute amount );
Complaint ( complaintId, userId, reportUser, remarks );
inspectedBus ( inspectedId, userId, busRoute, busNo, remarks );
inspectReport ( inspectReportId, userID, reportUser, userType, remarks , inspectedId ); //user Type = local, foreign, bus
timeTable ( timeTableId, busRoute, busNo, terminal, destination, departureTime, arrivalTime );
