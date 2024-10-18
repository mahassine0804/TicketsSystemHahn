namespace TicketsHahn.Dto
{
    public class TicketDto
    {
        public int? TicketId { get; set; }

        public string? Description { get; set; } = null!;

        public ulong Statut { get; set; }

        public DateTime? CreationDate { get; set; }
        public string? formattedDateCreateion { get; set; }

        public DateOnly? ModificationDate { get; set; }
        public string? FormattedModificationDate { get; set; }
        public int? count { get; set; }
    }
}
