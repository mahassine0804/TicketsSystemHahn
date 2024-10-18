using System;
using System.Collections.Generic;

namespace TicketsHahn.Models;

public partial class Ticket
{
    public int TicketId { get; set; }

    public string Description { get; set; } = null!;

    public ulong Statut { get; set; }

    public DateTime CreationDate { get; set; }

    public DateTime? ModificationDate { get; set; }
}
