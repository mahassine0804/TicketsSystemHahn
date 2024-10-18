using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TicketsHahn.Controllers;
using TicketsHahn.Models;
using Xunit;
using System.Threading.Tasks;
using System.Dynamic;

namespace TicketsHahn.Tests
{
    public class TicketsControllerTests
    {
        private readonly HahnTicketContext _context;
        private readonly Tickets _controller;

        public TicketsControllerTests()
        {
            var options = new DbContextOptionsBuilder<HahnTicketContext>()
                .UseInMemoryDatabase(databaseName: "TestDatabase")
                .Options;

            _context = new HahnTicketContext(options);
            _controller = new Tickets(_context);
        }

        [Fact]
        public async Task GetTicketsWithPagination_ReturnsCorrectCount()
        {
            // Arrange
            _context.Tickets.Add(new Ticket { Description = "Test Ticket", Statut = 0 });
            await _context.SaveChangesAsync();

            // Act
            var result = await _controller.GetTicketsWithPagination(0, 10);

            // Assert
            Assert.NotNull(result);
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<ExpandoObject>(okResult.Value); // Assuming you return an anonymous object

            // Cast the ExpandoObject to dynamic to access properties
            dynamic data = returnValue;

            // Now you can access TotalCount
            Assert.Equal(1, (int)data.TotalCount); // Check if the count is correct
        }
    }
}
