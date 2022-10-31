# for install needed Node Modules
npm i --save express sequelize mysql2 body-parser fastest-validator cors
sequelize init

# just run this in terminal
  >>> npm install

  >>> sequelize db:migrate

  >>> npm start

# already done / all tables initiation
sequelize model:generate --name User --attributes fullName:string, email:string, mobileNo:string, username:string, password:string, role:string, accountBalance:float, expireDates:integer, busRoute:string, busNo:string

sequelize model:generate --name Journey --attributes busUserId:integer, userId:integer, busRoute:string, terminal:string, destination:string , amount:float

sequelize model:generate --name Complaint --attributes userId:integer, reportUser:string, remarks:text

sequelize model:generate --name InspectedBus --attributes userId:integer, busRoute:string, busNo:string, remarks:text

sequelize model:generate --name InspectReport --attributes userId:integer, inspectedId:integer, reportUser:string, userType:string, remarks:text

sequelize model:generate --name TimeTable --attributes busRoute:string, busNo:string, terminal:string, destination:string, departureTime:string, arrivalTime:string