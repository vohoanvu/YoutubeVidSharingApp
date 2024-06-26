﻿using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SampleAspNetReactDockerApp.Server.Models;

namespace SampleAspNetReactDockerApp.Server.Data;

/// <summary>
/// The database context for the application.
/// </summary>
public class DatabaseContext : IdentityDbContext<AppUserEntity>
{
    /// <summary>
    /// The constructor for the database context.
    /// </summary>
    /// <param name="options"></param>
    public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
    {
    }

    public DatabaseContext()
    {
    }

    public virtual DbSet<SharedVideo> SharedVideos { get; set; }

    /// <inheritdoc />
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var connectionString = Global.AccessAppEnvironmentVariable(AppEnvironmentVariables.AppDb);
        optionsBuilder.UseNpgsql(connectionString);
    }

    /// <inheritdoc />
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<AppUserEntity>(e =>
        {
            e.ToTable("app_users");
            e.HasKey(x => x.Id);
            
            e.Property(p => p.CreatedAt)
                .HasDefaultValue(DateTime.UtcNow)
                .ValueGeneratedOnAdd();
            
            e.Property(p => p.UpdatedAt)
                .HasDefaultValue(DateTime.UtcNow)
                .ValueGeneratedOnAddOrUpdate();
        });
        
    }
}