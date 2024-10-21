TicketsHahn API
Overview
The TicketsHahn API is a RESTful service designed for managing tickets in a ticketing system. Built using ASP.NET Core and Entity Framework Core, this API allows users to perform various operations, including creating, retrieving, updating, and deleting tickets. The API supports pagination and filtering for efficient data handling.

API Endpoints
1. Get Tickets with Pagination
Endpoint: GET /api/Tickets/GetTicketsWithPagination/{skip}/{limit}
Parameters:
skip: Number of records to skip for pagination.
limit: Number of records to return.
sortColumn: (Optional) Column to sort by (default: TicketId).
sortDirection: (Optional) Sorting direction (asc or desc, default: asc).
statut: (Optional) Filter tickets by status.
Response: Returns a JSON object containing the total count of tickets and the paginated list of tickets.

2. Change Ticket Status
Endpoint: PUT /api/Tickets/ChangeStatut
Request Body:
TicketId: The ID of the ticket.
Statut: The new status for the ticket.
3. Update Ticket
Endpoint: PUT /api/Tickets/UpdateTicket
Request Body:
TicketId: The ID of the ticket to update.
Description: The updated description for the ticket.
Statut: The new status for the ticket.
4. Add New Ticket
Endpoint: POST /api/Tickets/AddNewTicket
Request Body:
Description: The description for the new ticket.
Statut: The status for the new ticket.
5. Delete Ticket
Endpoint: DELETE /api/Tickets/DeleteTicket/{TicketId}
Parameters:
TicketId: The ID of the ticket to be deleted.
6. Get All Tickets
Endpoint: GET /api/Tickets/getAllTickets
Response: Returns a JSON array of all tickets in the system.
Technologies Used
ASP.NET Core
Entity Framework Core
MySQL Database
Setup Instructions
Prerequisites
Ensure you have the following installed on your machine:

.NET 8 SDK
Node.js (version 14 or higher)
Step 1: Clone the Repository
Open your terminal or command prompt and run the following command:

git clone https://github.com/mahassine0804/TicketsSystemHahn.git
cd TicketsHahn
Step 2: Configure Database Connection
Open appsettings.json in your project root directory.
Modify the ConnectionStrings section to point to your MySQL database:
"ConnectionStrings": { "DefaultConnection": "Server=localhost;Database=your_database_name;User=your_username;Password=your_password;" }
Step 3: Apply Database Migrations
Run the following command in your terminal to apply any migrations:

dotnet ef database update
Step 4: Install Dependencies
Make sure all necessary packages are installed:

dotnet restore
Running the Application
Once everything is set up, you can run the application with the following command:

dotnet run
The API will be available at http://localhost:5000/api/Tickets (or another port if configured differently).
Frontend Setup Instructions
Step 1: Navigate to the Frontend Directory
After cloning the repository, navigate to the Angular frontend directory:
npm install
ng serve
The frontend will be available at http://localhost:4200 by default.
ps: the frontend folder name is : Hahn
Goals
The following goals were set for the TicketsHahn API project, along with their current statuses:

Develop a web application using .NET 8 for the backend and a TypeScript-based frontend framework (Angular or React).

✅ Status: Completed. The backend is built using .NET 8, and the frontend is developed using Angular.
Implement CRUD (Create, Read, Update, Delete) functionality for managing tickets.

✅ Status: Completed. The API supports creating, reading, updating, and deleting tickets.
Use a suitable database to store the ticket data (e.g., SQL Server, PostgreSQL).

✅ Status: Completed. The application uses MySQL for storing ticket data.
Use Entity Framework for database operations.

✅ Status: Completed. The application utilizes Entity Framework Core for data access.
Implement pagination for the list of tickets.

✅ Status: Completed. The API allows retrieving tickets with pagination.
Create a responsive user interface that interacts with the .NET backend.

✅ Status: Completed. The Angular frontend communicates with the .NET backend seamlessly.
Implement a table view of tickets as specified.

✅ Status: Completed. The UI displays tickets in a table format as shown in the provided image.
User can create a new ticket.

✅ Status: Completed. The "Add New" functionality is implemented.
User can edit/update an existing ticket.

✅ Status: Completed. The API allows updating existing tickets.
User can delete a ticket.

✅ Status: Completed. The API supports deleting tickets.
User can view the list of all tickets.

✅ Status: Completed. The API retrieves and displays all tickets.
Implement client-side form validation.

✅ Status: Completed. Validation is enforced for required fields in the ticket forms.
Status should be a dropdown allowing users to choose between "Open" or "Closed."

✅ Status: Completed. The UI includes a dropdown for selecting ticket status.
Use modern UI styling (Bootstrap, Material UI, etc.) for visual appeal.

✅ Status: Completed. The application is styled using Bootstrap.
Implement sorting and filtering on the ticket table. (Bonus Points)

✅ Status: Completed. The ticket table supports sorting and filtering based on various criteria.
Add unit tests. (Bonus Points)

✅ Status: In Progress. Unit tests are being developed to ensure the reliability of the application.

Author
Mohamed Mahassine
