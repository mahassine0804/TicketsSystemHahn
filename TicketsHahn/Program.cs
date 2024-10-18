using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using TicketsHahn.Models;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

string? ConnectionString = configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<HahnTicketContext>(options =>
{
    options.UseMySql(ConnectionString, ServerVersion.AutoDetect(ConnectionString));
});
var app = builder.Build();
app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
if (app.Environment.IsDevelopment())
    // Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
