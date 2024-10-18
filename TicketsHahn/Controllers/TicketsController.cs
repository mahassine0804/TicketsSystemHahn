using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TicketsHahn.Dto;
using TicketsHahn.Models;

namespace TicketsHahn.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Tickets : ControllerBase
    {
        private readonly HahnTicketContext _context;

        /// <summary>
        /// Constructor to initialize the database context.
        /// </summary>
        /// <param name="context">Database context for accessing ticket data.</param>
        public Tickets(HahnTicketContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Retrieves tickets with pagination, optional sorting, and filtering by status.
        /// </summary>
        /// <param name="skip">Number of records to skip.</param>
        /// <param name="limit">Number of records to take.</param>
        /// <param name="sortColumn">Column to sort by. Default is TicketId.</param>
        /// <param name="sortDirection">Sort direction: "asc" or "desc". Default is "asc".</param>
        /// <param name="statut">Optional filter by ticket status.</param>
        /// <returns>A list of paginated tickets and total count of records after filtering.</returns>
        [HttpGet("GetTicketsWithPagination/{skip}/{limit}")]
        public async Task<IActionResult> GetTicketsWithPagination(int skip, int limit, string? sortColumn = "TicketId", string? sortDirection = "asc", ulong? statut = null)
        {
            var query = _context.Tickets.AsQueryable();

            if (statut.HasValue)
            {
                query = query.Where(m => m.Statut == statut.Value);
            }

            var totalCount = await query.CountAsync();

            query = sortColumn switch
            {
                "ticketId" => (sortDirection == "asc") ? query.OrderBy(m => m.TicketId) : query.OrderByDescending(m => m.TicketId),
                "description" => (sortDirection == "asc") ? query.OrderBy(m => m.Description) : query.OrderByDescending(m => m.Description),
                "date" => (sortDirection == "asc") ? query.OrderBy(m => m.CreationDate) : query.OrderByDescending(m => m.CreationDate),
                "statut" => (sortDirection == "asc") ? query.OrderBy(m => m.Statut) : query.OrderByDescending(m => m.Statut),
                _ => query.OrderBy(m => m.TicketId)
            };

            var listTickets = await query.Skip(skip)
                                          .Take(limit)
                                          .Select(m => new TicketDto
                                          {
                                              formattedDateCreateion = m.CreationDate.ToString("MMM-dd-yyyy"),
                                              Description = m.Description,
                                              Statut = m.Statut,
                                              TicketId = m.TicketId,
                                          }).ToListAsync();

            return Ok(new
            {
                TotalCount = totalCount,
                Tickets = listTickets
            });
        }

        /// <summary>
        /// Updates the status of a ticket.
        /// </summary>
        /// <param name="ticket">Ticket object containing the new status.</param>
        /// <returns>An Ok result if successful, otherwise a BadRequest or NotFound result.</returns>
        [HttpPut("ChangeStatut")]
        public async Task<IActionResult> ChangeStatut([FromBody] TicketDto ticket)
        {
            var ticketToModify = await _context.Tickets.Where(x => x.TicketId == ticket.TicketId).FirstOrDefaultAsync();
            if (ticketToModify != null)
            {
                ticketToModify.Statut = ticket.Statut;
                _context.Update(ticketToModify);
                _context.SaveChanges();
                return Ok();
            }
            return NotFound();
        }

        /// <summary>
        /// Updates an existing ticket's description and status.
        /// </summary>
        /// <param name="ticketDto">Ticket data transfer object containing updated information.</param>
        /// <returns>Ok if successful, otherwise NotFound if the ticket doesn't exist.</returns>
        [HttpPut("UpdateTicket")]
        public async Task<IActionResult> UpdateTicket([FromBody] TicketDto ticketDto)
        {
            var ticketToUpdate = await _context.Tickets.Where(x => x.TicketId == ticketDto.TicketId).FirstOrDefaultAsync();
            if (ticketToUpdate != null)
            {
                ticketToUpdate.Description = ticketDto.Description;
                ticketToUpdate.Statut = ticketDto.Statut;
                _context.Update(ticketToUpdate);
                _context.SaveChanges();
                return Ok();
            }
            return NotFound();
        }

        /// <summary>
        /// Adds a new ticket.
        /// </summary>
        /// <param name="ticket">Ticket data transfer object containing ticket details.</param>
        /// <returns>Ok if the ticket is added successfully, otherwise BadRequest.</returns>
        [HttpPost("AddNewTicket")]
        public async Task<IActionResult> AddNewTicket([FromBody] TicketDto ticket)
        {
            if (!string.IsNullOrEmpty(ticket.Description))
            {
                var newTicket = new Ticket()
                {
                    Statut = ticket.Statut,
                    CreationDate = DateTime.Now,
                    ModificationDate = null,
                    Description = ticket.Description,
                };
                _context.Tickets.Add(newTicket);
                await _context.SaveChangesAsync();
                return Ok();
            }
            return BadRequest();
        }

        /// <summary>
        /// Deletes a ticket by its ID.
        /// </summary>
        /// <param name="TicketId">ID of the ticket to delete.</param>
        /// <returns>Ok if the ticket is deleted successfully, otherwise BadRequest.</returns>
        [HttpDelete("DeleteTicket/{TicketId}")]
        public async Task<IActionResult> RemoveTicket(int TicketId)
        {
            var ticketToRemove = await _context.Tickets.Where(x => x.TicketId == TicketId).FirstOrDefaultAsync();
            if (ticketToRemove != null)
            {
                _context.Tickets.Remove(ticketToRemove);
                _context.SaveChanges();
                return Ok();
            }
            return BadRequest();
        }

        /// <summary>
        /// Retrieves all tickets without pagination.
        /// </summary>
        /// <returns>A list of all tickets with basic details.</returns>
        [HttpGet("getAllTickets")]
        public async Task<IActionResult> GetAllTickets()
        {
            var listTickets = await _context.Tickets.Select(m => new TicketDto
            {
                formattedDateCreateion = m.CreationDate.ToString("MMM-dd-yyyy"),
                Description = m.Description,
                Statut = m.Statut,
                TicketId = m.TicketId,
                count = _context.Tickets.Count()
            }).ToListAsync();

            return Ok(listTickets);
        }
    }
}
